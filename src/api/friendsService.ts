import api from './axios';
import type { User } from '../models/User';

export async function fetchFriends(userId: number): Promise<User[]> {
  const response = await api.get<User[]>('/users');
  const user = response.data.find(u => u.id === userId);
  if (!user) return [];
  return response.data.filter(u => user.friends.includes(u.id));
}

export async function fetchFriendRequests(userId: number): Promise<User[]> {
  // Simulate friend requests (not implemented in mock data)
  return [];
}

export async function sendFriendRequest(fromId: number, toId: number): Promise<boolean> {
  // Simulate sending friend request
  return true;
}

export async function acceptFriendRequest(userId: number, requesterId: number): Promise<boolean> {
  // Simulate accepting friend request
  return true;
}

export async function rejectFriendRequest(userId: number, requesterId: number): Promise<boolean> {
  // Simulate rejecting friend request
  return true;
}
