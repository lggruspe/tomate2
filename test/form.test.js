import { createTaskForm } from '../src/form.js'
import { TaskQueue } from '../src/task.js'

import * as assert from 'assert'

describe('createTaskForm', function () {
  let queue
  let form
  let elem
  beforeEach(() => {
    queue = new TaskQueue()
    form = createTaskForm(queue)
    elem = document.body.appendChild(form)
  })

  describe('when form button gets clicked', () => {
    it('enqueue add task to queue', () => {
      assert.strictEqual(queue.tasks.length, 0)

      elem.firstChild.value = 10
      elem.children[1].value = 'Test'
      elem.querySelector('button').click()

      assert.strictEqual(queue.tasks.length, 1)
    })
  })
})
