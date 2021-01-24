const { Timer } = require('../src/timer.js')

const assert = require('assert')

describe('Timer', function () {
  describe('constructor', function () {
    it('should default to 25 minutes', function () {
      const timer = new Timer()
      assert.strictEqual(timer.minutes, 25)
      assert.strictEqual(timer.seconds, 0)
    })

    it('should disallow negative minutes', function () {
      assert.throws(() => new Timer(-1))
    })

    it('should disallow more than 60 minutes', function () {
      assert.throws(() => new Timer(61))
    })

    it('should only allow integer minutes', function () {
      assert.throws(() => new Timer('1'))
      assert.throws(() => new Timer(1.1))
    })
  })

  describe('tick', function () {
    it('should not tick below 00:00', function () {
      const timer = new Timer(0).tick()
      assert.strictEqual(timer.minutes, 0)
      assert.strictEqual(timer.seconds, 0)
    })

    it('should tick down by 1 second', function () {
      const timer = new Timer()
      timer.seconds = 1
      assert.strictEqual(timer.minutes, 25)
      assert.strictEqual(timer.seconds, 1)

      timer.tick()
      assert.strictEqual(timer.minutes, 25)
      assert.strictEqual(timer.seconds, 0)

      timer.tick()
      assert.strictEqual(timer.minutes, 24)
      assert.strictEqual(timer.seconds, 59)
    })
  })

  describe('toString', function () {
    it('should return a string of the form XX:XX', function () {
      assert.strictEqual(new Timer().toString(), '25:00')
      assert.strictEqual(new Timer(0).toString(), '00:00')
      assert.strictEqual(new Timer().tick().toString(), '24:59')
    })
  })
})
