// 06 - Thermal Feedback Trails
// Fake thermal-camera color grading with long feedback trails - anything
// that moves leaves a fading rainbow trail behind it. Good for dance floors.

s0.initCam()

a.setSmooth(0.5)
a.setCutoff(2)
a.setBins(4)

src(s0)
  .luma(0.3, 0.1)
  .color(2, 1.5, 0.5)
  .contrast(1.4)
  .add(
    src(o0).scale(1.005).hue(0.01).saturate(1.02),
    () => 0.75 + a.fft[1] * 0.15
  )
  .out()
