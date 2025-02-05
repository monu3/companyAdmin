import React from 'react'
import ProjectDetails from '../components/ProjectDetails';
import { WelcomeMessage } from '../components/WelcomeMessage';


export default function DashboardPage() {
  return (
    <main>
        <WelcomeMessage />
        <ProjectDetails />
        {/* <TaskDetails /> */}
    </main>
  );
}