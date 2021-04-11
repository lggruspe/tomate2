function tick () {
  return new Promise(resolve => setTimeout(resolve, 1000))
}

export class AsyncTimer {
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
  }

  setCallback (callback) {
    this.alarmCallback = callback
    return this
  }
}
