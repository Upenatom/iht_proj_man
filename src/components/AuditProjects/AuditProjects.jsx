import { useState, useEffect} from "react";
import AuditSearchHeader from './AuditSearchHeader'
import ProjectList from'../ProjectList/ProjectList'
import './AuditProjects.css'
export default function AuditProjects({user,resource}) {
 const[allProjects,setAllProjects]=useState([])

   
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

    const fetchResponse = await fetch("/api/projects/index", options);
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
    },[])

  return (
    <div className='auditprojectspage'>
    <AuditSearchHeader/>
    <div calssName='projectList' >Search results</div>
    <ProjectList resource={resource} user={user} myProjects={allProjects}/>
    </div>
  )
}
