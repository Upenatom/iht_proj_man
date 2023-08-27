import "./AuthPage.css"
import React from 'react'
import LoginForm from "../../components/LoginForm/LoginForm"

export default function AuthPage() {
  return (
    <div className="main">
    <div className="logsign-main">
        <LoginForm/>
    </div>
    </div>
  ) 
}
