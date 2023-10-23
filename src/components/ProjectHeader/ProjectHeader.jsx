import React from 'react'
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './ProjectHeader.css'
export default function ProjectHeader({handleClickOpen}) {
  return (
    <div className='projectsheader'>PROJECTS<IconButton onClick={handleClickOpen} color= 'success'><AddCircleIcon /></IconButton>
      </div>
  )
}
