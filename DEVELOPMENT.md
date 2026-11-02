# Development

## Layout

```
party-visualizer/
├── index.html              # runner UI: sketch picker, code box, Run/Fullscreen
├── server.js               # zero-dependency static server (Node built-ins only)
├── sketches/               # effect library: NN-name.js + manifest.json (picker list)
├── vendor/
│   ├── hydra-synth.js      # Hydra engine v1.4.0, unmodified browser build (AGPL-3.0)
│   ├── LICENSE-hydra-synth # its license text
│   └── THIRD-PARTY-NOTICES.md
├── scripts/sync-demo.js    # copies the runnable app into docs/app/
├── docs/                   # GitHub Pages site (served from main /docs)
│   ├── index.html          # landing page (self-contained)
│   ├── img/                # screenshots used by the landing page
│   └── app/                # static copy of the app = the live demo
├── .github/readme/         # screenshots used by README.md
├── FUNCTION-REFERENCE.md   # Hydra cheat sheet
├── README.md  DEVELOPMENT.md  UPDATING.md  LICENSE
└── package.json            # scripts + pinned hydra-synth (devDependency, only for re-vendoring)
```

`.gitignore` is **deny-by-default** (`/*`, then `!` for each allowed path). A new top-level file or folder is ignored until you add it there.

## Commands

| Command | What it does |
|---|---|
| `node server.js` or `npm start` | Serve the app on http://localhost:8080 (`PORT=9000 node server.js` to change) |
| `npm install` | Only needed to re-vendor Hydra (installs `hydra-synth@1.4.0` into `node_modules/`, which is never committed) |
| `npm run vendor` | Copy `node_modules/hydra-synth/dist/hydra-synth.js` to `vendor/hydra-synth.js` |
| `npm run sync-demo` | Refresh `docs/app/` from `index.html`, `sketches/`, `vendor/` |

Camera/mic only work on `http://localhost` or `https://`, not `file://`, so always use the server (or the Pages demo).

## Adding a sketch

1. Create `sketches/07-my-sketch.js`. Start it with a comment header (what it does, which numbers to tweak) and `s0.initCam()` if it uses the camera. See [FUNCTION-REFERENCE.md](FUNCTION-REFERENCE.md).
2. Add an entry to `sketches/manifest.json`: `{ "file": "sketches/07-my-sketch.js", "name": "...", "desc": "..." }`.
3. Reload the page, pick it, test with camera and mic.
4. Add a row to the sketch table in `README.md`, then run `npm run sync-demo`.

## Licensing

**The repo is licensed AGPL-3.0** (`LICENSE`, `package.json` says `AGPL-3.0-only`).

Why: `vendor/hydra-synth.js` is the unmodified bundle of [hydra-synth](https://github.com/ojack/hydra-synth) 1.4.0, whose `LICENSE` file is the GNU AGPL v3 text (`package.json` of hydra-synth: `"license": "AGPL"`). Redistributing it in a repo licensed MIT/Apache would be a licensing conflict. The options were: (a) AGPL-3.0 for everything, (b) don't ship the file and make users run `npm install`. (a) was chosen as least risky: it keeps the "works offline from a clone" promise, and the AGPL is satisfied by the repo itself being the public corresponding source. Because the app is also served to users over a network (the Pages demo, `server.js`), AGPL §13 asks that users can get the source: the panel has a "Source (AGPL-3.0)" link to this repo.

What was checked in `vendor/`:

| File | License found |
|---|---|
| `hydra-synth.js` (bundle of hydra-synth 1.4.0) | AGPL-3.0 (hydra-synth `LICENSE` = AGPLv3 text, package field `AGPL`). Byte-identical to `node_modules/hydra-synth/dist/hydra-synth.js` at the time of vendoring. |
| bundled inside it: `regl` 1.7.0, `meyda` 5.6.3, `raf-loop` 1.1.3, `raf` 3.4.1, `performance-now` 2.1.0, `right-now` 1.0.0, `events` 1.1.1 (Joyent notice is embedded in the bundle) | MIT |
| bundled inside it: `inherits` 2.0.4 | ISC |
| browserify `process` shim | MIT (not present in `node_modules`, noted from upstream) |

MIT/ISC are compatible with AGPL-3.0. Their notices are in `vendor/THIRD-PARTY-NOTICES.md`. The bundle's license list was derived from the browserify module map plus the `LICENSE` files in `node_modules`, not from a legal review. If you can't accept AGPL for your use, remove `vendor/` and load Hydra yourself (`npm install hydra-synth`), but you then lose the offline-from-clone property and Hydra's own AGPL terms still apply to you.

If you modify `vendor/hydra-synth.js`, mark the changes and publish the corresponding source (AGPL §5).

## Screenshots

README screenshots are real frames from the real app. Camera access is faked: a synthetic animated canvas (abstract stick-figure dancers and orbs, no real person) is plugged in with `s0.init({src: canvas, dynamic: true})` instead of `s0.initCam()`. Firefox with `media.navigator.streams.fake=true` also works for a simulated camera/mic, but its fake camera is nearly a flat color and shows little. See [UPDATING.md](UPDATING.md).
