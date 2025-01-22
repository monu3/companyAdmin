import React from 'react';
import DisplayCard from './DisplayCard';
import DisplayTable from './DisplayTable';
import { useProjectContext } from '../store/context';

const ProjectDisplay = () => {
  const { view } = useProjectContext(); // Add parentheses to call the hook properly

  return (
    <div>
      {
        view === "table" ? <DisplayTable /> : <DisplayCard />
      }
    </div>
  );
}

export default ProjectDisplay;
