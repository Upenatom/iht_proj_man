import { useState, useEffect} from "react";
import MyTaskItem from '../Tasks/MyTaskItem'
import './MyTasks.css'

export default function MyTasks({user}) {
  const[allMyTasks,setAllMyTasks]=useState([])
  const[taskUpdateWatch,setTaskUpdateWatch] = useState(false)
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
    const fetchResponse = await fetch(`/api/tasks/myTasks`, options);
    if (!fetchResponse.ok) {
      throw new Error("Fetch failed - Bad Request");
    }
    let tasks = await fetchResponse.json();
    // console.log (tasks)
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

    },[taskUpdateWatch])
 
    return (
    <div className='mytaskpage'>
      
      {allMyTasks.length?
      allMyTasks.map(task=>(<MyTaskItem user={user} task={task}  key={task._id} setTaskUpdateWatch={setTaskUpdateWatch} taskUpdateWatch={taskUpdateWatch}/>)):<h4>You have not been Assigned any tasks yet</h4>
    }
    </div>
  )
}
