import React from 'react'
import { useState, useEffect } from "react";
import HeaderNav from'../../components/HeaderNav/HeaderNav'
import Projects from '../../components/Projects/Projects'
import MyTasks from '../../components/Tasks/MyTasks'
import UserDashboard from'../../components/Dashboard/UserDashboard'
import CreateUserForm from '../../components/CreateUserForm/CreateUserForm'
import EditUserForm from '../../components/EditUserForm/EditUserForm'
import ChangePass from '../../components/ChangePass/ChangePass'
import AuditProjects from '../../components/AuditProjects/AuditProjects';
import './UserDashboardPage.css'
export default function UserDashboardPage({setUser,user,theme}) {
  const[resource,setResource]=useState('dashboard')
  useEffect(()=>{},[resource])
  return (
    <div className='userdashboard'>
      <HeaderNav setUser={setUser} user={user} setResource={setResource} className='headerNav'/>
     {resource==='dashboard'?<UserDashboard />:null}
     {resource==='tasks'?<MyTasks user={user} />:null}
     {resource==='projects'?<Projects resource={resource} user={user} />:null}
     {resource==='editUser'?<EditUserForm user={user}/>:null}
     {resource==='addUser'?<CreateUserForm user={user}/>:null}
     {resource==='changePass'?<ChangePass user={user}/>:null}
     {resource==='auditProj'?<AuditProjects resource={resource} user={user} />:null}
    </div>
  )
}
