import { useState, useEffect} from "react";
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import * as utils from '../../../resources/utils/utils'
import './TodoItem.css'


export default function TodoItem({todo,task,setTodoWatch,todoWatch}) {
    const [checked,setChecekd]=useState(todo.todoStatus)
    
    const handleChange=async ()=>{
        setChecekd(!checked)
        try{
            let body={todoStatus:!checked}
            let options = utils.putBuilder(body)
            const fetchResponse= await fetch (`api/todos/update/${task._id}/${todo._id}`,options)
            if(!fetchResponse.ok)
            { throw new Error('Fetch failed - Bad Request')}
            setTodoWatch(!todoWatch)
        }
        catch(err){
            console.log(err)
        }
    }
    
    const handleDelete=async()=>{
        try{
            let jwt = localStorage.getItem("token");
            const options = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + jwt,
                },
            }
            const fetchResponse= await fetch(`api/todos/delete/${task._id}/${todo._id}`,options)
            if(!fetchResponse.ok)
            { throw new Error('Fetch failed - Bad Request')}
            setTodoWatch(!todoWatch)
        }
        catch(err){
            console.log(err)
            console.log ('todo delete failed')
        }
    }
    return (

    <div>
        
        <div className='todoItem'><IconButton onClick ={handleDelete}><DeleteForeverIcon/></IconButton><Checkbox
      checked={checked} onChange={handleChange}></Checkbox>{checked?<span style={{textDecoration:'line-Through'}}>- {todo.todo}</span>:
      <span>- {todo.todo}</span>} </div>
    </div>
  )
}
