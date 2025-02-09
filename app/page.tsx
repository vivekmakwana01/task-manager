"use client";

import { useTaskStore } from "@/store/useTaskStore";
import TaskCard from "@/components/TaskCard";
import AddTaskModal from "@/components/AddTaskModal";

export default function Home() {
    const { tasks, toggleTask, removeTask } = useTaskStore();

    return (
        <main className="max-w-md mx-auto p-4">
            <div></div>
            <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

            <AddTaskModal />

            <TaskCard tasks={tasks} />
        </main>
    );
}
