import { Task, TaskQueue } from '../src/task.js'

import * as assert from 'assert'

describe('TaskQueue', function () {
  describe('constructor', function () {
    it('should initially have no tasks', function () {
      assert.strictEqual(new TaskQueue().tasks.length, 0)
    })
  })

  describe('push', function () {
    it('should insert task into queue', function () {
      const queue = new TaskQueue()
      queue.push(1)
      queue.push(2)
      queue.push(3)
      assert.deepStrictEqual(queue.tasks, [1, 2, 3])
    })
  })

  describe('render', function () {
    describe('if container is empty', function () {
      it('should insert message to add task', function () {
        document.body.innerHTML = '<div class="tomate-queue"></div>'
        const container = document.querySelector('div')

        assert.strictEqual(container.innerHTML, '')
        new TaskQueue().render(container)
        assert.ok(container.firstChild.classList.contains('message'))
      })
    })

    describe('if container is not empty', function () {
      it('should not insert message to add task', function () {
        document.body.innerHTML = '<div class="tomate-queue"><span>Test</span></div>'
        const container = document.querySelector('div')

        new TaskQueue().render(container)
        assert.strictEqual(container.children.length, 1)
        assert.ok(!container.firstChild.classList.contains('message'))
      })
    })
  })
})

describe('Task', function () {
  describe('createElement', function () {
    let task

    beforeEach(function () {
      task = new Task(25, 'Pomodoro')
    })

    describe('if disabled = true', function () {
      it('should create element with disabled button', function () {
        const elem = task.createElement(true)
        assert.ok(elem.querySelector('button').disabled)
      })
    })

    describe('if disabled = false', function () {
      it('should create element with enabled button', function () {
        const elem = task.createElement(false)
        assert.ok(!elem.querySelector('button').disabled)
      })
    })

    it('should have class "task"', function () {
      assert.ok(task.createElement().classList.contains('task'))
    })

    it('should display timer as XX:XX', function () {
      const elem = task.createElement()
      const span = elem.querySelector('.tomate-timer')
      assert.strictEqual(span.textContent, '25:00')
    })

    it('should create elements needed by Timer', function () {
      const elem = task.createElement()
      assert.ok(elem.querySelector('.tomate-timer'))
      assert.ok(elem.querySelector('.tomate-timer-button'))
    })

    it('should escape double quotes', function () {
      const task = new Task(25, 'a"b"c')
      const elem = task.createElement()
      assert.strictEqual(elem.querySelector('input').value, 'a"b"c')
    })
  })
})
