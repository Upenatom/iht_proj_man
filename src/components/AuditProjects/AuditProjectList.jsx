import ProjectItem from '../Projects/ProjectItem'
import './AuditProjectList.css'
export default function ProjectList({myProjects,user, resource,setProjectAdded,projectAdded}) {


  return (
    <div className='auditprojectList'>
        {myProjects.length?
      myProjects.map(project=>(<ProjectItem
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
