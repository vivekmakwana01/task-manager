import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useTaskStore } from "@/store/useTaskStore";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "@/store/useTaskStore";
import TaskForm from "./TaskForm";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/16/solid";

export default function TaskCard({ tasks }: { tasks: Task[] }) {
  const removeTask = useTaskStore((state) => state.removeTask);
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  const editTaskHandler = (task: Task) => {
    setIsEditing(true);
    setEditingTask(task);
  };

  return (
    <div className="mt-4 flex flex-col gap-3">
      <TaskForm
        isEditing={isEditing}
        editingTask={editingTask}
        setIsEditing={setIsEditing}
        setEditingTask={setEditingTask}
      />

      {tasks.map((task) => (
        <Card
          key={task.id}
          className="p-3 border-slate-100 rounded-lg shadow-sm"
          onClick={() => editTaskHandler(task)}
        >
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              {/* Task Title */}
              <div>
                <span
                  onClick={() => toggleTask(task.id)}
                  className={`text-lg font-medium cursor-pointer ${
                    task.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.title}
                </span>
              </div>

              {/* Task Description */}
              <div>
                <span className="text-sm text-gray-500">
                  {task.description ? task.description : "No description"}
                </span>
              </div>
            </div>

            {/* Completed Checkbox */}
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id)}
              className="w-6 h-6 rounded-full border-gray-300 shrink-0"
            />
          </div>

          <div className="border-t border-gray-100 my-2"></div>

          {task.tags && task.tags.length > 0 && (
            <div className="flex justify-between items-center mb-2">
              <div className="flex gap-2">
                {task.tags.map((tag) => (
                  <div key={tag.id} className="flex items-center px-2 py-1 bg-gray-100 text-xs text-gray-900 rounded-full">
                    <span key={tag.id}>{tag.text}</span>
                    <Button
                      className="w-6 h-6 p-2 rounded-full ml-2"
                      variant="ghost"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {format(task.date, "MMM dd, yyyy")}
            </div>

            {/* Delete Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeTask(task.id)}
              className="w-6 h-6 rounded-full bg-transparent outline-red-500"
            >
              ❌
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
