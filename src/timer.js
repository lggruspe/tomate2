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
