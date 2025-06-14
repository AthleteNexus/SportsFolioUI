import api from './axios';
import type { User } from '../models/User';

export async function fetchUsers(): Promise<User[]> {
  const response = await api.get<User[]>('/users');
  return response.data;
}