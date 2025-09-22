# Marketing Car OAuth Bridge

A simple OAuth bridge server for Decap CMS to authenticate with GitHub.

## Setup

1. Copy `.env.example` to `.env`
2. Add your GitHub Client Secret to the `.env` file
3. Install dependencies: `npm install`
4. Run the server: `npm start`

## GitHub OAuth App Settings

Update your GitHub OAuth app settings:
- **Authorization callback URL**: `https://your-oauth-domain.com/callback`

## Environment Variables

- `GITHUB_CLIENT_ID`: Your GitHub OAuth App Client ID
- `GITHUB_CLIENT_SECRET`: Your GitHub OAuth App Client Secret
- `PORT`: Server port (default: 3001)

## Endpoints

- `GET /auth?provider=github` - Initiates GitHub OAuth flow
- `GET /callback` - Handles GitHub OAuth callback
- `GET /health` - Health check

## Deployment

Deploy this server to any hosting platform (Vercel, Netlify Functions, Railway, etc.) and update your Decap CMS config with the deployed URL.