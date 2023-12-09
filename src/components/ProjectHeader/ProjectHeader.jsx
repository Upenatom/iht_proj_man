import React from 'react'
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SortIcon from '@mui/icons-material/Sort';
import './ProjectHeader.css'
export default function ProjectHeader({handleClickOpen,onClickName,onClickStatus,onClickDate}) {

  return (
    <div className='projectsdiv'>
    <div className='projaddandtitle' >PROJECTS<IconButton onClick={handleClickOpen} color= 'success'><AddCircleIcon /></IconButton></div>
    <div className ='projecttableheaders'>

      <div className='columntitle' style={{width:'350px',display:'flex',flexDirection:'row',alignItems:'center'}}
      ><IconButton name='name' size='small' 
      onClick={onClickName}
      ><SortIcon/></IconButton>Name</div>

      <div className='columntitle' style={{width:'80px',display:'flex',flexDirection:'row',alignItems:'center'}}
      ><IconButton name='status'size='small'
       onClick={onClickName}
       >
        <SortIcon/></IconButton>Status</div>

      <div className='columntitle' style={{width:'270px',display:'flex',flexDirection:'row',alignItems:'center'}}       
      ><IconButton size='small' 
      name='date'
      onClick={onClickName}
      ><SortIcon/></IconButton>Due Date</div>
      
    </div>
      
      </div>
  )
}
