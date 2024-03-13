import { useState} from "react";
import dayjs from 'dayjs';
import TaskItem from './TaskItem'
import './TaskList.css'
export default function TaskList({projectTasks,taskUpdateWatch,setTaskUpdateWatch,
}) {

  let sorted
  if (projectTasks.length){
    sorted = projectTasks.sort((a,b)=>{
      const taskTargetEndDateA= a.taskTargetEndDate.toUpperCase()
      const taskTargetEndDateB= b.taskTargetEndDate.toUpperCase()
      if (taskTargetEndDateA<taskTargetEndDateB){
        return -1;
      }
      if (taskTargetEndDateA>taskTargetEndDateB){
        return 1;
      }
      return 0
    })
 }
 console.log(sorted)
  return (
    <div className='tasklist'>
        {projectTasks.length?
      sorted.map(task=>(<TaskItem task={task} taskUpdateWatch={taskUpdateWatch} setTaskUpdateWatch={setTaskUpdateWatch} value={task._id} key={task._id}/>)):<h4>No Tasks for this project. To add a task click +</h4>
    }
    </div>
  )
}
