import React from 'react'
import TaskItem from './TaskItem'
export default function TaskList({projectTasks,taskUpdateWatch,setTaskUpdateWatch}) {
  return (
    <div>
        {projectTasks.length?
      projectTasks.map(task=>(<TaskItem task={task} taskUpdateWatch={taskUpdateWatch} setTaskUpdateWatch={setTaskUpdateWatch} key={task._id}/>)):<h4>No Tasks for this project. To add a task click +</h4>
    }
    </div>
  )
}
