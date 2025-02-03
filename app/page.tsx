"use client";

import { useState } from "react";
import { useTaskStore } from "@/store/taskStore";
import { XMarkIcon } from "@heroicons/react/16/solid";

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
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            if (taskTitle) {
                                addTask(taskTitle);
                                setTaskTitle("");
                            }
                        }
                    }}
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
                    <li key={task.id} className="flex justify-between items-center bg-white rounded-lg px-4 py-2 mb-2">
                        <span
                            onClick={() => toggleTask(task.id)}
                            className={`cursor-pointer text-black ${task.completed ? "line-through" : ""}`}
                        >
                            {task.title}
                        </span>
                        <button onClick={() => removeTask(task.id)} className="text-red-500 bg-white p-1 rounded-full hover:bg-gray-300">
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </li>
                ))}
            </ul>
        </main>
    );
}
