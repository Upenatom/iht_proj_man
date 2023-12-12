import "./UserAdminPage.css"
import CreateUserForm from "../../components/CreateUserForm/CreateUserForm"


export default function UserAdminPage({user}) {
  return (
    
   <div className="main">
    <div className="createuser-main">
        <CreateUserForm user={user}/>
    </div>
    </div>
  )
}
