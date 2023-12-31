import React from 'react'
import ProjectItem from '../Projects/ProjectItem'
import './ProjectList.css'
export default function ProjectList({myProjects,user, resource,setProjectAdded,projectAdded,setTaskUpdateWatch,taskUpdateWatch}) {


  return (
    <div className='projectList'>
        {myProjects.length?
      myProjects.map(project=>(<ProjectItem
         user={user}
         project={project}
         key={project._id}
         resource={resource}
         setProjectAdded={setProjectAdded}
         projectAdded={projectAdded}
         setTaskUpdateWatch={setTaskUpdateWatch}
         taskUpdateWatch={taskUpdateWatch}
        
         />))
         :<h1>No Projects. To add a project click +</h1>
    }
    </div>
  )
}
