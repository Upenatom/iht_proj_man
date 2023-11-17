import { useState, useEffect} from "react";
import MyTaskItem from '../Tasks/MyTaskItem'

export default function MyTasks(user) {
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
    setAllMyTasks(tasks)

    
  } catch (err) {
    console.log(err);
    console.log("Project Tasks fetch failed");
  }
  }
fetchMyTasks()

    },[taskUpdateWatch])
 
    return (
    <div>
      
      {allMyTasks.length?
      allMyTasks.map(task=>(<MyTaskItem user={user} task={task}   key={task._id} setTaskUpdateWatch={setTaskUpdateWatch} taskUpdateWatch={taskUpdateWatch}/>)):<h4>No Tasks for this project. To add a task click +</h4>
    }
    </div>
  )
}
