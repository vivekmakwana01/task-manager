import { create } from "zustand";

export type Task = {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    date: Date;
};

type TaskStore = {
    tasks: Task[];
    addTask: (task: Task) => void;
    toggleTask: (id: string) => void;
    removeTask: (id: string) => void;
    updateTask: (updatedTask: Task) => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
    tasks: [],
    addTask: (task) =>
        set((state) => ({
            tasks: [...state.tasks, task],
        })),
    toggleTask: (id) =>
        set((state) => ({
            tasks: state.tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            ),
        })),
    removeTask: (id) =>
        set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== id),
        })),
    updateTask: (updatedTask) =>
        set((state) => ({
            tasks: state.tasks.map((task) =>
                task.id === updatedTask.id ? { ...task, ...updatedTask } : task
            ),
        })),
}));

export type SelectedTaskStore = {
    selectedTask: Task | null;
    setSelectedTask: (task: Task | null) => void;
};

export const useSelectedTask = create<SelectedTaskStore>((set) => ({
    selectedTask: null,
    setSelectedTask: (task: Task | null) => set({ selectedTask: task }),
}));
