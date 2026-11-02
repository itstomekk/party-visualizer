# Hydra Function Reference (cheat sheet)

Every Hydra effect is built by chaining functions from these 6 categories.
Full official docs: https://hydra.ojack.xyz/functions/ (interactive, click to
see live examples) or https://github.com/ojack/hydra/blob/master/docs/funcs.md
(plain text version).

A sketch is always: **one source**, piped through **geometry/color/modulate**
transforms, ending in `.out()`.

## 1. Sources — generates the base image
Pick one to start a chain.

| Function | What it makes |
|---|---|
| `osc(freq, sync, offset)` | Stripes/waves from an oscillator |
| `noise(scale, speed)` | Perlin noise (organic, cloudy) |
| `shape(sides, radius, smoothing)` | Polygon / circle |
| `voronoi(scale, speed, blending)` | Cell/organic patterns |
| `gradient(speed)` | Color gradient |
| `solid(r, g, b, a)` | Flat color |
| `src(x)` | Camera (`s0` after `s0.initCam()`) or another buffer (`o0`-`o3`) |

## 2. Geometry — warps shape/position
| Function | Effect |
|---|---|
| `.rotate(angle, speed)` | Spin |
| `.scale(amount, xMult, yMult)` | Zoom in/out |
| `.pixelate(x, y)` | Blocky/pixelated |
| `.repeat(x, y)` / `.repeatX()` / `.repeatY()` | Tile the image |
| `.kaleid(nSides)` | Kaleidoscope mirror |
| `.scrollX(amount, speed)` / `.scrollY()` | Pan/scroll |

## 3. Color — recolors/adjusts
| Function | Effect |
|---|---|
| `.color(r, g, b)` | Recolor / tint |
| `.colorama(amount)` | Cycle hue |
| `.saturate(amount)` | Saturation |
| `.brightness(amount)` | Brightness |
| `.contrast(amount)` | Contrast |
| `.invert(amount)` | Invert colors |
| `.luma(threshold, tolerance)` | Keep only bright/dark areas (great for silhouettes) |
| `.thresh(threshold, tolerance)` | Hard black/white cutoff (great for star/dot fields) |
| `.posterize(bins, gamma)` | Flatten to color bands |
| `.shift(r, g, b, a)` | Shift color channels |

## 4. Blend / Operators — combine two sources
| Function | Effect |
|---|---|
| `.add(other, amount)` | Add brightness of two sources (also how feedback trails work: `.add(src(o0).scale(1.01), 0.5)`) |
| `.blend(other, amount)` | Crossfade/mix |
| `.diff(other)` | Difference — lights up where two sources disagree (this is how edge-detection works, see `03-dissolve-stars.js`) |
| `.mult(other)` | Multiply — darkens/masks |
| `.mask(other)` | Use other source's brightness as a stencil/mask |
| `.layer(other)` | Composite on top |

## 5. Modulate — use one source to warp another (the "trippy" effects)
Instead of combining colors, these use one source's pixel values as a
**displacement map** for another. Every geometry function has a `modulate*`
version.

| Function | Effect |
|---|---|
| `.modulate(texture, amount)` | Warp position using another source's colors |
| `.modulateScale(texture, amount)` | Zoom driven by another source |
| `.modulateRotate(texture, amount)` | Rotation driven by another source |
| `.modulateKaleid(texture)` | Kaleidoscope driven by another source |
| `.modulatePixelate(texture, x, y)` | Pixelation driven by another source |
| `.modulateHue(texture, amount)` | Hue shift driven by another source |
| `.modulateRepeat*(texture)` | Tiling driven by another source |

## 6. Audio — mic reactivity
```js
a.setBins(4)      // split mic input into N frequency bins
a.setCutoff(2)    // ignore quiet/near-silent input
a.setSmooth(0.6)  // smooth frame-to-frame jitter
a.show()          // debug meter overlay (remove for real use)
a.fft[0]          // bass
a.fft[1]          // low-mid
a.fft[2]          // high-mid  <- voice sits mostly in [1] and [2]
a.fft[3]          // treble
```
Use any `a.fft[n]` anywhere a number is expected, wrapped in an arrow function
so it re-evaluates every frame: `.scale(() => 1 + a.fft[1] * 2)`.

## Buffers (chaining multiple outputs)
- `o0`-`o3`: four output buffers. `.out()` defaults to `o0`.
- `s0`-`s3`: four source slots (camera, external video, or another window).
- Feedback trick: `src(o0)` inside a chain that outputs back to `o0` reads
  the previous frame — this is how trails/dissolve/echo effects work (see
  `03-dissolve-stars.js` and `06-thermal-feedback.js`).

## How the sketches in this repo are built (as examples of the pattern)
- `01-camera-warp.js` = source (`src(s0)`) → modulate → geometry → color
- `03-dissolve-stars.js` = source (`noise`) → color → **diff** (edge detect)
  → **mask** → **add with feedback** (dissolve trail)
- `05-kaleidoscope.js` = source → **kaleid** (geometry) → color, driven by audio
