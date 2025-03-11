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

export default function Home() {
  const { tasks, toggleTask, removeTask } = useTaskStore();

  return (
    <main className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

      <TaskCard tasks={tasks} />
    </main>
  );
}
