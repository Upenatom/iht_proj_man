import { useState, useEffect} from "react";
import Comments from '../Comments/Comments'
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Menu from '@mui/material/Menu';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import AssignTask from '../Modals/AssignTask/AssignTask'
import DeleteTask from '../Modals/DeleteTask/DeleteTask'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import TodoModal from '../Modals/Todo/Todo'
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import * as utils from '../../resources/utils/utils'
import * as utilfetch from '../../resources/utils/fetches'
import './TaskItem.css'

export default function TaskItem({task,setTaskUpdateWatch,taskUpdateWatch}) {
  
  const[commentAdded,setCommentAdded]=useState(false)
  const[recentComment,setRecentComment]=useState([])
  const[reassignModal,setReassignModal]=useState(false)
  let recentCommentUser = recentComment.taskCommentOwner
  const[department,setDepartment] = useState("")
  const[usersByDept,setUsersByDept]=useState([])
  const[todoNum, setTodoNum]=useState(0)

  //status menu stuff
  const [anchorEl, setAnchorEl] = useState(null);
  const openEditStatus = Boolean(anchorEl);
  const handleStatusMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleStatusEditClose = () => {
    setAnchorEl(null);
  };
  const handleStatusClick =async (e)=>{
    e.preventDefault();
        let body = {
        taskStatus:e.currentTarget.value,
        }
       let options=utils.putBuilder(body)
       try{
        
        const fetchResponse = await fetch(`/api/tasks/update/${task._id}`, options)
        if(!fetchResponse.ok)
        { throw new Error('Fetch failed - Bad Request')}
        setTaskUpdateWatch(!taskUpdateWatch)
        handlePriorityEditClose()}
        catch(err){
          console.log(err)
        }
    handleStatusEditClose()
  }
//priority menu stuff
const [priorityAnchorEl, setPriorityAnchorEl] = useState(null)
 const openEditPriority = Boolean(priorityAnchorEl);
 const handlePriorityMenuClick = (event) => {
    setPriorityAnchorEl(event.currentTarget);
  };
  const handlePriorityEditClose = () => {
    setPriorityAnchorEl(null);
  };
  const handlePriorityClick =async(e)=>{
    e.preventDefault();
        let body = {
        taskPriority:e.currentTarget.value,
        }
       let options=utils.putBuilder(body)
       try{
        
        const fetchResponse = await fetch(`/api/tasks/update/${task._id}`, options)
        if(!fetchResponse.ok)
        { throw new Error('Fetch failed - Bad Request')}
        setTaskUpdateWatch(!taskUpdateWatch)
        handlePriorityEditClose()}
        catch(err){
          console.log(err)
        }
  }
  
//delete task
const [deleteConfirmation,setDeleteConfirmation]=useState(false)
const onDeleteClick = async ()=>{
  try{
    let jwt = localStorage.getItem("token");
    const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwt,
    },
  }
  const fetchResponse= await fetch(`api/tasks/delete/${task._id}`,options)
  if(!fetchResponse.ok)
    { throw new Error('Fetch failed - Bad Request')}
    setTaskUpdateWatch(!taskUpdateWatch)
    setDeleteConfirmation(false)
}
  catch(err){

  }
  setDeleteConfirmation(false)
}
const onDeleteCancel =()=>{
  setDeleteConfirmation(false)
}

const[todoWatch,setTodoWatch]=useState(true)
const[taskTodos,setTaskTodos]=useState([])
//fetch all todos on modal load
useEffect (()=>{
  const fetchTodos = async ()=>{
    try{const fetchResponse = await fetch(`/api/todos/index/${task._id}`,utilfetch.getFetchOptions())
     if (!fetchResponse.ok) {
      throw new Error("Fetch failed - Bad Request");
    }
    let allTodos = await fetchResponse.json()
   //frontend Sort to show incomplete first
   allTodos.sort((a, b) => a.todoStatus - b.todoStatus);
      //get number of active todos
  const results=allTodos.filter((todo)=>todo.todoStatus<1)
   
  setTodoNum(results.length)
    setTaskTodos(allTodos)   
    }catch(err){
      console.log(err);
      console.log("Todos fetch failed");
    }
  }
  fetchTodos()

},[todoWatch])

//fetch comments onload
  useEffect(()=>{
    
    const fetchSingleComment = async ()=>{
      try{
        let jwt = localStorage.getItem("token");
        const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
           Authorization: "Bearer " + jwt,
      },
    };
    const fetchResponse = await fetch(`/api/comments/projectComments/${task._id}/getfirst`, options);
    if (!fetchResponse.ok) {
      throw new Error("Fetch failed - Bad Request");
    }
    let comment = await fetchResponse.json();
    let comment0= comment[0]
    
    

    if(comment0!==null){
      let commentAuthorFirst= comment0['taskCommentOwner']['firstName']
      let commentAuthorLast = comment0['taskCommentOwner']['lastName']
      let fullName = commentAuthorFirst.concat(" ")
      fullName = fullName.concat(commentAuthorLast)
      
      setRecentComment({...comment0,author:fullName})

    }else return
      }
      catch(err){
        console.log(err);
        console.log("Latest comment Fetch failed");}
    }
    fetchSingleComment()
  },[commentAdded])
  
