// 03 - Edge Dissolve Stars
// Detects edges/contours of people & objects in the camera feed, traces them
// with a sparse green "star" noise field, and adds feedback so the stars
// drift outward and dissolve like embers. Voice loudness makes it denser/twinklier.

s0.initCam()

a.setSmooth(0.7)
a.setCutoff(2)
a.setBins(4)

// edge map: subtract camera from a slightly shifted copy of itself.
// wherever pixels change fast (an edge/contour), this lights up.
edges = src(s0)
  .diff(src(s0).scrollX(0.006).scrollY(0.004))
  .thresh(0.12, 0.02)

// twinkling star field: noise thresholded into sparse bright dots.
// voice loudness (fft[1]/fft[2]) makes it denser and twinklier.
stars = noise(90, () => 4 + a.fft[1] * 20)
  .thresh(() => 0.92 - a.fft[2] * 0.08, 0.01)
  .color(0.1, 1, 0.3) // green - try (1, 0.1, 0.6) for magenta, (0.1, 0.6, 1) for blue
  .mask(edges)

// dim base image + green stars along edges + feedback trail so
// stars linger, drift outward and fade like a slow dissolve.
src(s0)
  .color(0.1, 0.15, 0.15)
  .add(stars, 1.4)
  .add(
    src(o0).scale(1.01).color(0.9, 1, 0.9).mult(solid(0.85, 0.85, 0.85)),
    0.5
  )
  .out()
