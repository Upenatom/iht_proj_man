import { useState, useEffect} from "react";
import ProjectList from '../ProjectList/ProjectList'
import ProjectHeader from '../../components/ProjectHeader/ProjectHeader'
import CreateProject from'../Modals/CreateProject/CreateProject'
import './Projects.css'

   
export default function Projects({user,resource}) {
  const[myProjects,setMyProjects]=useState([])
  const[projectAdded,setProjectAdded]=useState(false)
  const [sortName, setSortName]=useState(false)
  const[order,setOrder]=useState(false)
   
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

useEffect(()=>{console.log(myProjects)},[sortName])

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

  //sorting stuff
  
  const sortAsc=(header)=>{
   
 setMyProjects(myProjects.sort((a,b)=>{
  let nameA
  let nameB
    if (header==='name'){
      nameA =a.projName.toUpperCase();
      nameB = b.projName.toUpperCase();}
    if (header==='status'){
      nameA =a.projStatus.toUpperCase();
      nameB = b.projStatus.toUpperCase();  
    }
    if (header==='date'){
      nameA =a.projTargetEndDate.toUpperCase();
      nameB = b.projTargetEndDate.toUpperCase();  }

     if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  // names must be equal
  return 0;
  }))
  setSortName(!sortName)
}
  

  const onClickName=(e)=>{
    setOrder(!order)
    // console.log('name!')
    sortAsc(e.currentTarget.name)
  }

  const [sortStatus, setSortStatus]=useState(false)
  
  const onClickStatus=()=>{
    setSortStatus(!sortStatus)
    console.log('Status!')
  }

  const [sortDate, setSortDate]=useState(false)
  const onClickDate=()=>{
    setSortDate(!sortDate)
    console.log('Date!')
  }

  return (
    <div className="projectspage">
      <ProjectHeader handleClickOpen={handleClickOpen}
       onClickName={onClickName}
       onClickStatus={onClickStatus}
       onClickDate={onClickDate}/>
      <ProjectList 
      user={user}
      myProjects={myProjects}
      resource={resource}
      setProjectAdded={setProjectAdded}
      projectAdded={projectAdded}
      sortName={sortName}
      sortStatus={sortStatus}
      sortDate={sortDate}
      
      
      />

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
