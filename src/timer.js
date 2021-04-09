module.exports.Timer = class Timer {
  constructor (minutes = 25) {
    if (minutes < 0 || minutes > 60) {
      throw new Error('Minutes should be between 0 and 60.')
    } else if (!Number.isInteger(minutes)) {
      throw new Error('Minutes should be an integer.')
    }
    this.minutes = minutes
    this.seconds = 0
    this.started = false
    this.callbacks = []
    this.audio = new Audio('zapsplat_household_clock_alarm_digital_beep_long.mp3')
    this.audio.loop = true
  }

  isDone () {
    return this.seconds === 0 && this.minutes === 0
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

  addAlarm (callback) {
    this.callbacks.push(callback)
    return this
  }

  alarm () {
    for (const callback of this.callbacks) {
      callback()
    }
  }

  render (container) {
    const timer = container.querySelector('.tomate-timer')
    const button = container.querySelector('.tomate-timer-button')

    const oneSecond = () => {
      timer.textContent = this.toString()
      if (!this.isDone()) {
        this.tick()
        setTimeout(oneSecond, 1000)
      } else if (this.audio) {
        this.audio.play()
      }
    }

    button.addEventListener('click', () => {
      if (this.started) {
        this.alarm()
        this.audio.pause()
        delete this.audio
      } else {
        this.started = true
        button.textContent = 'Parar'
        oneSecond()
      }
    })
    return container
  }
}
