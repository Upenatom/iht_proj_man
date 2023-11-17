import { useState, useEffect} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import './Todo.css'



export default function Todo({todoOpen,handleCloseModal,task}) {
    const[todo, setTodo]=useState('')
  return (
    <div>
        
        <Dialog
        open={todoOpen}
        onClose={handleCloseModal}
        fullWidth
        maxWidth={'md'}>
            <DialogTitle>Todo List for: {<span className='todotask'>{task.taskDescription}</span>}</DialogTitle>
            <DialogContent>
                            
                
                
                    <TextField fullWidth value={todo} onChange={(e)=>setTodo(e.target.value)}size="medium" label="Add a new Todo" /><Button variant="contained">Add</Button>
                
          
        </DialogContent>
         <DialogActions>
        <Button onClick={handleCloseModal}>Exit</Button>
        </DialogActions>
        </Dialog>
    </div>
  )
}
