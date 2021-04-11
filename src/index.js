import { createTaskForm } from './form.js'
import { TaskQueue } from './task.js'

import * as loulou from 'loulou'

const taskQueue = new TaskQueue()
const taskForm = createTaskForm(taskQueue)

taskQueue.render(document.querySelector('.tomate-queue'))
loulou.render(taskForm, document.querySelector('.tomate-queue-form-parent'))
