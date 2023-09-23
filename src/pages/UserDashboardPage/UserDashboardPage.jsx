import React from 'react'
import LogoutButton from '../../components/LogoutButton/LogoutButton'

export default function UserDashboardPage({setUser}) {
  return (
    <div>UserDashboardPage
      <LogoutButton setUser={setUser}/>
    </div>
  )
}
