import { createTaskForm } from './form.js'
import { TaskList } from './list.js'

import * as loulou from 'loulou'

const taskList = new TaskList()
const taskForm = createTaskForm(taskList)
loulou.render(taskList, document.querySelector('.tomate-queue-parent'))
loulou.render(taskForm, document.querySelector('.tomate-queue-form-parent'))
