import React from 'react'
import "./UserAdminPage.css"
import CreateUserForm from "../../components/CreateUserForm/CreateUserForm"
export default function UserAdminPage() {
  return (
    
   <div className="main">
    <div className="createuser-main">
        <CreateUserForm/>
    </div>
    </div>
  )
}
