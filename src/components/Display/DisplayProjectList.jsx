import DisplayProjectItem from './DisplayProjectItem'
import './DisplayProjectList.css'
export default function ProjectList({myProjects,user, resource,setProjectAdded,projectAdded}) {


  return (
    <div className='displayprojectList'>
        {myProjects.length?
      myProjects.map(project=>(<DisplayProjectItem
         user={user}
         project={project}
         key={project._id}
         resource={resource}
         setProjectAdded={setProjectAdded}
         projectAdded={projectAdded}
         />))
         :<h1>No Projects. To add a project click +</h1>
    }
    </div>
  )
}
