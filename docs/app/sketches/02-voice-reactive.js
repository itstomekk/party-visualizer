// 02 - Voice Reactive
// Same camera warp as 01, but zoom pulse and pixelation glitch now respond
// to mic input (mid/high frequency bins = where voice sits).
// Remove a.show() once you've confirmed the mic is picking up sound.

s0.initCam()

a.setSmooth(0.6)
a.setCutoff(2)
a.setBins(4)
a.show() // debug meter - delete this line for the actual party

src(s0)
  .modulate(noise(3, 0.5), 0.01)
  .modulateScale(osc(4, 0.1, 1).rotate(0.2), () => 0.2 + a.fft[1] * 1.5)
  .luma(0.4, 0.1)
  .color(1.2, 0.6, 1.5)
  .modulatePixelate(src(s0).scale(2), 20, () => 4 + a.fft[2] * 40)
  .out()
