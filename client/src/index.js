const { TaskQueue, TaskForm } = require('./task.js')

const taskQueue = new TaskQueue()
const taskForm = new TaskForm()
taskForm.register(taskQueue)

taskQueue.render(document.querySelector('.tomate-queue'))
taskForm.render(document.querySelector('.tomate-queue-form'))
