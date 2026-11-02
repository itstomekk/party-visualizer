// 05 - Audio Kaleidoscope
// Camera feed fed through a repeating/mirrored kaleidoscope pattern.
// Bass (fft[0]) drives the kaleidoscope segment count, voice/mids drive color cycling.

s0.initCam()

a.setSmooth(0.6)
a.setCutoff(2)
a.setBins(4)

src(s0)
  .kaleid(() => 4 + Math.floor(a.fft[0] * 8))
  .color(1, 1, 1)
  .hue(() => time * 0.05 + a.fft[1] * 0.5)
  .modulate(noise(4, 0.2), 0.02)
  .out()
