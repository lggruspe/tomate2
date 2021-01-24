const { Timer } = require('./timer.js')

class Task {
  constructor (duration, description) {
    this.timer = new Timer(duration)
    this.duration = duration
    this.description = description
  }

  createElement (disabled = true) {
    const div = document.createElement('div')
    div.classList.add('task')
    const help = 'Puedes añadir #etiquetas para filtrar tareas en la página de estadísticas.'
    // TODO escape description
    div.innerHTML = `
      <span class="tomate-timer">${this.timer.toString()}</span>
      <input required title="${help}" value="${this.description}">
      <button${disabled ? ' disabled' : ''} class="tomate-timer-button">Empezar</button>
    `
    this.timer.render(div)
    return div
  }
}
module.exports.Task = Task

module.exports.TaskQueue = class TaskQueue {
  constructor () {
    this.tasks = []
  }

  // Add task. This method gets extended in render.
  push (task) {
    this.tasks.push(task)
  }

  render (container) {
    if (container.children.length === 0) {
      container.innerHTML = '<p class="message">Añade tareas por hacer.</p>'
    }
    const push = this.push
    this.push = task => {
      push.apply(this, task)
      if (container.lastChild.classList.contains('message')) {
        container.lastChild.remove()
      }
      const child = container.appendChild(task.createElement(this.tasks.length > 1))
      task.timer.addAlarm(() => {
        // TODO play audio
        this.tasks.shift()
        child.remove()
        if (container.firstChild) {
          container.firstChild.querySelector('button').disabled = false
        } else {
          container.innerHTML = '<p class="message">Añade tareas por hacer.</p>'
        }
      })
    }
    return container
  }
}

module.exports.TaskForm = class TaskForm {
  constructor () {
    this.queues = []
  }

  // Register task queue to be notified about new tasks.
  register (queue) {
    this.queues.push(queue)
  }

  // Tell registered queues about new task.
  broadcast (task) {
    for (const queue of this.queues) {
      queue.push(task)
    }
  }

  render (container) {
    const duration = container.querySelector('input#duration')
    const description = container.querySelector('input#description')
    const button = container.querySelector('button')

    button.addEventListener('click', () => {
      const _duration = Number(duration.value)
      if (_duration > 0) {
        this.broadcast(new Task(_duration, description.value))
      }
    })
    return container
  }
}
