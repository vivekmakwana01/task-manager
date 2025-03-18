"use client";

import { useTaskStore } from "@/store/useTaskStore";
import { Button } from "@/components/ui/button";
import TaskCard from "@/components/TaskCard";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function Home() {
  const { tasks } = useTaskStore();
  const { setTheme, theme } = useTheme();

  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <main className="max-w-md mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Task Manager</h1>
      </div>

      <TaskCard tasks={tasks} />
    </main>
  );
}
