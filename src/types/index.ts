export interface Course {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  badge: string;
  difficulty: string;
  durationWeeks: number;
  lessonsCount: number;
  tags: string;
  lessons?: Lesson[];
}

export interface Lesson {
  id: number;
  position: number;
  title: string;
  content: string;
  courseId: number;
}

export interface User {
  id: number;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  roles: string[];
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}