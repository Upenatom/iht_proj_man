import React from 'react'

export default function TaskItem({task}) {
  return (
    <ul className='projectItem'>
        <li>Description: {task.taskDescription}</li>
        <li>Comments: {task.taskComments}</li>
        <li>Due date: {task.taskTargetEndDate}</li>
        <li>Assigned to: {task.taskOwner}</li>
        <li>Status: {task.taskStatus}</li>
              
      </ul>
  )
}
