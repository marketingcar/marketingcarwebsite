const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for your domain
app.use(cors({
  origin: ['https://www.marketingcar.com', 'https://marketingcar.com', 'http://localhost:5173', 'http://localhost:4173'],
  credentials: true
}));

app.use(express.json());

// GitHub OAuth configuration
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || 'Ov23lia1gPoAKr9pfUXe';
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET; // You'll need to set this

// Auth endpoint - redirects to GitHub OAuth
app.get('/auth', (req, res) => {
  const { provider } = req.query;

  if (provider !== 'github') {
    return res.status(400).json({ error: 'Only GitHub provider is supported' });
  }

  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=repo&state=${req.query.state || 'state'}`;

  res.redirect(githubAuthUrl);
});

// Callback endpoint - handles GitHub OAuth callback
app.get('/callback', async (req, res) => {
  const { code, state } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Authorization code not provided' });
  }

  try {
    // Exchange code for access token
    const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code: code
    }, {
      headers: {
        'Accept': 'application/json'
      }
    });

    const { access_token } = tokenResponse.data;

    if (!access_token) {
      console.error('Token response:', tokenResponse.data);
      return res.status(400).json({ error: 'Failed to get access token' });
    }

    console.log('Access token obtained successfully');

    // Return the token to the CMS with proper formatting
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Authentication Success</title>
      </head>
      <body>
        <h2>Authentication successful!</h2>
        <p>Redirecting...</p>
        <script>
          console.log('Callback script running');

          const receiveMessage = (message, origin) => {
            console.log('Received message:', message, 'from origin:', origin);
          };

          if (window.opener) {
            console.log('Window opener found, posting message');

            // Try multiple formats to ensure compatibility
            const messageData = {
              token: "${access_token}",
              provider: "github"
            };

            // Format 1: Standard object
            window.opener.postMessage(messageData, "*");

            // Format 2: Netlify CMS style string format
            window.opener.postMessage(
              \`authorization:github:success:\${JSON.stringify(messageData)}\`,
              "*"
            );

            setTimeout(() => {
              console.log('Closing popup window');
              window.close();
            }, 1000);
          } else {
            console.log('No window opener found');
            document.body.innerHTML = '<h2>Authentication successful!</h2><p>Token: ${access_token}</p><p>You can close this window.</p>';
          }

          window.addEventListener('message', receiveMessage, false);
        </script>
      </body>
      </html>
    `);

  } catch (error) {
    console.error('OAuth error:', error.response?.data || error.message);
    res.status(500).send(`
      <script>
        if (window.opener) {
          window.opener.postMessage(
            'authorization:github:error:{"error":"${error.message}"}',
            window.location.origin
          );
          window.close();
        } else {
          document.body.innerHTML = '<h2>Authentication failed</h2><p>Error: ${error.message}</p>';
        }
      </script>
    `);
  }
});

// Success endpoint for successful authentication
app.get('/success', (req, res) => {
  const { token } = req.query;

  res.send(`
    <script>
      if (window.opener) {
        const messageData = {
          token: "${token}",
          provider: "github"
        };

        // Send both formats
        window.opener.postMessage(messageData, "*");
        window.opener.postMessage(\`authorization:github:success:\${JSON.stringify(messageData)}\`, "*");
        window.close();
      } else {
        document.body.innerHTML = '<h2>Authentication successful!</h2><p>Token: ${token}</p><p>You can close this window.</p>';
      }
    </script>
  `);
});

// Alternative token endpoint that returns JSON
app.get('/token', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Authorization code not provided' });
  }

  try {
    const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code: code
    }, {
      headers: {
        'Accept': 'application/json'
      }
    });

    const { access_token } = tokenResponse.data;

    if (!access_token) {
      return res.status(400).json({ error: 'Failed to get access token' });
    }

    res.json({
      token: access_token,
      provider: 'github'
    });

  } catch (error) {
    console.error('Token exchange error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Token exchange failed' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'OAuth Bridge for Decap CMS' });
});

app.listen(PORT, () => {
  console.log(`OAuth bridge server running on port ${PORT}`);
  console.log(`GitHub Client ID: ${GITHUB_CLIENT_ID}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});