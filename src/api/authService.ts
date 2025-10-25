import api from './axios.ts';
import type { User } from '../models/User';

export async function login(username: string, password: string): Promise<User | null> {
  const response = await api.get<User[]>('/users');
  const user = response.data.find(u => u.username === username && u.password === password);
  return user || null;
}

export async function signup(newUser: Omit<User, 'id'>): Promise<User> {
  // Simulate user creation
  // In a real backend, you'd POST to /users
  return { ...newUser, id: Date.now() };
}

export async function resetPassword(email: string): Promise<boolean> {
  // Simulate OTP generation and verification
  const response = await api.get<User[]>('/users');
  const user = response.data.find(u => u.email === email);
  return !!user;
}