const openReassign =()=>{setReassignModal(true)}
const closeReassign =()=>{
  setReassignModal(false)
  setDepartment("")
  setUsersByDept(null)
}
let fullName=task.taskOwner.fullName

//Todo Modal
const[todoOpen,setTodoOpen]=useState(false)
const handleOpenModal=()=>{
  setTodoOpen(true)
}
const handleCloseModal=()=>{
  setTodoOpen(false)
}

//piechart Data
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
    <div className='taskitem' >
     
    <div className='taskDetails'>
       
        <div className='leftpanel'><span style={{fontWeight:'bold',fontSize:'15px'}}>Due date:</span>
        {utils.shortDate(task.taskTargetEndDate)}</div>
        <Divider/>
        
        
        <div>          
          <IconButton onClick={openReassign} ><ChangeCircleIcon sx={{
          fontSize:'15px' 
        }}/></IconButton>
        {fullName}      
        </div>
        
        
          <div>
            <IconButton
        id="status-button"
        onClick={handleStatusMenuClick}
          ><EditIcon sx={{
          fontSize:'15px'
        }}/></IconButton>
           {task.taskStatus}
          
        
          </div>
      
        <div>
          <IconButton
        id="priority-button"
        onClick={handlePriorityMenuClick}>
          <EditIcon sx={{
          fontSize:'15px'
        }}/></IconButton>
          {task.taskPriority}  
        </div>
        
        <div><IconButton onClick={()=>{setDeleteConfirmation(true)}}><DeleteForeverIcon sx={{
          fontSize:'20px'
        }}/></IconButton></div>
         
      </div>
      <Divider orientation="vertical" flexItem/>
     
      <div className='taskDesc'>
        <div style={{fontWeight:'bold',display:'flex',alignItems:'center'}}>
        <IconButton onClick={handleOpenModal}>
          <Badge badgeContent={todoNum} color="info" 
          >
            {taskTodos.length>0?
            <Tooltip title="Add and Edit Todos"><PlaylistAddCheckIcon  color={'info'} /></Tooltip>:
            <Tooltip title="No Todos Added, Click to Add"><PlaylistRemoveIcon color={'info'}/></Tooltip>}
            </Badge>
            </IconButton>{task.taskDescription}
        </div>
        <Divider/>
      {recentComment?<Comments
      task={task} 
      recentComment={recentComment} 
      recentCommentUser={recentCommentUser}
      commentAdded={commentAdded}
      setCommentAdded={setCommentAdded}/>
        :null}
      </div>
       <Divider orientation="vertical" flexItem/>
      <div style = {{width:'150px',display:'flex',flexDirection:'row',justifyContent:'center',alignContent:'center'}}>
       {taskTodos.length?<PieChart
        series={[{ 
         
          innerRadius:60,
          outerRadius:75,
          
          data:
           [
            {label:'Pending Todo', value: Number(todoNum),color:'#b3c4c2' }, 
            { label:'Completed Todos',value: taskTodos.length-Number(todoNum),color: '#15cb2b' },
          ] 
        }]}
        margin={{ right: 5 }}
        width={200}
        height={200}
        slotProps={{
        legend: { hidden: true },
      }}
      
        ><PieCenterLabel>{Math.round((taskTodos.length-Number(todoNum))/taskTodos.length*100)}%</PieCenterLabel></PieChart>:<span>No Todos</span>}
       
      </div>


      {/* Edit menu items */}
      <AssignTask reassignModal={reassignModal} closeReassign={closeReassign} 
      department={department}
      setDepartment={setDepartment}
      usersByDept={usersByDept}
      setUsersByDept={setUsersByDept}
      task={task}
      setTaskUpdateWatch={setTaskUpdateWatch}
      taskUpdateWatch={taskUpdateWatch}/>
      <DeleteTask
      deleteConfirmation={deleteConfirmation}
      onDeleteClick={onDeleteClick}
      onDeleteCancel={onDeleteCancel}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openEditStatus}
        onClose={handleStatusEditClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      ><Stack spacing ={1}>
        {utils.taskStatusEnums().map(status=><Button onClick={handleStatusClick} value= {status}>{status}</Button>)}
      
        </Stack>
      </Menu>
      <Menu
        id="basic-menu"
        anchorEl={priorityAnchorEl}
        open={openEditPriority}
        onClose={handlePriorityEditClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      ><Stack spacing ={1}>
        {utils.priorityEnums().map(priority=><Button onClick={handlePriorityClick} value= {priority}>{priority}</Button>)}
      
        </Stack>
      </Menu>
      <TodoModal 
      todoWatch={todoWatch}
      setTodoWatch={setTodoWatch}
      taskTodos={taskTodos}
      setTaskTodos={setTaskTodos}
      todoOpen={todoOpen} 
      handleCloseModal={handleCloseModal}
      task={task}
      />
      
      </div>
  )
}
