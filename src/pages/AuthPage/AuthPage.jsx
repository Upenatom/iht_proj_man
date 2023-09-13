import "./AuthPage.css"
import React from 'react'
import LoginForm from "../../components/LoginForm/LoginForm"

export default function AuthPage({setUserInState}) {
  return (
    <div className="main">
    <div className="logsign-main">
        <LoginForm setUserInState={setUserInState}/>
    </div>
    </div>
  ) 
}
