import { useState, useEffect} from "react";
import { Gantt } from 'gantt-task-react';

import TaskItem from '../Tasks/TaskItem'

import Modal from '@mui/material/Modal';
import dayjs from 'dayjs';
import "gantt-task-react/dist/index.css";
import './TimeLine.css'

export default function TimeLine({projectTasks,taskUpdateWatch,setTaskUpdateWatch,scale,setScale,openTask,setOpenTask}) {

const[selectedTask,setSelectedTask]=useState(null)

const tooltipOverride = ()=>{
return(
  <div
   
   ></div>
)
}
const handleClick = (e)=>{
  console.log(e.id)
  
 const task = projectTasks.filter((item)=>{
  if (item._id===e.id)
  return true
 })
 
 setSelectedTask(task[0])
  setOpenTask(true)
}
const handleClose=()=>{
  setOpenTask(false)
}

  //ganntt information
  let ganttTasks = projectTasks.map((task)=>{
    let todos = task.taskTodos
    let percentComplete
    const filterByCompleteTodo=(item)=>
    {if(item.todoStatus===true)
      return true
    }

    if(todos.length){
    let completedTodos=todos.filter(filterByCompleteTodo).length
    percentComplete = completedTodos/todos.length *100
    }    
    const container = 
    {
    start:dayjs(task.taskStartDate).toDate(),
    end:dayjs(task.taskTargetEndDate).toDate(),
    name:task.taskDescription,
    id:task._id,
    type: "task",
    progress:percentComplete,
 
  }
  
    return container
})
ganttTasks=ganttTasks.sort((a,b)=>a.start-b.start)

  return (
    <div >
      
      {ganttTasks.length?<div className='ganttpageorient'  >
        
    
      <Gantt 
      className='ganttpage'
      tasks ={ganttTasks}
      viewMode={scale}
      onClick = {handleClick}
      listCellWidth={""}
      // ganttHeight={600}
      // headerHeight={10}
     TooltipContent={
      ()=>tooltipOverride
    }
      // rowHeight={30}
      barCornerRadius={5}
      barFill={50}
      barProgressColor={'#6aed0b'}
      barProgressSelectedColor = {'#599e28'}
      

    />
    </div>:<div>No Tasks</div>}
    <Modal
    // sx={{width:'100%'}}
    open={openTask} 
    onClose={handleClose}

    >
      
      <TaskItem
      task={selectedTask}
      setTaskUpdateWatch={setTaskUpdateWatch}
      taskUpdateWatch={taskUpdateWatch}
      
      />
      
    </Modal>
    </div>
  )
}