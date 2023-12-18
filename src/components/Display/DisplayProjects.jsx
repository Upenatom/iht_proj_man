import { useState, useEffect} from "react";
import DisplaySearchHeader from './DisplaySearchHeader'
import DisplayProjectList from'./DisplayProjectList'
import DisplayProjectHeader from './DisplayProjectHeader'
import * as utils from '../../resources/utils/utils'
import './DisplayProjects.css'


export default function AuditProjects({user,resource}) {

 const[allProjects,setAllProjects]=useState([])
  const[filter1,setFilter1]=useState(null)
  const[filter2,setFilter2]=useState(null)
  const[filterWatch,setfilterWatch]=useState(false)
  const [showInactive,setShowInactive] = useState(false)
  const[order,setOrder]=useState(false)
  const [filter,setFilter]=useState('Active')


  const sortAsc=(header)=>{
   
 setAllProjects(allProjects.sort((a,b)=>{
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
    
    if(order===false){

     if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  // names must be equal
  return 0;}else{
    if (nameA > nameB) {
    return -1;
  }
  if (nameA < nameB) {
    return 1;
  }
  // names must be equal
  return 0;

  }
  }))
  
}

  

  const getFilteredProjects = ()=>{
    setfilterWatch(!filterWatch)
  } 
  //fetch projects on mount
  useEffect(()=>{
    const fetchAllProjects = async () =>{
      
      try {
    
    let jwt = localStorage.getItem("token");
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    };
    
    const fetchResponse = await fetch(`/api/projects/filteredProject/${filter1}/${filter2}/All`, options)
    if (!fetchResponse.ok) {
      throw new Error("Fetch failed - Bad Request");
    }
    let allProjects = await fetchResponse.json();
    let activeProjects=allProjects.filter((project)=>{return(project.projStatus==='In Progress'||project.projStatus==='Not Started')})

    setAllProjects(activeProjects)
  } catch (err) {
    console.log(err);
    console.log("My Project fetch failed");
  }
  }
fetchAllProjects()

 const intervalId = setInterval(() => {
      fetchAllProjects(); // Fetch data every 60 minutes
    }, 3600000);

    return () => clearInterval(intervalId);
    },[filterWatch])

let filterNotOverdue = allProjects.filter(project=>(utils.calcDaysRemain(project.projTargetEndDate))>-1)

let filterOverdue = allProjects.filter(project=>(utils.calcDaysRemain(project.projTargetEndDate))<0)

  return (
    <div className='displayprojectspage'>
       <DisplayProjectHeader 
          
       />
    <DisplaySearchHeader
   
    filter1={filter1}
    setFilter1={setFilter1}
    filter2={filter2}
    setFilter2={setFilter2}
    getFilteredProjects={getFilteredProjects}
    showInactive={showInactive}
    setShowInactive={setShowInactive}
    />
   <div className="displaysplit">
    
    <DisplayProjectList 
    resource={resource}
     user={user} 
     myProjects={filterNotOverdue}
     setProjectAdded={getFilteredProjects}
    />
    <DisplayProjectList 
    resource={resource}
     user={user} 
     myProjects={filterOverdue}
     setProjectAdded={getFilteredProjects}
    />

  </div>
    </div>
  )
}
