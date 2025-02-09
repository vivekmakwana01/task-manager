"use client";

import { useTaskStore } from "@/store/useTaskStore";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export default function AddTaskModal() {
  const { addTask } = useTaskStore();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);

  const handleAddTask = () => {
    if (taskTitle && taskDate) {
      addTask({
        id: crypto.randomUUID(),
        title: taskTitle,
        description: taskDescription,
        date: new Date(taskDate),
        completed: false,
      });
      setTaskTitle("");
      setTaskDescription("");
      setTaskDate(new Date());
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Add Task</Button>
      </DialogTrigger>
      <DialogContent className="p-6 bg-white rounded-lg shadow-lg border border-gray-300 w-10/12 md:w-full">
        <DialogTitle className="mb-4">New Task</DialogTitle>

        <Input
          type="text"
          placeholder="New task..."
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="bg-white"
        />

        <Textarea
          placeholder="Task description..."
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          className="bg-white"
        />

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="justify-start text-left bg-white"
            >
              {taskDate ? format(taskDate, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start">
            <Calendar
              mode="single"
              selected={taskDate}
              onSelect={setTaskDate}
            />
          </PopoverContent>
        </Popover>

        <Button onClick={handleAddTask}>Add Task</Button>
      </DialogContent>
    </Dialog>
  );
}
