"use client";

import { useState } from "react";
import { useTaskStore } from "@/store/taskStore";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function Home() {
  const { tasks, addTask, toggleTask, removeTask } = useTaskStore();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDate, setTaskDate] = useState<Date | undefined>(new Date());

  const handleAddTask = () => {
    if (taskTitle && taskDate) {
      addTask(taskTitle, new Date(taskDate));
      setTaskTitle("");
      setTaskDate(new Date());
    }
  };

  return (
    <main className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="New task..."
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-start text-left">
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
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {tasks.map((task) => (
          <Card key={task.id} className="p-3 border-slate-100 rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              {/* Task Title */}
              <span
                onClick={() => toggleTask(task.id)}
                className={`text-lg font-medium cursor-pointer ${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {task.title}
              </span>
              {/* Delete Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeTask(task.id)}
                className="text-red-500 hover:bg-gray-100"
              >
                ❌
              </Button>
            </div>

            <div className="border-t border-gray-100 my-2"></div>

            <div className="text-sm text-gray-500">
              {format(task.date, "MMM dd, yyyy")}
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
