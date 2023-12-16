
import { useState, useEffect} from "react";
import { PieChart} from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider'

import Paper from '@mui/material/Paper';
import * as utils from '../../resources/utils/utils'
import Stack from '@mui/material/Stack';
import './UserDashboard.css'


export default function UserDashboard() {
const[myProjects,setMyProjects]=useState([])
const[allMyTasks,setAllMyTasks]=useState([])

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
  const fetchMyTasks = async()=>{
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
fetchMyProjects()
fetchMyTasks()

    },[])

 const getUpcomingProjects=()=>{
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

    let filterNotOverdue = sorted.filter(project=>(utils.calcDaysRemain(project.projTargetEndDate))>-1&&(project.projStatus==="In Progress"||project.projStatus==="Not Started"))

  if (sorted.length>3){
    return filterNotOverdue=filterNotOverdue.slice(0,3)
  }else return filterNotOverdue
}
  
 const getOverdueProjects=()=>{
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

    let filterOverdue = sorted.filter(project=>(utils.calcDaysRemain(project.projTargetEndDate))<0&&(project.projStatus==="In Progress"||project.projStatus==="Not Started"))

  
    return filterOverdue
  
}

const getProjectSummaryData =()=>{
  let inProgress=(myProjects.filter(project=> project.projStatus==="In Progress")).length
  const paused=(myProjects.filter(project=> project.projStatus==="Paused")).length
  let cancelled=(myProjects.filter(project=> project.projStatus==="Cancelled")).length
  let completed=(myProjects.filter(project=> project.projStatus==="Completed")).length
  let notStarted=(myProjects.filter(project=> project.projStatus==="Not Started")).length

  let data=[
    {id:0, value:inProgress,label:"In Progress",color:'#28f9f9'},
    {id:1, value:paused,label:"Paused", color:'#feb95b'},
    {id:2, value:cancelled,label:"Cancelled", color:'grey'},
    {id:3, value:completed,label:"Completed", color:'#28f928'},
    {id:4, value:notStarted,label:"Not Started", color:'#F92828'},
      ]
return data
}

//piechart center label

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}


  return (
    <div className='userdash'>
      <div style={{display:'flex', flexDirection:'column',width:'30%',height:'100%'}}>
      <div className='sectionvert' style={{paddingTop:'10vh'}} >
        Upcoming Tasks
      </div>

      <div 
      className='sectionvert'  style={{margin:'10px',padding:'10px', backgroundColor:''}}>
        <div style={{paddingTop:'10px',paddingBottom:'10px',
        marginBottom:'10px', fontSize:'20px',fontWeight:'bolder',backgroundColor:'#877364'}}>Top 3 Upcoming Projects</div>
        <Stack spacing={2}>
     {getUpcomingProjects().map((project)=>{
          return <div key={project._id} style ={{display:'flex', flexDirection:'column',}}>
            
          <Paper sx={{backgroundColor:'#b7ada7'}} elevation={6}>
            <div style={{fontSize:'20px',fontWeight:'bolder'}}>{project.projName}</div>
            <Divider/>
            <div style={{paddingTop:'10px'}}>Due Date:{utils.shortDate(project.projTargetEndDate)}</div>
         
                   {utils.calcDaysRemain(project.projTargetEndDate)===0?<div style={{paddingTop:'10px',paddingBottom:'10px'}}>Due Today!</div>:<div style={{paddingTop:'10px',paddingBottom:'10px'}}>
              Days Remaining: {utils.calcDaysRemain(project.projTargetEndDate)}</div>}
         
          </Paper>
          </div>

        }
        )}
        </Stack>
      </div> 
      </div>

<div style={{display:'flex', flexDirection:'column',height:'100vh',width:'30%'}}>
 <div className='sectionvert'style={{paddingTop:'10vh',backgroundColor:'#f1c5ca'}}>
               Overdue Tasks 
      </div>

<div className='sectionvert'  style={{margin:'10px',padding:'10px',backgroundColor:'#f1c5ca'}}>
  <div style={{paddingTop:'10px',paddingBottom:'10px',
        marginBottom:'10px', fontSize:'20px',fontWeight:'bolder',backgroundColor:'#877364'}}>
               Overdue Projects </div>
        <div style={{overflowY:'auto',height:'30vh' }}>
     {getOverdueProjects().length===0?<div>No Overdue Projects</div>: <><Stack spacing={2} >
     {getOverdueProjects().map((project)=>{
          return <div key={project._id} style ={{display:'flex', flexDirection:'column',}}>
            
          <Paper sx={{backgroundColor:'#b7ada7'}} elevation={6}>
            <div style={{fontSize:'20px',fontWeight:'bolder'}}>{project.projName}</div>
            <Divider/>
            <div style={{paddingTop:'10px'}}>Due Date:{utils.shortDate(project.projTargetEndDate)}</div>
         
                   {utils.calcDaysRemain(project.projTargetEndDate)===0?<div style={{paddingTop:'10px',paddingBottom:'10px'}}>Due Today!</div>:<div style={{paddingTop:'10px',paddingBottom:'10px'}}>
              Days Overdue: {-1*utils.calcDaysRemain(project.projTargetEndDate)}</div>}
         
          </Paper>
          </div>

        }
        )}
        </Stack></>}</div>
      </div>

      </div>


<div style={{display:'flex', flexDirection:'column',height:'100vh',width:'30%'}}>
      <div className='sectionvert'style={{paddingTop:'10vh'}}>
               Task Summary 
      </div>

      <div className='sectionvert' style={{display:'flex', alignItems:'center',justifyContent:'center'}}>
        <PieChart series={[
          {
            data:getProjectSummaryData(),
            innerRadius: 70,
            arcLabel:getProjectSummaryData().label
          }

        ]}
        width={500}
        height={300}
        slotProps={{
        // legend: { hidden: true },
      }}
  
     
      ><PieCenterLabel>Project Status</PieCenterLabel></PieChart>
      </div>
</div>
    </div>
  )
}
