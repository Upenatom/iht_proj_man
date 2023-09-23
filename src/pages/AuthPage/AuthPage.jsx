import "./AuthPage.css"
import React from 'react'
import LoginForm from "../../components/LoginForm/LoginForm"
import {ReactComponent as IhtLogo} from '../../resources/logo/iht-group-logo-colour.svg'

export default function AuthPage({setUser}) {
  return (
    
    <div className="main">
        <IhtLogo className='logo'/>
        <div className='text' >Projects</div>
        <LoginForm setUser={setUser} />
    </div>
    
  ) 
}
