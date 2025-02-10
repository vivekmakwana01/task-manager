"use client";

import AddTaskModal from "@/components/AddTaskModal";
import TaskTabs from "@/components/TaskTabs";
import { useSelectedTask } from "@/store/useTaskStore";
import { useEffect, useState } from "react";

export default function Home() {
    const [open, setOpen] = useState(false);
    const selectedTask = useSelectedTask((state) => state.selectedTask);

    return (
        <main className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
            <AddTaskModal open={open} setOpen={setOpen} selectedTask={selectedTask} />
            <TaskTabs />
        </main>
    );
}
