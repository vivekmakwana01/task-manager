"use client";

import { useState } from "react";
import { useTaskStore } from "@/store/useTaskStore";
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
import { Textarea } from "@/components/ui/textarea";
import TaskForm from "@/components/TaskForm";
import TaskCard from "@/components/TaskCard";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function Home() {
  const { tasks, toggleTask, removeTask } = useTaskStore();
  const { setTheme, theme } = useTheme();

  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <main className="max-w-md mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Task Manager</h1>
        <Button variant="outline" size="icon" onClick={handleThemeChange}>
          {theme === "dark" ? (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          )}
        </Button>
      </div>

      <TaskCard tasks={tasks} />
    </main>
  );
}
