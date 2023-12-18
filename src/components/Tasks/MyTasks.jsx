import { useState, useEffect} from "react";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MyTaskItem from '../Tasks/MyTaskItem'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './MyTasks.css'

export default function MyTasks({user}) {
  const[allMyTasks,setAllMyTasks]=useState([])
  const[taskUpdateWatch,setTaskUpdateWatch] = useState(false)
  const[filter,setFilter]=useState('Active')


  //fetch tasks on mount
  useEffect(()=>{
    const fetchMyTasks = async () =>{
      try {
       
    let jwt = localStorage.getItem("token");
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
     
    };
    const fetchResponse = await fetch(`/api/tasks/myTasks/${filter}`, options);
    //  const fetchResponse = await fetch(`/api/tasks/projectTasks/${projectid}/${filter}`, options);
    if (!fetchResponse.ok) {
      throw new Error("Fetch failed - Bad Request");
    }
    let tasks = await fetchResponse.json();
    let removedInactive = tasks.filter((task)=>{
      return task.taskParentProject.projStatus ==="In Progress"
    })
    setAllMyTasks(removedInactive)
    

    
  } catch (err) {
    console.log(err);
    console.log("Project Tasks fetch failed");
  }
  }
fetchMyTasks()

    },[taskUpdateWatch,filter])
 
const handleFilterChange=(e)=>{
    setFilter(e.target.value)
  }

    return (
    <div className='mytaskpage'>
       <div style={{display:'flex',alignItems:'center'}}>Task Filter:&nbsp;<FormControl sx={{paddingRight:'10px'}}>
        <InputLabel id="select filter"></InputLabel>
        <Select sx={{height:'40px'}}
          autoWidth
          labelId="select filter"
          id="demo-simple-select"
          value={filter}
          defaultValue='Active'
          label="Filter"
          onChange={handleFilterChange}
        >
          <MenuItem value={'Active'}>Active</MenuItem>
          <MenuItem value={'Inactive'}>Inactive</MenuItem>
          <MenuItem value={'All'}>All</MenuItem>
        </Select>
      </FormControl></div>
      
      {allMyTasks.length?
      allMyTasks.map(task=>(<MyTaskItem user={user} task={task}  key={task._id} setTaskUpdateWatch={setTaskUpdateWatch} taskUpdateWatch={taskUpdateWatch}/>)):<h4>You have not been Assigned any tasks yet</h4>
    }
    </div>
  )
}
