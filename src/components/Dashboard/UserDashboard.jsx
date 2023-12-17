
import { useState, useEffect} from "react";
import { PieChart} from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider'
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
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

const getProjectProgress=(x)=>{
   
      let percentCompleted
      if (x.projTasks.length>0){
      
     const totalTasks = x.projTasks.filter((item)=>
      {if(item.taskStatus==="In Progress" ||
    item.taskStatus==="Not Started" || item.taskStatus==="Completed"){
      return true
    }
    }).length
    
     const completedTasks=x.projTasks.filter((item)=>{if(item.taskStatus==='Completed'){
      return true
     }
    }).length
     percentCompleted = Math.round(completedTasks/totalTasks*100)
    
    }else{
      percentCompleted=0
    }

    return (percentCompleted)
  }
 const getUpcomingTasks=()=>{
    
     let sorted= allMyTasks.sort((a,b)=>{
      let nameA=a.taskTargetEndDate.toUpperCase()
      let nameB= b.taskTargetEndDate.toUpperCase()
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    })

    let filterNotOverdue = sorted.filter(task=>(utils.calcDaysRemain(task.taskTargetEndDate))>-1&&(task.taskStatus==="In Progress"||task.taskStatus==="Not Started"))

  if (sorted.length>3){
    return filterNotOverdue=filterNotOverdue.slice(0,3)
  }else return filterNotOverdue
}

