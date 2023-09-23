import React from 'react'
import './LogoutButton.css'
export default function LogoutButton({setUser}) {
  const handleClick= ()=>{
    localStorage.clear();
    setUser(null)
  }
  return (
    <div onClick={handleClick} className='button'>
      Logout
      </div>
  )
}
