import { useState, useEffect} from "react";
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControl from '@mui/material/FormControl';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as utils from '../../../resources/utils/utils'

export default function EditTask({editTaskModal,task,setEditTaskModal,setTaskUpdateWatch,taskUpdateWatch}) {

const[startDate,setStartDate]=useState()
const[endDate,setEndDate]=useState()
const[taskInfo,setTaskInfo]=useState({
        taskDescription:task.taskDescription,
  })

const handleCloseEditTaskModal=()=>{
  setEditTaskModal(false)
  setTaskInfo({taskStartDate:startDate,
    taskTargetEndDate:task.endDate,
    taskDescription:task.taskDescription,})
}

const handleSubmit=async()=>{
    
        let body = 
        {...taskInfo,taskTargetEndDate:endDate,taskStartDate:startDate}
        
       let options=utils.putBuilder(body)
       try{
        
        const fetchResponse = await fetch(`/api/tasks/update/${task._id}`, options)
        if(!fetchResponse.ok)
        { throw new Error('Fetch failed - Bad Request')}
        setTaskUpdateWatch(!taskUpdateWatch)
       }
        catch(err){
          console.log(err)
        }
        handleCloseEditTaskModal()
}

const handleChange= (e)=>{
setTaskInfo({...taskInfo,[e.target.name]:e.target.value})}
  return (
    <div>

        <Dialog open={editTaskModal} 
         onClose={handleCloseEditTaskModal}>
         <DialogTitle>Edit Task</DialogTitle>
         <DialogContent>
          <DialogContentText>
            Enter the details of your Task
          </DialogContentText>
          <Stack spacing={2}>             
          <FormControl>
             <TextField
             id="Task Description"
             label="Task Description"
             name = 'taskDescription'
             onChange={handleChange}
             value = {taskInfo.taskDescription}
             multiline
             rows={4}/>
          </FormControl>
        
          <FormControl fullWidth>
             
  
  
</FormControl>

          

          <FormControl fullWidth>
           <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
         <DatePicker
          label="Start Date"
          name='projStartDate'
          value={dayjs(task.taskStartDate)}
          onChange={(newValue) => setStartDate(newValue)}
          
          />
          
        <DatePicker
          label="Target End Date"
          name='taskTargetEndDate'
          value={dayjs(task.taskTargetEndDate)}
          onChange={(newValue) => setEndDate(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
          </FormControl>
        </Stack>
         </DialogContent>
         <DialogActions>
          <Button variant='contained' onClick={handleCloseEditTaskModal}>Cancel</Button>
          <Button variant='contained' onClick={handleSubmit}>Save Task</Button>
        </DialogActions>
       </Dialog>
    </div>
  )
}
