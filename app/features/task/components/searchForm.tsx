'use client'

import React, { useState } from "react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from 'lucide-react'
import { format } from "date-fns"
import KanbanBoard from "./KanbanBoard"
import type { DropResult } from 'react-beautiful-dnd'

interface Task {
  id: string
  content: string
  status: string
}

export default function SearchForm() {
  const [selectedProject, setSelectedProject] = useState<string>("")
  const [selectedStatus, setSelectedStatus] = useState<string>("")
  const [selectedPriority, setSelectedPriority] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [tasks, setTasks] = useState<Task[]>([])

  const handleReset = () => {
    setSelectedProject("")
    setSelectedStatus("")
    setSelectedPriority("")
    setSelectedDate(undefined)
  }

  const handleSearch = () => {
    // Simulating API call to fetch tasks based on search criteria
    const mockTasks: Task[] = [
      { id: '1', content: 'Task 1', status: 'To-Do' },
      { id: '2', content: 'Task 2', status: 'In Progress' },
      { id: '3', content: 'Bug: Fix login', status: 'Bug' },
      { id: '4', content: 'Task 4', status: 'Done' },
      { id: '5', content: 'Task 5', status: 'Completed' },
    ]
    setTasks(mockTasks)
  }

  const handleTaskMove = (result: DropResult) => {
    if (!result.destination) return

    const newTasks = Array.from(tasks)
    const [reorderedTask] = newTasks.splice(result.source.index, 1)
    reorderedTask.status = result.destination.droppableId
    newTasks.splice(result.destination.index, 0, reorderedTask)

    setTasks(newTasks)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Project Dropdown */}
        <Select value={selectedProject} onValueChange={setSelectedProject}>
          <SelectTrigger>
            <SelectValue placeholder="Select Project" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="project1">Project 1</SelectItem>
            <SelectItem value="project2">Project 2</SelectItem>
            <SelectItem value="project3">Project 3</SelectItem>
          </SelectContent>
        </Select>

        {/* Status Dropdown */}
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>

        {/* Priority Dropdown */}
        <Select value={selectedPriority} onValueChange={setSelectedPriority}>
          <SelectTrigger>
            <SelectValue placeholder="Select Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>

        {/* Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-auto justify-start text-left font-normal ${
                !selectedDate && "text-muted-foreground"
              }`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Search and Reset Buttons */}
      <div className="flex justify-end space-x-4 mb-6">
        <Button
          className="bg-teal-500 text-white hover:bg-teal-600"
          onClick={handleSearch}
        >
          Search
        </Button>
        <Button variant="outline" className="text-red-500 hover:text-red-600" onClick={handleReset}>
          Reset
        </Button>
      </div>

      {/* Kanban Board */}
      {tasks.length > 0 && (
        <KanbanBoard tasks={tasks} onTaskMove={handleTaskMove} />
      )}
    </div>
  )
}

