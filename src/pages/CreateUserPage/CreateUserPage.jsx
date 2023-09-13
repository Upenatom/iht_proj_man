import React from 'react'
import "./CreateUserPage.css"
import CreateUserForm from "../../components/CreateUserForm/CreateUserForm"
export default function CreateUserPage({setUserInState}) {
  return (
    
   <div className="main">
    <div className="createuser-main">
        <CreateUserForm setUserInState={setUserInState}/>
    </div>
    </div>
  )
}
