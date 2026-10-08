# Deploying scout.locallogicmanagement.com

Same pattern as Kronos, Threshold and Warden: a static site in its own repo
(LocalLogicManagers/scout-site), served by GitHub Pages on a subdomain.

## Files
- `index.html` – the page
- `styles.css` – Scout's look (green + blond-avatar sub-brand)
- `pricing.js` – **edit prices here.** `plans[].annual` is Scout's yearly price;
  `plans[].marketAvg` is the competition average for that level (Oct 2026 research);
  `offers.trial` / `offers.intro` set the free trial and $120/mo intro. Set `compare: false`
  to hide every competition comparison.
- `CNAME` – scout.locallogicmanagement.com

## Steps
1. GitHub Desktop → File → Add Local Repository → `~/Documents/GitHub/scout-site`
   → it will offer to "create a repository" here → Create Repository.
2. Commit everything ("Initial Scout site") → Publish repository →
   Organization: **LocalLogicManagers**, uncheck "Keep this code private"
   (or keep private if your org plan allows private Pages).
3. On github.com → LocalLogicManagers/scout-site → Settings → Pages →
   Source: Deploy from a branch → `main` / root → Save.
   Custom domain should already read scout.locallogicmanagement.com (from CNAME).
4. Wix → Domains → locallogicmanagement.com → DNS records → add
   **CNAME**: Host `scout` → Points to `locallogicmanagers.github.io`.
5. Wait for DNS (minutes to a few hours), then tick **Enforce HTTPS** in Pages settings.
6. Only after the subdomain loads: commit the pending change in `local-logic-site`
   (Scout row now links to scout.locallogicmanagement.com, plus footer + schema).

## IP notes
Layout conventions (hero with an agent avatar, example conversation, feature strip,
three-tier pricing, FAQ) are common to SaaS pages and not owned by anyone. What is
kept original here: the avatar illustration, all copy, the color system, plan names
(Field / Team / Territory), and section structure. No competitor is named, no
competitor logos, screenshots, taglines or award badges are used.
