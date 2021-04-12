import { AsyncTimer, prettify } from './timer.js'
import Beep from './beep.js'
import * as loulou from 'loulou'

class Task {
  constructor (seconds, description) {
    this.seconds = seconds
    this.description = description
    this.callback = () => {}
  }

  render () {
    const help = 'Puedes añadir #etiquetas para filtrar tareas en la página de estadísticas.'
    const $ = loulou.to$(`
      <div class="task">
        <span class="tomate-timer">${prettify(this.seconds)}</span>
        <input required title="${help}">
        <button disabled class="tomate-timer-button">Empezar</button>
      </div>
    `)
    $('input').value = this.description

    const beep = new Beep('beep.mp3')
    const timer = $('.tomate-timer')
    const button = $('.tomate-timer-button')
    const onTick = secs => {
      timer.textContent = prettify(secs)
    }
    const asyncTimer = new AsyncTimer(this.seconds)
    button.onclick = () => {
      button.textContent = 'Parar'
      asyncTimer.start(onTick).then(() => beep.play())
      button.onclick = () => {
        this.callback()
        beep.stop()
      }
    }
    return $()
  }
}

class TaskList {
  constructor () {
    this.tasks = [] // List of tasks displayed in the task list.
    this.ui = new loulou.Ui($ => this.update($))
    this.ui.watch(this, 'add')
    this.ui.watch(this, 'remove')
  }

  add (task) {
    task.callback = () => this.remove(task)
    this.tasks.push(task)
  }

  remove (task) {
    this.tasks = this.tasks.filter(t => t !== task)
  }

  render () {
    const $ = loulou.to$('<section class="card tomate-queue"></section>')
    this.update($)
    return $()
  }

  update ($) {
    const elem = $()
    if (this.tasks.length === 0) {
      elem.innerHTML = '<p class="message">Añade tareas por hacer.</p>'
      return
    }
    $('.message')?.remove()
    if (elem.childElementCount > this.tasks.length) {
      elem.firstElementChild.remove()
    }
    for (let i = elem.childElementCount; i < this.tasks.length; i++) {
      loulou.render(this.tasks[i], elem)
    }
    elem.firstElementChild.querySelector('button').disabled = false
  }
}

export { Task, TaskList }
