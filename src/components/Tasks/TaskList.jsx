import React from 'react'
import TaskItem from './TaskItem'
import './TaskList.css'
export default function TaskList({projectTasks,taskUpdateWatch,setTaskUpdateWatch,
}) {
  return (
    <div className='tasklist'>
        {projectTasks.length?
      projectTasks.map(task=>(<TaskItem task={task} taskUpdateWatch={taskUpdateWatch} setTaskUpdateWatch={setTaskUpdateWatch} value={task._id} key={task._id}/>)):<h4>No Tasks for this project. To add a task click +</h4>
    }
    </div>
  )
}
