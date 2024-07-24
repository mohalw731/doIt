export type Todo = {
    id: string;
    text: string;
    completed: boolean;
    completionTimestamp?: number | null;
  }