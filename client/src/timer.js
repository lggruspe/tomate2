module.exports.Timer = class Timer {
  constructor (minutes = 25) {
    if (minutes < 0 || minutes > 60) {
      throw new Error('Minutes should be between 0 and 60.')
    } else if (!Number.isInteger(minutes)) {
      throw new Error('Minutes should be an integer.')
    }
    this.minutes = minutes
    this.seconds = 0
  }

  tick () {
    if (this.seconds > 0) {
      this.seconds--
    } else if (this.minutes > 0) {
      this.minutes--
      this.seconds = 59
    }
    return this
  }

  toString () {
    const minutes = this.minutes < 10
      ? '0' + this.minutes
      : this.minutes
    const seconds = this.seconds < 10
      ? '0' + this.seconds
      : this.seconds
    return `${minutes}:${seconds}`
  }
}
