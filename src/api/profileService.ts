import api from './axios';
import type { User } from '../models/User';

export async function fetchProfile(userId: number): Promise<User | null> {
  const response = await api.get<User[]>('/users');
  return response.data.find(u => u.id === userId) || null;
}

export async function updateProfile(userId: number, updates: Partial<User>): Promise<User | null> {
  // Simulate profile update
  const response = await api.get<User[]>('/users');
  const user = response.data.find(u => u.id === userId);
  if (!user) return null;
  return { ...user, ...updates };
}
