import React from 'react'
// import './LogoutButton.css'
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
export default function LogoutButton({setUser}) {
  const handleClick= ()=>{
    localStorage.clear();
    setUser(null)
  }
  return (
    <div onClick={handleClick} className='button'>
      <IconButton><LogoutIcon/></IconButton>
      </div>
  )
}
