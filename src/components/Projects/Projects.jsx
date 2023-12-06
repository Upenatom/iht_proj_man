import { useState, useEffect} from "react";
import ProjectList from '../ProjectList/ProjectList'
import ProjectHeader from '../../components/ProjectHeader/ProjectHeader'
import CreateProject from'../Modals/CreateProject/CreateProject'
import './Projects.css'

   
export default function Projects({user,resource}) {
  const[myProjects,setMyProjects]=useState([])
  const[projectAdded,setProjectAdded]=useState(false)
   
  //fetch projects on mount
  useEffect(()=>{
    const fetchMyProjects = async () =>{
      try {
    let jwt = localStorage.getItem("token");
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    };

    const fetchResponse = await fetch("/api/projects/myProjects", options);
    if (!fetchResponse.ok) {
      throw new Error("Fetch failed - Bad Request");
    }
    let myprojects = await fetchResponse.json();

    setMyProjects(myprojects)
  } catch (err) {
    console.log(err);
    console.log("My Project fetch failed");
  }
  }
fetchMyProjects()
    },[projectAdded])

  const [startDate, setStartDate] = useState(null)
  const [endDate,setEndDate] = useState(null)
  

  
  const[projInfo,setprojInfo]=useState({
    projName:"",
    projDivision:"",
    projStartDate:startDate,
    projTargetEndDate:endDate,
    projDescription:"",
    
  })
  
  
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  

  return (
    <div className="projectspage">
      <ProjectHeader handleClickOpen={handleClickOpen} />
      <ProjectList user={user} myProjects={myProjects} resource={resource}
      setProjectAdded={setProjectAdded}
      projectAdded={projectAdded}/>

      <div className='.modal'>

        <CreateProject
        open={open}
        projectAdded={projectAdded}
        setProjectAdded={setProjectAdded}
        setOpen={setOpen}
        projInfo={projInfo}
        setprojInfo={setprojInfo}
        user={user}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}/>

       
       </div>
          
      </div>
  )
}
