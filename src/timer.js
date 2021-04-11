function tick () {
  return new Promise(resolve => setTimeout(resolve, 1000))
}

class AsyncTimer {
  constructor (seconds) {
    this.seconds = seconds
  }

  async start (onTick) {
    while (this.seconds > 0) {
      this.seconds--
      onTick(this.seconds)
      await tick()
    }
  }

  stop () {
    this.seconds = 0
  }
}

export function prettify (seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  if (mins > 60) {
    throw new Error('unimplemented')
  }
  const mm = mins < 10 ? '0' + mins : mins
  const ss = secs < 10 ? '0' + secs : secs
  return `${mm}:${ss}`
}

class Beep {
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

export class Timer {
  constructor (minutes = 25) {
    if (minutes < 0 || minutes > 60) {
      throw new Error('Minutes should be between 0 and 60.')
    } else if (!Number.isInteger(minutes)) {
      throw new Error('Minutes should be an integer.')
    }
    this.minutes = minutes
    this.seconds = 0
    this.alarmCallback = () => {}
    this.beep = new Beep('zapsplat_household_clock_alarm_digital_beep_long.mp3')
  }

  setCallback (callback) {
    this.alarmCallback = callback
    return this
  }

  render (container) {
    const timer = container.querySelector('.tomate-timer')
    const button = container.querySelector('.tomate-timer-button')

    const onTick = secs => {
      timer.textContent = prettify(secs)
    }

    const asyncTimer = new AsyncTimer(this.minutes * 60 + this.seconds)
    button.onclick = () => {
      button.textContent = 'Parar'
      asyncTimer.start(onTick).then(() => this.beep.play())
      button.onclick = () => {
        this.alarmCallback()
        this.beep.stop()
      }
    }
    return container
  }
}
