# Updating this repo

Do this whenever the tool changes (new or edited sketch, UI change, new Hydra version).

For the full, current procedure use the Hermes skill **`github-public-repo-maintenance`** (leak scan, README, Pages, push). Short version for this repo:

1. **Change the tool** (`index.html`, `sketches/`, `server.js`, `vendor/`).
2. **Refresh the live demo copy:** `npm run sync-demo` (rewrites `docs/app/`).
3. **Re-take screenshots** of the real app (`node server.js`, then Playwright with Firefox, synthetic camera stand-in, see `DEVELOPMENT.md#screenshots`). Save to `.github/readme/` and copy to `docs/img/`. Look at every screenshot: it must show a real visualizer frame, no real person's face, no personal text.
4. **Update docs:** the sketch table in `README.md`, `docs/index.html` (features, sketch count), `FUNCTION-REFERENCE.md` if new functions are used.
5. **New Hydra version?** `npm install`, bump the pin in `package.json`, `npm run vendor`, then update the version in `vendor/THIRD-PARTY-NOTICES.md` and re-check the bundled license list and `LICENSE`. Then `npm run sync-demo`.
6. **New files?** The `.gitignore` is deny-by-default: add `!path` (and `!dir/` + `!dir/**` for folders) for anything new.
7. **Leak scan, then commit and push:**
   ```bash
   python <skills>/software-development/github-public-repo-maintenance/scripts/leak_scan.py . --all-files   # before git add
   git add <named paths>            # never git add -A
   git diff --cached --name-only    # only intended files, no node_modules, nothing > 5 MB
   git commit -m "..."
   python <skills>/.../leak_scan.py . --history                        # exit code must be 0
   git push
   ```
8. **Verify:** the Pages URL serves the new content, and the README renders.
