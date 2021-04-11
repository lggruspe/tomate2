import { Timer } from './timer.js'
import * as loulou from 'loulou'

class Task {
  constructor (duration, description) {
    this.timer = new Timer(duration)
    this.duration = duration
    this.description = description
  }

  createElement (disabled = true) {
    const help = 'Puedes añadir #etiquetas para filtrar tareas en la página de estadísticas.'
    // TODO Are there other characters that need to be escaped?
    const description = this.description.replaceAll('"', '&quot;')

    const $ = loulou.to$(`
      <div class="task">
        <span class="tomate-timer">${this.timer.toString()}</span>
        <input required title="${help}" value="${description}">
        <button${disabled ? ' disabled' : ''} class="tomate-timer-button">Empezar</button>
      </div>
    `)

    this.timer.render($())
    return $()
  }
}

class TaskQueue {
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
      task.timer.setCallback(() => {
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

export { Task, TaskQueue }
