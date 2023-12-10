
import { useState, useEffect} from "react";
import { PieChart } from '@mui/x-charts/PieChart';
import './UserDashboard.css'


export default function UserDashboard() {
const[myProjects,setMyProjects]=useState([])
  let filters='All'
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

    const fetchResponse = await fetch(`/api/projects/myProjects/null/null/${filters}`, options);
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

    },[])

    const getUpcomingProject=()=>{
      let topThreeProjects
     let sorted= myProjects.sort((a,b)=>{
      let nameA=a.projTargetEndDate.toUpperCase()
      let nameB= b.projTargetEndDate.toUpperCase()
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    })
  if (sorted.length>2){
    topThreeProjects=sorted.slice(3)
  }
  console.log('topThreeprojects===>',topThreeProjects)
  }

  return (
    <div className='userdash'>
      <div style={{display:'flex', flexDirection:'column',width:'30%',height:'100vh'}}>
      <div className='sectionvert' >
        Upcoming Tasks
      </div>

      <div onClick={()=>getUpcomingProject()}className='sectionvert'>
        Upcoming Projects
      </div>
      </div>
<div style={{display:'flex', flexDirection:'column',width:'70%',height:'100vh'}}>
      <div className='sectionvert'>
        Project Summary
      </div>

      <div className='sectionvert'>
        Task Summary
      </div>
</div>
    </div>
  )
}
