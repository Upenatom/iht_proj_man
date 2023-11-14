import React from 'react'
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './ProjectHeader.css'
export default function ProjectHeader({handleClickOpen}) {
  return (
    <div className='projectsdiv'>
    <div className='projaddandtitle' >PROJECTS<IconButton onClick={handleClickOpen} color= 'success'><AddCircleIcon /></IconButton></div>
    <div className ='projecttableheaders'>
      <div className='columntitle' style={{width:'300px',}}>Name</div>
      <div className='columntitle' style={{width:'105px'}}>Status</div>
      <div className='columntitle' style={{width:'200px'}}>Due Date</div>
      <div className='columntitle' style={{width:'200px'}}>Days Remaining</div>
    </div>
      
      </div>
  )
}
