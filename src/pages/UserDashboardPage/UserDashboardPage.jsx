import React from 'react'
import { useState, useEffect } from "react";
import HeaderNav from'../../components/HeaderNav/HeaderNav'
import Projects from '../../components/Projects/Projects'
import MyTasks from '../../components/Tasks/MyTasks'
import UserDashboard from'../../components/Dashboard/UserDashboard'
import CreateUserForm from '../../components/CreateUserForm/CreateUserForm'
import EditUserForm from '../../components/EditUserForm/EditUserForm'
import './UserDashboardPage.css'
export default function UserDashboardPage({setUser,user,theme}) {
  const[resource,setResource]=useState('dashboard')
  useEffect(()=>{},[resource])
  return (
    <div className='userdashboard'>
      <HeaderNav setUser={setUser} user={user} setResource={setResource} className='headerNav'/>
     {resource==='dashboard'?<UserDashboard />:null}
     {resource==='tasks'?<MyTasks />:null}
     {resource==='projects'?<Projects  user={user} />:null}
     {resource==='editUser'?<EditUserForm user={user}/>:null}
     {resource==='addUser'?<CreateUserForm user={user}/>:null}
    </div>
  )
}
