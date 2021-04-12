import { Task, TaskList } from '../src/list.js'
import * as loulou from 'loulou'
import * as assert from 'assert'

describe('TaskList', function () {
  describe('constructor', function () {
    it('should initially have no tasks', function () {
      assert.strictEqual(new TaskList().tasks.length, 0)
    })
  })

  describe('add', function () {
    it('should insert task into list', function () {
      const list = new TaskList()
      loulou.render(list, document.body)
      const a = new Task(1, 'a')
      const b = new Task(1, 'b')
      const c = new Task(1, 'c')
      list.add(a)
      list.add(b)
      list.add(c)
      assert.deepStrictEqual(list.tasks, [a, b, c])
    })
  })

  describe('render', function () {
    describe('if container is empty', function () {
      it('should insert message to add task', function () {
        document.body.innerHTML = ''
        loulou.render(new TaskList(), document.body)
        assert.ok(document.querySelector('.message'))
        assert.strictEqual(document.body.firstChild.childElementCount, 1)
        assert.ok(document.body.firstChild.firstChild.classList.contains('message'))
      })
    })

    describe('if container is not empty', function () {
      it('should not insert message to add task', function () {
        document.body.innerHTML = '<div class="tomate-queue"><span>Test</span></div>'
        const container = document.querySelector('div')

        new TaskList().render(container)
        assert.strictEqual(container.children.length, 1)
        assert.ok(!container.firstChild.classList.contains('message'))
      })
    })
  })
})

describe('Task', function () {
  describe('render', function () {
    let task

    beforeEach(function () {
      task = new Task(25 * 60, 'Pomodoro')
    })

    it('should create element with disabled button', function () {
      assert.ok(task.render().querySelector('button').disabled)
    })

    it('should display timer as XX:XX', function () {
      const elem = task.render()
      const span = elem.querySelector('.tomate-timer')
      assert.strictEqual(span.textContent, '25:00')
    })

    it('should create elements needed by Timer', function () {
      const elem = task.render()
      assert.ok(elem.querySelector('.tomate-timer'))
      assert.ok(elem.querySelector('.tomate-timer-button'))
    })

    it('should escape double quotes', function () {
      const task = new Task(1, 'a"b"c')
      const elem = task.render()
      assert.strictEqual(elem.querySelector('input').value, 'a"b"c')
    })
  })
})
