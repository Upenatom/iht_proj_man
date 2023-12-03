import { useState, useEffect} from "react";
import AuditSearchHeader from './AuditSearchHeader'
import ProjectList from'../ProjectList/ProjectList'
import './AuditProjects.css'
export default function AuditProjects({user,resource}) {
 const[allProjects,setAllProjects]=useState([])
  const[filter1,setFilter1]=useState(null)
  const[filter2,setFilter2]=useState(null)
  const[filterWatch,setfilterWatch]=useState(false)
  const [showInactive,setShowInactive] = useState(false)

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
    
    const fetchResponse = await fetch(`/api/projects/filteredProject/${filter1}/${filter2}/${showInactive}`, options)
    if (!fetchResponse.ok) {
      throw new Error("Fetch failed - Bad Request");
    }
    let allProjects = await fetchResponse.json();

    setAllProjects(allProjects)
  } catch (err) {
    console.log(err);
    console.log("My Project fetch failed");
  }
  }
fetchAllProjects()
    },[filterWatch])

  return (
    <div className='auditprojectspage'>
    <AuditSearchHeader
    filter1={filter1}
    setFilter1={setFilter1}
    filter2={filter2}
    setFilter2={setFilter2}
    getFilteredProjects={getFilteredProjects}
    showInactive={showInactive}
    setShowInactive={setShowInactive}
    />
    <ProjectList resource={resource} user={user} myProjects={allProjects}
    />
    </div>
  )
}
