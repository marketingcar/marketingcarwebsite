// server.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// ---- Config ----
const CLIENT_ID =
  process.env.GITHUB_CLIENT_ID ||
  process.env.CLIENT_ID ||
  "";
const CLIENT_SECRET =
  process.env.GITHUB_CLIENT_SECRET ||
  process.env.CLIENT_SECRET ||
  "";

// The public base URL of this OAuth server (stable Vercel alias)
const PUBLIC_BASE_URL =
  process.env.PUBLIC_BASE_URL ||
  "https://oauth-server-nicole-halls-projects.vercel.app";

// Exact redirect/callback URL registered in your GitHub OAuth App
const REDIRECT_URI =
  process.env.REDIRECT_URI ||
  process.env.CALLBACK_URL ||
  `${PUBLIC_BASE_URL}/callback`;

// Request the scope Decap needs:
const SCOPE = process.env.SCOPE || "repo";

// Allowed CMS origins (parent window)
const allowedOrigins = (process.env.ALLOWED_ORIGINS ||
  "https://marketingcar.com,https://www.marketingcar.com,http://localhost:5173,http://localhost:4173")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

// ---- Middleware ----
app.use(
  cors({
    origin(origin, cb) {
      // allow no Origin (e.g., same-origin requests) & explicit allowlist
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error(`Origin not allowed: ${origin}`));
    },
    credentials: true,
  })
);
app.use(express.json());

// Utility: success HTML that posts the token back to Decap and closes the popup
function successHTML(accessToken) {
  // Do NOT log the token. Only send it to the opener.
  const token = JSON.stringify(accessToken);
  const payload = JSON.stringify({ token: accessToken, provider: "github" });

  return `<!doctype html>
<meta charset="utf-8">
<title>Authentication Success</title>
<body>Authentication successful!<br>Redirecting…</body>
<script>
(function () {
  try {
    if (window.opener) {
      // Legacy Netlify/Decap string format
      window.opener.postMessage("authorization:github:" + ${JSON.stringify(
        payload
      )}, "*");

      // Some bridges/CMS builds listen for an object event too
      window.opener.postMessage({ type: "decap-cms:github", token: ${token} }, "*");

      setTimeout(function(){ window.close(); }, 60);
    } else {
      // Opened directly (not as a popup)
      document.body.innerHTML = "Token received. You can close this window.";
    }
  } catch (e) {
    document.body.innerHTML = "Auth succeeded, but posting token to opener failed.";
  }
})();
</script>`;
}

function errorHTML(message) {
  const safe = String(message || "OAuth error");
  return `<!doctype html><meta charset="utf-8"><title>Authentication Error</title>
<body>Authentication failed: ${safe}</body>
<script>
  try {
    if (window.opener) {
      window.opener.postMessage('authorization:github:error:' + JSON.stringify({ error: ${JSON.stringify(
        safe
      )} }), '*');
      setTimeout(function(){ window.close(); }, 60);
    }
  } catch (e) {}
</script>`;
}

// ---- Routes ----

// Health
app.get("/health", (_, res) => {
  res.json({
    status: "OK",
    service: "OAuth Bridge for Decap CMS",
    publicBaseUrl: PUBLIC_BASE_URL,
  });
});

// Start auth → GitHub
app.get("/auth", (req, res) => {
  const provider = req.query.provider || "github";
  if (provider !== "github") {
    return res.status(400).json({ error: "Only GitHub provider is supported" });
  }

  if (!CLIENT_ID || !CLIENT_SECRET) {
    return res
      .status(500)
      .json({ error: "Missing CLIENT_ID / CLIENT_SECRET environment vars" });
  }

  const state = req.query.state || "state";
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: SCOPE,
    state,
  });

  res.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
});

// Callback → exchange code for token → postMessage to opener
app.get("/callback", async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).send(errorHTML("Missing ?code"));

  try {
    // IMPORTANT: GitHub expects form-encoded
    const body = new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
    }).toString();

    const tokenRes = await axios.post(
      "https://github.com/login/oauth/access_token",
      body,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        timeout: 10000,
      }
    );

    const { access_token, error, error_description } = tokenRes.data || {};
    if (!access_token) {
      const msg = error_description || error || "Failed to get access token";
      return res.status(400).send(errorHTML(msg));
    }

    // Send the token back to Decap in the popup
    res.status(200).type("html").send(successHTML(access_token));
  } catch (e) {
    const msg =
      (e.response && JSON.stringify(e.response.data)) ||
      e.message ||
      "Token exchange failed";
    res.status(500).send(errorHTML(msg));
  }
});

// (Optional) JSON exchange endpoint — handy for debugging
app.get("/token", async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).json({ error: "Missing ?code" });

  try {
    const body = new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
    }).toString();

    const tokenRes = await axios.post(
      "https://github.com/login/oauth/access_token",
      body,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    res.json(tokenRes.data);
  } catch (e) {
    res
      .status(500)
      .json({ error: "Token exchange failed", details: e.response?.data || e.message });
  }
});

app.listen(PORT, () => {
  console.log(`OAuth bridge running on :${PORT}`);
  console.log(`Public base URL: ${PUBLIC_BASE_URL}`);
  console.log(`Callback: ${REDIRECT_URI}`);
});
