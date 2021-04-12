import { prettify, AsyncTimer } from '../src/timer.js'
import * as assert from 'assert'

describe('prettify', () => {
  it('should return a string of the form XX:XX', () => {
    assert.strictEqual(prettify(25 * 60), '25:00')
    assert.strictEqual(prettify(0), '00:00')
    assert.strictEqual(prettify(24 * 60 + 59), '24:59')
  })
})

describe('AsyncTimer', () => {
  describe('start', () => {
    it('should count down from input - 1 to 0', async () => {
      const ticks = []
      const timer = new AsyncTimer(3)
      await timer.start(sec => ticks.push(sec))
      assert.deepStrictEqual(ticks, [2, 1, 0])
    })
  })

  describe('stop', () => {
    it('should stop running timer', async () => {
      const ticks = []
      const timer = new AsyncTimer(10)
      await timer.start(sec => {
        if (sec === 6) {
          timer.stop()
        } else {
          ticks.push(sec)
        }
      })
      assert.deepStrictEqual(ticks, [9, 8, 7])
    })
  })
})
