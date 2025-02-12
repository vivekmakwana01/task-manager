"use client";

import { Task, useSelectedTask, useTaskStore } from "@/store/useTaskStore";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import { Plus } from "lucide-react";

export default function AddTaskModal({
    open,
    setOpen,
    selectedTask,
}: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    selectedTask: Task | null;
}) {
    const { addTask, updateTask } = useTaskStore();
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskDate, setTaskDate] = useState<Date | undefined>(new Date());
    const [submitButtonText, setSubmitButtonText] = useState("Add Task");
    const [flag, setFlag] = useState(true);
    const setSelectedTask = useSelectedTask((state) => state.setSelectedTask);

    const handleAddTask = () => {
        if (taskTitle && taskDate && !selectedTask) {
            addTask({
                id: crypto.randomUUID(),
                title: taskTitle,
                description: taskDescription,
                date: new Date(taskDate),
                completed: false,
            });
        } else if (taskTitle && taskDate && selectedTask) {
            updateTask({
                id: selectedTask.id,
                title: taskTitle,
                description: taskDescription,
                date: new Date(taskDate),
                completed: false,
            });
        }
        setTaskTitle("");
        setTaskDescription("");
        setTaskDate(new Date());
        setOpen(false);
    };

    useEffect(() => {
        if (selectedTask && flag) {
            setSubmitButtonText("Update Task");
            setOpen(true);
            setFlag(false);
            setTaskTitle(selectedTask.title);
            setTaskDescription(selectedTask.description ?? "");
            setTaskDate(selectedTask.date);
        } else {
            setSubmitButtonText("Add Task");
            setOpen(false);
            setFlag(true);
            setTaskTitle("");
            setTaskDescription("");
            setTaskDate(new Date());
        }
    }, [selectedTask]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="bg-[#E1EBF9] text-[#5E8BD6]">
                    <Plus className="w-5 h-5" />
                    New Task
                </Button>
            </DialogTrigger>
            <DialogContent
                className="p-6 bg-white rounded-lg shadow-lg border border-gray-300 w-10/12 md:w-full"
                onInteractOutside={(e) => {
                    setSelectedTask(null);
                }}
            >
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

                <Button onClick={handleAddTask}>{submitButtonText}</Button>
            </DialogContent>
        </Dialog>
    );
}
