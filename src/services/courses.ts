import api from './api';
import { Course, Lesson } from '../types';

class CoursesService {
  async getAll(): Promise<Course[]> {
    const response = await api.get('/courses');
    return response.data;
  }

  async getBySlug(slug: string): Promise<Course> {
    const response = await api.get(`/courses/${slug}`);
    return response.data;
  }

  async getLessons(slug: string): Promise<Lesson[]> {
    const response = await api.get(`/courses/${slug}/lessons`);
    return response.data;
  }

  async getLesson(slug: string, position: number): Promise<Lesson> {
    const response = await api.get(`/courses/${slug}/lessons/${position}`);
    return response.data;
  }
}

export default new CoursesService();