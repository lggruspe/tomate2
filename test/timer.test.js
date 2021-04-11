import { prettify, Timer } from '../src/timer.js'
import * as assert from 'assert'

describe('prettify', function () {
  it('should return a string of the form XX:XX', () => {
    assert.strictEqual(prettify(25 * 60), '25:00')
    assert.strictEqual(prettify(0), '00:00')
    assert.strictEqual(prettify(24 * 60 + 59), '24:59')
  })
})

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

  describe('setCallback', function () {
    it('should set alarm callback', () => {
      let ok = false
      new Timer().setCallback(() => {
        ok = true
      }).alarmCallback()
      assert.ok(ok)
    })
  })

  describe('render', function () {
    it('should not crash', function () {
      document.body.innerHTML = `
        <div>
          <span class="tomate-timer"></span>
          <button class="tomate-timer-button">Test</button>
        </div>
      `
      const container = document.querySelector('div')
      new Timer().render(container)
      // TODO test if event listeners were registered
    })
  })
})
