import { TaskForm } from './form.js'
import { TaskQueue } from './task.js'

import * as loulou from 'loulou'

const taskQueue = new TaskQueue()
const taskForm = new TaskForm()
taskForm.register(taskQueue)

taskQueue.render(document.querySelector('.tomate-queue'))
loulou.render(taskForm, document.querySelector('.tomate-queue-form-parent'))
