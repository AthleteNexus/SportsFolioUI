
import usersData from '@/mock-data/data.json';
import type { User } from '../models/User';

export async function login(username: string, password: string): Promise<User | null> {
  // Read users from local mock data
  const users: User[] = usersData.users;
  const user = users.find(u => u.username === username && u.password === password);
  // Simulate async
  await new Promise((resolve) => setTimeout(resolve, 500));
  return user || null;
}

export async function signup(newUser: Omit<User, 'id'>): Promise<User> {
  // Simulate user creation
  // In a real backend, you'd POST to /users
  return { ...newUser, id: Date.now() };
}

export async function resetPassword(email: string): Promise<boolean> {
  // Simulate OTP generation and verification using local mock data
  const users: User[] = usersData.users;
  const user = users.find(u => u.email === email);
  await new Promise((resolve) => setTimeout(resolve, 500));
  return !!user;
}
