# Strapi Webhook Setup for GitHub Actions

This guide explains how to configure Strapi Cloud to trigger a rebuild when blog posts are published, updated, or deleted.

## Prerequisites

1. GitHub Personal Access Token (PAT) with `repo` scope
2. Access to Strapi Cloud admin panel

## Step 1: Create GitHub Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Name it: "Strapi Webhook Token"
4. Select scopes:
   - `repo` (Full control of private repositories)
5. Generate token and copy it (you won't see it again!)

## Step 2: Configure Webhook in Strapi Cloud

1. Log into Strapi Cloud admin: https://prized-comfort-f8701bc0e2.strapiapp.com/admin

2. Go to **Settings → Webhooks**

3. Click **"Add new webhook"**

4. Configure the webhook:

   **Name**: `GitHub Actions Deploy`

   **URL**:
   ```
   https://api.github.com/repos/marketingcar/marketingcarwebsite/dispatches
   ```

   **Headers**:
   ```
   Authorization: Bearer YOUR_GITHUB_PAT_TOKEN
   Accept: application/vnd.github+json
   X-GitHub-Api-Version: 2022-11-28
   ```

   **Events to trigger**:
   - ✅ `entry.create`
   - ✅ `entry.update`
   - ✅ `entry.publish`
   - ✅ `entry.unpublish`
   - ✅ `entry.delete`

   **Content Type**: Select `blog` (api::blog.blog)

5. Click **Save**

## Step 3: Test the Webhook

### Option A: Test from Strapi UI
1. In the webhook settings, click **"Trigger"** button
2. Check GitHub Actions tab to see if workflow started

### Option B: Publish a blog post
1. Edit any blog post in Strapi
2. Click **Publish**
3. Go to your GitHub repository → Actions tab
4. You should see a new workflow run triggered by "repository_dispatch"

## Webhook Payload Format

Strapi will send this payload structure when triggering the webhook:

```json
{
  "event_type": "strapi-publish",
  "client_payload": {
    "event": "entry.publish",
    "model": "blog",
    "entry": {
      "id": 123,
      "title": "My Blog Post",
      "slug": "my-blog-post"
    }
  }
}
```

## Troubleshooting

### Webhook not triggering
- Verify GitHub PAT token has `repo` scope
- Check webhook logs in Strapi admin
- Ensure repository name is correct: `marketingcar/marketingcarwebsite`

### Workflow not starting
- Check GitHub Actions tab for any errors
- Verify `repository_dispatch` is in your workflow YAML
- Ensure webhook event types match workflow types

### Build still uses old content
- This is expected! The webhook triggers a rebuild, which:
  1. Fetches fresh content from Strapi API
  2. Pre-renders all pages with new content
  3. Deploys to hosting
- Allow 3-5 minutes for full deployment

## Alternative: Manual Trigger

You can also manually trigger a rebuild:
1. Go to GitHub → Actions
2. Select "Build & Deploy to FTP" workflow
3. Click "Run workflow" → "Run workflow"

## Security Notes

- Keep your GitHub PAT token secret
- Never commit the PAT token to your repository
- Store it only in Strapi webhook configuration
- Rotate the token periodically for security
