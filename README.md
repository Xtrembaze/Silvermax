# Silvermax: deploy on Vercel

No database. Shipments and site text live in `data/db.json` inside your project.

## Deploy
1. Put this folder in a GitHub repository.
2. In Vercel: Add New > Project > import the repo (no build settings needed).
3. In Project Settings > Environment Variables add:
   - `ADMIN_PASSWORD`: your admin password (required)
   - `GITHUB_TOKEN`: fine-grained token with Contents read/write on this repo (optional, enables one-click publishing)
   - `GITHUB_REPO`: `yourname/your-repo` (optional)
   - `GITHUB_BRANCH`: defaults to `main` (optional)
4. Redeploy once after adding the variables.

## Admin
Open `https://your-site.vercel.app/admin` (there is no link to it on the public site). Log in with `ADMIN_PASSWORD`, edit shipments or content, then click **Save & publish**.
- With the GitHub variables set, the change is committed and Vercel redeploys by itself (about 1 minute).
- Without them, `db.json` downloads. Replace `data/db.json` with it and push.

## Privacy
Visitors can only fetch one shipment at a time by exact tracking code. The full list and the payment instructions are not public, and payment instructions only appear for shipments in Custom Clearance. Change the demo shipment code `SMX-100200` before launch.
