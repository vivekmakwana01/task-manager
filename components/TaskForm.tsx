import { Task, useTaskStore } from "@/store/useTaskStore";
import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ReactTags } from "react-tag-autocomplete";
import { Tag, TagInput } from "emblor";

export default function TaskForm({
  isEditing,
  editingTask,
  setIsEditing,
  setEditingTask,
}: {
  isEditing: boolean;
  editingTask: Task | undefined;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingTask: React.Dispatch<React.SetStateAction<Task | undefined>>;
}) {
  const { addTask, updateTask } = useTaskStore();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState<Date | undefined>(new Date());
  const [tags, setTags] = useState<Tag[]>([]);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  const handleAddTask = () => {
    if (taskTitle && taskDate) {
      if (isEditing && editingTask) {
        editingTask.title = taskTitle;
        editingTask.description = taskDescription;
        editingTask.date = new Date(taskDate);

        updateTask(editingTask);
      } else {
        addTask({
          id: crypto.randomUUID(),
          title: taskTitle,
          description: taskDescription,
          date: new Date(taskDate),
          completed: false,
          tags: tags,
        });
      }
      setTaskTitle("");
      setTaskDescription("");
      setTaskDate(new Date());
      setTags([]);
      setIsEditing(false);
      setEditingTask(undefined);
    }
  };

  useEffect(() => {
    if (editingTask) {
      setTaskTitle(editingTask.title);
      setTaskDescription(editingTask.description || "");
      setTaskDate(editingTask.date);
    }
  }, [editingTask]);

  return (
    <div className="flex flex-col gap-2">
      <Input
        type="text"
        placeholder="New task..."
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />

      <Textarea
        placeholder="Task description..."
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
      />

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="justify-start text-left">
            {taskDate ? format(taskDate, "PPP") : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <Calendar mode="single" selected={taskDate} onSelect={setTaskDate} />
        </PopoverContent>
      </Popover>

      <TagInput
        placeholder="Enter tags"
        styleClasses={{
          inlineTagsContainer: "max-w-full flex flex-wrap",
          tag: {
            body: "px-2",
          },
        }}
        tags={tags}
        setTags={(newTags) => {
          setTags(newTags);
        }}
        activeTagIndex={activeTagIndex}
        setActiveTagIndex={setActiveTagIndex}
        shape={"rounded"}
      />

      <Button onClick={handleAddTask}>
        {isEditing ? "Update Task" : "Add Task"}
      </Button>
    </div>
  );
}
