"use client";

import { useTaskStore } from "@/store/useTaskStore";
import TaskCard from "@/components/TaskCard";
import AddTaskModal from "@/components/AddTaskModal";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
    const { tasks } = useTaskStore();
    const [filter, setFilter] = useState<"all" | "open" | "closed">("all");

    return (
        <main className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
            <AddTaskModal />
            <Tabs defaultValue="all" onChange={(val) => setFilter(val as any)}>
                <TabsList className="flex gap-3 rounded-lg mt-4 bg-white">
                    <TabsTrigger
                        value="all"
                        className="flex items-center gap-2 font-medium data-[state=active]:text-blue-600"
                    >
                        <span>All</span>
                        <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full data-[state=inactive]:bg-gray-200 data-[state=inactive]:text-gray-500">
                            {tasks.length}
                        </span>
                    </TabsTrigger>

                    <TabsTrigger
                        value="open"
                        className="flex items-center gap-2 font-medium data-[state=active]:text-black data-[state=inactive]:text-gray-400"
                    >
                        Open
                        <span className="bg-gray-300 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                            {tasks.filter((task) => !task.completed).length}
                        </span>
                    </TabsTrigger>

                    <TabsTrigger
                        value="closed"
                        className="flex items-center gap-2 font-medium data-[state=active]:text-black data-[state=inactive]:text-gray-400"
                    >
                        Closed
                        <span className="bg-gray-300 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                            {tasks.filter((task) => task.completed).length}
                        </span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                    <TaskCard tasks={tasks} />
                </TabsContent>
                <TabsContent value="open">
                    <TaskCard tasks={tasks.filter((task) => !task.completed)} />
                </TabsContent>
                <TabsContent value="closed">
                    <TaskCard tasks={tasks.filter((task) => task.completed)} />
                </TabsContent>
            </Tabs>
        </main>
    );
}
