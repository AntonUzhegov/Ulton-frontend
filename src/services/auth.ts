import api from './api';
import { LoginRequest, RegisterRequest, AuthResponse, User } from '../types';

class AuthService {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post('/auth/login', data);
    return response.data;
  }

  async register(data: RegisterRequest): Promise<void> {
    await api.post('/auth/register', data);
  }

  async getCurrentUser(): Promise<User> {
    const response = await api.get('/auth/me');
    return response.data;
  }
}

export default new AuthService();