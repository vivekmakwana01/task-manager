"use client";

import AddTaskModal from "@/components/AddTaskModal";
import TaskTabs from "@/components/TaskTabs";
import { useSelectedTask } from "@/store/useTaskStore";
import { format } from "date-fns";
import { useEffect, useState } from "react";

export default function Home() {
    const [open, setOpen] = useState(false);
    const selectedTask = useSelectedTask((state) => state.selectedTask);

    return (
        <div className="flex h-full">
            <main className="p-5 mx-auto bg-[--bg-color] rounded-lg my-20">
                <div className="flex justify-between items-center min-w-[360px] sm:min-w-[425px]">
                    <div>
                        <h1 className="text-xl font-bold">Daily Task's</h1>
                        <p className="text-muted-foreground text-sm">
                            {format(new Date(), "EEEE, dd MMMM")}
                        </p>
                    </div>
                    <AddTaskModal
                        open={open}
                        setOpen={setOpen}
                        selectedTask={selectedTask}
                    />
                </div>
                <TaskTabs />
            </main>
        </div>
    );
}
