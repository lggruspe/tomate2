const {
  Task,
  TaskForm,
  TaskQueue
} = require('../src/task.js')

const { JSDOM } = require('jsdom')

const assert = require('assert')

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
        const html = '<div class="tomate-queue"></div>'
        const dom = new JSDOM(html)
        const container = dom.window.document.querySelector('div')

        assert.strictEqual(container.innerHTML, '')
        new TaskQueue().render(container)
        assert(container.firstChild.classList.contains('message'))
      })
    })

    describe('if container is not empty', function () {
      it('should not insert message to add task', function () {
        const html = '<div class="tomate-queue"><span>Test</span></div>'
        const dom = new JSDOM(html)
        const container = dom.window.document.querySelector('div')

        new TaskQueue().render(container)
        assert.strictEqual(container.children.length, 1)
        assert(!container.firstChild.classList.contains('message'))
      })
    })
  })
})

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
    beforeEach(function () {
      const html = `
        <body>
          <div class="tomate-queue-form">
            <input id="#duration" type="number">
            <input id="#description">
            <button type="button"></button>
          </div>
        </body>
      `
      this.dom = new JSDOM(html)
      this.container = this.dom.window.document.querySelector('div')
    })

    it('should not crash', function () {
      const queue = new TaskQueue()
      const form = new TaskForm()
      form.register(queue)
      form.render(this.container)
      this.container.firstChild.value = 10
      this.container.children[1].value = 'Test'
      this.container.querySelector('button').click()
      // TODO test if event listeners were registered
    })
  })
})

describe('Task', function () {
  before(function () {
    global.document = new JSDOM('').window.document
  })

  after(function () {
    delete global.document
  })

  describe('createElement', function () {
    beforeEach(function () {
      this.task = new Task(25, 'Pomodoro')
    })

    describe('if disabled = true', function () {
      it('should create element with disabled button', function () {
        const elem = this.task.createElement(true)
        assert(elem.querySelector('button').disabled)
      })
    })

    describe('if disabled = false', function () {
      it('should create element with enabled button', function () {
        const elem = this.task.createElement(false)
        assert(!elem.querySelector('button').disabled)
      })
    })

    it('should have class "task"', function () {
      assert(this.task.createElement().classList.contains('task'))
    })

    it('should display timer as XX:XX', function () {
      const elem = this.task.createElement()
      const span = elem.querySelector('.tomate-timer')
      assert.strictEqual(span.textContent, '25:00')
    })

    it('should create elements needed by Timer', function () {
      const elem = this.task.createElement()
      assert(elem.querySelector('.tomate-timer'))
      assert(elem.querySelector('.tomate-timer-button'))
    })

    it('should escape double quotes', function () {
      const task = new Task(25, 'a"b"c')
      const elem = task.createElement()
      assert.strictEqual(elem.querySelector('input').value, 'a"b"c')
    })
  })
})
