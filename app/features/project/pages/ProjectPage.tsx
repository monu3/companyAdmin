/*
 * ProjectPage.tsx
 * Created On : 2025-29-01 11
 * Author : Sujita Ghlan
 * Description : 
 */
import React from 'react'
import ProjectForm from '../components/ProjectForm'
import AddProject from '../components/AddProject'
import ProjectDisplay from '../components/ProjectDisplay'

const ProjectPage = () => {
  return (
    <div>
      <AddProject />
      <ProjectDisplay />
    </div>
  )
}

export default ProjectPage
