// 'use client'

// import React, { useState } from 'react'
// import { DragDropContext, Droppable, Draggable, type DropResult } from "react-beautiful-dnd";

// interface Task {
//   id: string
//   content: string
//   status: string
// }

// interface KanbanBoardProps {
//   tasks: Task[]
//   onTaskMove: (result: DropResult) => void
// }

// const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onTaskMove }) => {
//   const columns = ['To-Do', 'In Progress', 'Bug', 'Done', 'Completed']

//   return (
//     <DragDropContext onDragEnd={onTaskMove}>
//       <div className="flex space-x-4 overflow-x-auto p-4">
//         {columns.map((column) => (
//           <div key={column} className="flex-shrink-0 w-72">
//             <h2 className="font-bold mb-2">{column}</h2>
//             <Droppable droppableId={column}>
//               {(provided) => (
//                 <div
//                   {...provided.droppableProps}
//                   ref={provided.innerRef}
//                   className="bg-gray-100 p-2 rounded-md min-h-[200px]"
//                 >
//                   {tasks
//                     .filter((task) => task.status === column)
//                     .map((task, index) => (
//                       <Draggable key={task.id} draggableId={task.id} index={index}>
//                         {(provided) => (
//                           <div
//                             ref={provided.innerRef}
//                             {...provided.draggableProps}
//                             {...provided.dragHandleProps}
//                             className="bg-white p-2 mb-2 rounded shadow"
//                           >
//                             {task.content}
//                           </div>
//                         )}
//                       </Draggable>
//                     ))}
//                   {provided.placeholder}
//                 </div>
//               )}
//             </Droppable>
//           </div>
//         ))}
//       </div>
//     </DragDropContext>
//   )
// }

// export default KanbanBoard

