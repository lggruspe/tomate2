import { TaskForm } from '../src/form.js'
import { TaskQueue } from '../src/task.js'

import * as assert from 'assert'

describe('TaskForm', function () {
  describe('broadcast', function () {
    it('should send task to all registered queues', function () {
      const a = []
      const b = []
      const c = []
      const form = new TaskForm()
      form.register(a)
      form.register(b)
      form.register(c)
      form.broadcast(1)
      form.broadcast(2)
      form.broadcast(3)
      assert.deepStrictEqual(a, [1, 2, 3])
      assert.deepStrictEqual(b, [1, 2, 3])
      assert.deepStrictEqual(c, [1, 2, 3])
    })
  })

  describe('render', function () {
    it('should not crash', () => {
      const queue = new TaskQueue()
      const form = new TaskForm()
      form.register(queue)

      const elem = document.body.appendChild(form.render())
      elem.firstChild.value = 10
      elem.children[1].value = 'Test'
      elem.querySelector('button').click()
      // TODO test if event listeners were registered
    })
  })
})
