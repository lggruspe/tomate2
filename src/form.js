import { Task } from './task.js'
import * as loulou from 'loulou'

export class TaskForm {
  constructor () {
    this.queues = []
    this.ui = new loulou.Ui(() => {})
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

  render () {
    const $ = loulou.to$(`
      <form class="card tomate-queue-form">
        <div class="form-item">
          <label for="duration">¿Cuántos minutos necesitas para hacer la tarea?</label>
          <input type="number" id="duration" min-value="0" max-value="60" value="25" required>
        </div>
        <div class="form-item">
          <label for="description">Describe la tarea.</label>
          <input id="description" value="Pomodoro" required title="Puedes añadir #etiquetas para filtrar tareas en la página de estadísticas.">
        </div>
        <div class="form-button">
          <button type="button">Agregar</button>
        </div>
      </form>
    `)

    const duration = $('#duration')
    const description = $('#description')
    $('button').onclick = () => {
      const value = Number(duration.value)
      if (value > 0) {
        this.broadcast(new Task(value, description.value))
      }
    }
    return $()
  }
}