const getUpcomingProjects=()=>{
  
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
const getOverdueTasks=()=>{

  let sorted= allMyTasks.sort((a,b)=>{
      let nameA=a.taskTargetEndDate.toUpperCase()
      let nameB= b.taskTargetEndDate.toUpperCase()
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    })

    let filterOverdue = sorted.filter(task=>(utils.calcDaysRemain(task.taskTargetEndDate))<0&&(task.taskStatus==="In Progress"||task.taskStatus==="Not Started"))

  
    return filterOverdue
  

}
const getProjectSummaryData =()=>{
  const inProgress=(myProjects.filter(project=> project.projStatus==="In Progress")).length
  const paused=(myProjects.filter(project=> project.projStatus==="Paused")).length
  const cancelled=(myProjects.filter(project=> project.projStatus==="Cancelled")).length
  const completed=(myProjects.filter(project=> project.projStatus==="Completed")).length
  const notStarted=(myProjects.filter(project=> project.projStatus==="Not Started")).length

  let data=[
    {id:0, value:inProgress,label:"In Progress",color:'#28f9f9'},
    {id:1, value:paused,label:"Paused", color:'#feb95b'},
    {id:2, value:cancelled,label:"Cancelled", color:'grey'},
    {id:3, value:completed,label:"Completed", color:'#28f928'},
    {id:4, value:notStarted,label:"Not Started", color:'#F92828'},
      ]
return data
}
const getTaskSummaryData =()=>{
  let projFilter = myProjects.filter(project=>(project.projStatus==="In Progress"||project.projStatus==="Not Started"||project.projStatus==="Completed"))

  let inProgress= projFilter.filter(project=>project.projTasks.some(task=>task.taskStatus==="In Progress")).length
  let paused= projFilter.filter(project=>project.projTasks.some(task=>task.taskStatus==="Paused")).length
  let cancelled= projFilter.filter(project=>project.projTasks.some(task=>task.taskStatus==="Cancelled")).length
  let completed=projFilter.filter(project=>project.projTasks.some(task=>task.taskStatus==="Completed")).length
  let notStarted=projFilter.filter(project=>project.projTasks.some(task=>task.taskStatus==="Not Started")).length

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
       <div style={{paddingTop:'10px',paddingBottom:'10px',
        marginBottom:'10px', fontSize:'20px',fontWeight:'bolder',backgroundColor:'#173A5E',color:'#b3c4c2'}}> Upcoming Tasks
        </div>
        <Stack spacing={2}>
     {getUpcomingTasks().map((task)=>{
          return <div key={task._id} style ={{display:'flex', flexDirection:'column',}}>
            
          <Paper sx={{backgroundColor:'#b3c4c2'}} elevation={6}>
            <div style={{fontSize:'20px',fontWeight:'bolder'}}>{task.taskDescription}</div>
            <Divider/>

            


            <div style={{paddingTop:'10px'}}>Due Date:&nbsp;{utils.shortDate(task.taskTargetEndDate)}</div>
         
                   {utils.calcDaysRemain(task.taskTargetEndDate)===0?<div style={{paddingTop:'10px',paddingBottom:'10px'}}>Due Today!</div>:<div style={{paddingTop:'10px',paddingBottom:'10px'}}>
              Days Remaining: {utils.calcDaysRemain(task.taskTargetEndDate)}</div>}
              
         
          </Paper>
          </div>

        }
        )}
        </Stack>
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
             <div style={{display:'flex', alignItems:'center', justifyContent:'center', paddingTop:'5px',width:'100%'}}>
            <LinearProgress className="progress-bar"
            sx={{width:'100px',height:'20px',backgroundColor:'inherit',
            border:'2px solid #6a7d88',
            borderRadius:'7px',
            "& .MuiLinearProgress-bar":
            {background: 'linear-gradient(#3ca636,#7fcc7b,#3ca636)',
            borderRadius:'4px'}
            }}
            variant='determinate' value={getProjectProgress(project)}  />
            <Typography
          style={{
               
            color: "black",
            transform: "translateX(-66px)",
          }}
        >
  {getProjectProgress(project)}%
  </Typography></div>

            <div style={{paddingTop:'10px'}}>Due Date:&nbsp;{utils.shortDate(project.projTargetEndDate)}</div>
         
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
  <div className='sectionvert'style={{paddingTop:'10vh',backgroundColor:''}}>
    <div style={{paddingTop:'10px',paddingBottom:'10px',
        marginBottom:'10px', fontSize:'20px',fontWeight:'bolder',backgroundColor:'#173A5E',color:'#b3c4c2'}}>Overdue Tasks</div>
    <div style={{overflowY:'auto',height:'32vh' }}>
     {getOverdueTasks().length===0?<div>No Overdue Projects</div>: 
     <><Stack spacing={2} >
     {getOverdueTasks().map((task)=>{
          return <div key={task._id} style ={{display:'flex', flexDirection:'column',}}>
            
          <Paper sx={{backgroundColor:'#b3c4c2'}} elevation={6}>
            <div style={{fontSize:'20px',fontWeight:'bolder'}}>{task.taskDescription}</div>
            <Divider/>
            
            <div style={{paddingTop:'10px'}}>Due Date:{utils.shortDate(task.taskTargetEndDate)}</div>
         
                   {utils.calcDaysRemain(task.taskTargetEndDate)===0?<div style={{paddingTop:'10px',paddingBottom:'10px'}}>Due Today!</div>:<div style={{paddingTop:'10px',paddingBottom:'10px'}}>
              Days Overdue: {-1*utils.calcDaysRemain(task.taskTargetEndDate)}</div>}
         
          </Paper>
          </div>

        }
        )}
        </Stack></>}</div>

      </div>

<div className='sectionvert'  style={{margin:'',padding:'',backgroundColor:''}}>
  <div style={{paddingTop:'10px',paddingBottom:'10px',
        marginBottom:'', fontSize:'20px',fontWeight:'bolder',backgroundColor:'#877364'}}>
               Overdue Projects </div>
        <div style={{overflowY:'auto',height:'40vh' }}>
     {getOverdueProjects().length===0?<div>No Overdue Projects</div>: <><Stack spacing={2} >
     {getOverdueProjects().map((project)=>{
          return <div key={project._id} style ={{display:'flex', flexDirection:'column',}}>
            
          <Paper sx={{backgroundColor:'#b7ada7'}} elevation={6}>
            <div style={{fontSize:'20px',fontWeight:'bolder'}}>{project.projName}</div>
            <Divider/>
             <div style={{display:'flex', alignItems:'center', justifyContent:'center', paddingTop:'5px',width:'100%'}}>
            <LinearProgress className="progress-bar"
            sx={{width:'100px',height:'20px',backgroundColor:'inherit',
            border:'2px solid #6a7d88',
            borderRadius:'7px',
            "& .MuiLinearProgress-bar":
            {background: 'linear-gradient(#3ca636,#7fcc7b,#3ca636)',
            borderRadius:'4px'}
            }}
            variant='determinate' value={getProjectProgress(project)}  />
            <Typography
          style={{
               
            color: "black",
            transform: "translateX(-66px)",
          }}
        >
  {getProjectProgress(project)}%
  </Typography></div>
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
     <div className='sectionvert' style={{display:'flex', alignItems:'center',justifyContent:'center'}}>
                
               <PieChart series={[
          {
            data:getTaskSummaryData(),
            innerRadius: 70,
                      }

        ]}
        width={500}
        height={300}
        slotProps={{
        // legend: { hidden: true },
      }}
  
     
      ><PieCenterLabel>Task Status</PieCenterLabel></PieChart>
              
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
