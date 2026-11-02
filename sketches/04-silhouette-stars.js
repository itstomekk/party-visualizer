// 04 - Full Silhouette Dissolve
// Variant of 03: instead of just outlining edges, the whole bright/moving
// silhouette of a person turns into a starfield. More dramatic, less subtle.

s0.initCam()

a.setSmooth(0.7)
a.setCutoff(2)
a.setBins(4)

// luma mask: anything reasonably bright/foreground becomes "the shape"
// instead of just edges.
shape = src(s0).luma(0.35, 0.2)

stars = noise(120, () => 5 + a.fft[1] * 25)
  .thresh(() => 0.9 - a.fft[2] * 0.1, 0.01)
  .color(0.1, 1, 0.4)
  .mask(shape)

src(s0)
  .color(0.05, 0.08, 0.08)
  .add(stars, 1.5)
  .add(
    src(o0).scale(1.015).color(0.9, 1, 0.9).mult(solid(0.8, 0.8, 0.8)),
    0.55
  )
  .out()
