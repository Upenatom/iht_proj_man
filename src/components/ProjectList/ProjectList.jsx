import React from 'react'
import ProjectItem from '../Projects/ProjectItem'
import './ProjectList.css'
export default function ProjectList({myProjects,user}) {

  

  return (
    <div className='projectList'>
        {myProjects.length?
      myProjects.map(project=>(<ProjectItem user={user}project={project}/>)):<h1>No Projects. To add a project click +</h1>
    }
    </div>
  )
}
