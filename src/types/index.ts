export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  userId: string;
  imageUrl?: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  createdAt: string;
  updatedAt: string;
}
