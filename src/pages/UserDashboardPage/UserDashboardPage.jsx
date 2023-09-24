import React from 'react'
import { useState, useEffect } from "react";
import HeaderNav from'../../components/HeaderNav/HeaderNav'
import Projects from '../../components/Projects/Projects'
import Tasks from '../../components/Tasks/Tasks'
import UserDashboard from'../../components/Dashboard/UserDashboard'
import './UserDashboardPage.css'
export default function UserDashboardPage({setUser,user}) {
  const[resource,setResource]=useState('dashboard')
  return (
    <div className='userdashboard'>
      <HeaderNav setUser={setUser} user={user} setResource={setResource} className='headerNav'/>
     {resource==='dashboard'?<UserDashboard/>:null}
     {resource==='tasks'?<Tasks/>:null}
     {resource==='projects'?<Projects/>:null}
    </div>
  )
}
