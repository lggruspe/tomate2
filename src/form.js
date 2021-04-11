import { Task } from './task.js'
import * as loulou from 'loulou'

export function createTaskForm (list) {
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
      list.push(new Task(value, description.value))
    }
  }
  return $()
}
