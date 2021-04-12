import { createTaskForm } from './form.js'
import { TaskList } from './list.js'
import * as loulou from 'loulou'

const taskList = new TaskList()
const taskForm = createTaskForm(taskList)
const root = document.getElementById('root')
loulou.render(taskList, root)
loulou.render(taskForm, root)
