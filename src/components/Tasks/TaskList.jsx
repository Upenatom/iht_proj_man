import React from 'react'
import TaskItem from './TaskItem'
export default function TaskList({projectTasks}) {
  return (
    <div>
        {projectTasks.length?
      projectTasks.map(task=>(<TaskItem task={task}/>)):<h4>No Tasks for this project. To add a task click +</h4>
    }
    </div>
  )
}
