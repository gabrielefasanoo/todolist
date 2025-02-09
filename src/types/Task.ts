interface Task {
  id: string;
  title: string;
  completed: boolean;
  category: string;
  createdAt: Date;
}

export type { Task };