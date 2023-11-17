import { useState, useEffect} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import './Todo.css'

import TodoItem from './TodoItem'

export default function Todo({todoOpen,handleCloseModal,task,todoWatch,setTodoWatch,taskTodos,setTaskTodos}) {
  
  const[todo, setTodo]=useState('')

  
  const handleSubmitTodo=async (e)=>{
    e.preventDefault()
    let owner = task.taskOwner._id.toString()
    let body = {todo:todo,
    todoOwner:owner}
    let jwt = localStorage.getItem('token')
    try{
      if (todo!==''){
    const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 'Authorization': 'Bearer ' + jwt
            },
            body: JSON.stringify(body)
        }
        const fetchResponse= await fetch (`/api/todos/create/${task._id}`,options)
        if(!fetchResponse.ok){
          throw new Error('Fetch failed - Bad Request')}
          setTodo('')
          setTodoWatch(!todoWatch)}
      
      }
        catch(err){
          console.log(err)
          console.log ("Todo creation error");
        }
}


return (

    <div>
        
        <Dialog
        open={todoOpen}
        onClose={handleCloseModal}
        fullWidth
        maxWidth={'md'}>
            <DialogTitle>Todo List for: {<span className='todotask'>{task.taskDescription}</span>}</DialogTitle>
            <DialogContent>
              <TextField 
              fullWidth
              value={todo}
              onChange={(e)=>setTodo(e.target.value)}size="medium"
              label="Add a new Todo" />
              <Button onClick={handleSubmitTodo} variant="contained">Add</Button>            {taskTodos.length?taskTodos.map(todo=>
              <TodoItem 
              key={todo._id}
              todo={todo}
              task={task}
              setTodoWatch={setTodoWatch}
              todoWatch={todoWatch}
              />):<div>No todos for this task</div>}
          
        </DialogContent>
         <DialogActions>
        <Button onClick={handleCloseModal}>Exit</Button>
        </DialogActions>
        </Dialog>
    </div>
  )
}
