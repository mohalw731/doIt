// src/types/todo.ts
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  userId: string;
  categoryId?: string; // Optional categoryId
}
