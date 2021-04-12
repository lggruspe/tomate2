export default class Beep {
  constructor (path) {
    this.audio = new Audio(path)
    this.audio.loop = true
  }

  play () {
    if (this.audio) {
      this.audio.play()
    }
  }

  stop () {
    if (this.audio) {
      this.audio.pause()
      delete this.audio
    }
  }
}
