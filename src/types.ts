export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface TimeEntry {
  id: number;
  userId: number;
  type: 'in' | 'out';
  timestamp: Date;
}