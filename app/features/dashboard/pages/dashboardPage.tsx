import React from 'react'
import { WelcomeMessage } from '../components/WelcomeMessage';
import TaskDetails from '../components/TaskDetails';
import ProjectDetails from '../components/projectDetails';



export default function DashboardPage() {
  return (
    <main>
        <WelcomeMessage />
        <ProjectDetails />
        <TaskDetails />
    </main>
  );
}