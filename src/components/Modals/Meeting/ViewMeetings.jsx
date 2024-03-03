import { useEffect, useState} from "react";

//import Material UI utils
import dayjs from 'dayjs';

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import './ViewMeetings.css'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Tooltip from '@mui/material/Tooltip';
//mui Icons
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import GroupsIcon from '@mui/icons-material/Groups';
import EditIcon from '@mui/icons-material/Edit';
import { EditorState,convertToRaw,ContentState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import CreateMeeting from '../CreateMeeting/CreateMeeting'
import DeleteMeeting from '../../Modals/DeleteMeeting/DeleteMeeting'
import EditMeeting from '../../Modals/EditMeeting/EditMeeting'
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';


export default function ViewMeetings({meetingOpen,setMeetingOpen,project}) {
  const[openCreate,setOpenCreate]=useState(false)
  const[meetingUpdated,setMeetingUpdated]=useState(false)
  const[allMeetings,setAllMeetings]= useState([])
  const[editorState,setEditorState] =useState(
    EditorState.createEmpty()
     )
  const[selectedMeeting, setSelectedMeeting] = useState({
    date:"",
    details: ""
  })
  
  const [deleteModal,setDeleteModal]=useState(false)
  const [openEdit,setOpenEdit]=useState(false)
  const [refreshEditModal,setRefreshEditModal]=useState(false)
  const [refreshMeetingView,setRefreshMeetingView]=useState(false)
 
  const OpeneditModal =()=>{
    setOpenEdit(true)
    setRefreshEditModal(!refreshEditModal)

  }
const conversion = ()=>{
    
    const contentBlock = htmlToDraft(selectedMeeting.details)
    if (contentBlock) 
        {const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      
       const editorContent = EditorState.createWithContent(contentState);
       
      setEditorState(editorContent)
      
    }
  }

const updateMeetingView =(theMeeting)=>{

    setRefreshMeetingView(!refreshMeetingView)
    setSelectedMeeting({...theMeeting})
    }
  //change meeting when date clicked
  
  useEffect(()=>{
   
    if (allMeetings.length)
    conversion()
    
  },[refreshMeetingView,selectedMeeting])


  useEffect(()=>{
    const fetchProjectMeetings=async() =>{
      try{
        let jwt = localStorage.getItem("token");
        const options = {
          method:"GET",
          headers:{
            "Content-Type": "application/json",
            Authorization: "Bearer " + jwt,
          }
        }
        const fetchResponse = await fetch(`/api/meetings/${
        project._id}`, options);
        if (!fetchResponse.ok) {
          throw new Error("Fetch failed - Bad Request");
        }
        let projectMeetings = await fetchResponse.json()
        
        setAllMeetings(projectMeetings)
        setSelectedMeeting(projectMeetings[0])
        
        
      }
      catch(err){
        console.log(err);
        console.log("Project Meetings Fetch Failed");
      }
    }
    fetchProjectMeetings()
    if(selectedMeeting)
    {conversion(selectedMeeting.details)}
  },[meetingUpdated])
  
  
  const handleClose = () => {
    setMeetingOpen(false);   
  };

  const handleAddMeeting = ()=>{
    setOpenCreate(true)
  }
  //delete meeting modals
  const deleteMeeting= async ()=>{
    setDeleteModal(true)
  }
  const onDeleteCancel = async ()=>{
    setDeleteModal(false)
  }
  const onDeleteClick= async ()=>{
    try{
      let jwt = localStorage.getItem("token");
    const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwt,
    },
  }
  const fetchResponse = await fetch(`api/meetings/delete/${project._id}/${selectedMeeting._id}`,options)
  if(!fetchResponse.ok)
  { throw new Error('Fetch failed - Bad Request')}
  setMeetingUpdated(!meetingUpdated)
  setDeleteModal(false)
  console.log('Meeting Succesfully deleted')

}
    catch(err){
      console.log(err)
      console.log('Failed to delete Meetin')
    }
  }
