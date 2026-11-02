// 01 - Camera Warp
// Basic camera feed with distortion, pulsing zoom, and a purple/magenta color shift.
// A good "always safe" starter effect — subtle, works in any lighting.

s0.initCam()
src(s0)
  .modulate(noise(3, 0.5), 0.01)
  .modulateScale(osc(4, 0.1, 1).rotate(0.2), 0.3)
  .luma(0.4, 0.1)
  .color(1.2, 0.6, 1.5)
  .modulatePixelate(src(s0).scale(2), 20, 4)
  .out()
