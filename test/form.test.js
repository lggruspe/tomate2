import { createTaskForm } from '../src/form.js'
import { TaskList } from '../src/list.js'

import * as loulou from 'loulou'
import * as assert from 'assert'

describe('createTaskForm', function () {
  let list
  let form
  let elem
  beforeEach(() => {
    list = new TaskList()
    form = createTaskForm(list)
    loulou.render(list, document.body)
    elem = document.body.appendChild(form)
  })

  describe('when form button gets clicked', () => {
    it('enqueue add task to queue', () => {
      assert.strictEqual(list.tasks.length, 0)
      elem.firstChild.value = 10
      elem.children[1].value = 'Test'
      elem.querySelector('button').click()
      assert.strictEqual(list.tasks.length, 1)
    })
  })
})
