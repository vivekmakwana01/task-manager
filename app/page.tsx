"use client";

import { useState } from "react";
import { useTaskStore } from "@/store/taskStore";

export default function Home() {
    const { tasks, addTask, toggleTask, removeTask } = useTaskStore();
    const [taskTitle, setTaskTitle] = useState("");

    return (
        <main className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="New task..."
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    className="border p-2 flex-1 rounded-md text-gray-800 bg-white focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={() => {
                        if (taskTitle) {
                            addTask(taskTitle);
                            setTaskTitle("");
                        }
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Add
                </button>
            </div>

            <ul className="mt-4">
                {tasks.map((task) => (
                    <li key={task.id} className="flex justify-between items-center p-2 border-b">
                        <span
                            onClick={() => toggleTask(task.id)}
                            className={`cursor-pointer ${task.completed ? "line-through text-gray-500" : ""}`}
                        >
                            {task.title}
                        </span>
                        <button onClick={() => removeTask(task.id)} className="text-red-500">X</button>
                    </li>
                ))}
            </ul>
        </main>
    );
}