//edit modal and edit.

  return (
    <div>
        <Dialog open={meetingOpen} 
         onClose={handleClose}
         fullScreen
         >
             <DialogTitle style={{display:'flex',justifyContent:'space-between'}}>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'27px',width: '300px'}}>Meetings 
                    <Tooltip title="Add a Meeting">
                    <Button onClick={handleAddMeeting} sx={{ border:'1px solid #6b65ac',boxShadow: 4,borderRadius:'10px',  }} >
            
            <GroupsIcon sx={{paddingLeft:'15px',fontSize:'40px',transform:'translate(0,5px)',color:'#6b65ac'}}/>
         
            <AddRoundedIcon sx={{transform:'translate(-15px,-8px)',fontSize:'20px',color:'#6b65ac'}}/>            
         
            </Button>
            </Tooltip>
                </div>
                <IconButton size='large' onClick={handleClose}><CloseIcon/></IconButton>
            </DialogTitle>
            <Divider />
            <div className='viewMeetingsPage'>
                <div className='dateMenu'><DialogTitle> Date<Divider/></DialogTitle>
                <ToggleButtonGroup orientation='vertical'>
                <div >
                {allMeetings.length?allMeetings.map(meeting=><ToggleButton 
                onClick={()=>updateMeetingView(meeting)} > {dayjs(meeting.date).format('YYYY-MM-DD')
                } </ToggleButton>):"No meetings"}
                </div>
                </ToggleButtonGroup>
                </div>
                <Divider orientation='vertical'/>
                <div className='meetingContents'>
                   {selectedMeeting?
                  <DialogTitle style={{display:'flex',flexDirection:'horizontal',justifyContent:'space-between', width:'100%', backgroundColor:'#dedede',margin: '10px', borderRadius:'10px'}}><div>Meeting Minutes:&nbsp;  
                    {dayjs(selectedMeeting.date).format('LL')}
                    
                    </div> 
                    <div>

                      <Tooltip title="Edit Meeting">
                      <IconButton>
                      <EditIcon onClick={()=>OpeneditModal()
                      }/>
                      </IconButton>
                      </Tooltip>
                      
                      <Tooltip title="Delete Meeting">
                        <IconButton onClick={deleteMeeting}>
                        <DeleteIcon/>
                        </IconButton>
                        </Tooltip>
                        </div></DialogTitle>
                        :
                        <DialogTitle>No Meetings Created for this Project</DialogTitle>}

                  <Divider/>
        
                {selectedMeeting?
                
                <DialogContent>
                {/* <div dangerouslySetInnerHTML= {{__html:((selectedMeeting.details))}} 
                style={{backgroundColor:'#f5f5f5', margin: '10px',borderRadius:'10px',padding:'10px'}}/> */}
               <Editor 
        toolbarHidden
        readOnly
        editorState={editorState}
        // onEditorStateChange={setEditorState}
        wrapperClassName="contentsOfMeeting"
        // editorClassName="editor-class"
        
           
      />
                </DialogContent>
                :null}</div>
            </div>
        </Dialog>
        <CreateMeeting 
        openCreate={openCreate}
        setOpenCreate={setOpenCreate}
        project={project}
        setMeetingUpdated={setMeetingUpdated}
        meetingUpdated={meetingUpdated}
        />

        <DeleteMeeting
        deleteMeeting={deleteModal}
        setDeleteMeeting={setDeleteModal}
        onDeleteCancel={onDeleteCancel}
        onDeleteClick={onDeleteClick} />
       
        <EditMeeting
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        project={project}
        setMeetingUpdated={setMeetingUpdated}
        meetingUpdated={meetingUpdated}
        selectedMeeting={selectedMeeting}
        setSelectedMeeting={setSelectedMeeting}
        refreshEditModal={refreshEditModal}
        refreshMeetingView={refreshMeetingView}
        setRefreshMeetingView={setRefreshMeetingView}
        />
        
    </div>
  )
}
