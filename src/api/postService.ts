import api from './axios';
import type { Post } from '../models/Post.ts';

export async function fetchPosts(userId: number): Promise<Post[]> {
  // Simulate fetching posts for user and friends
  const response = await api.get<Post[]>('/posts');
  // In a real app, filter by userId and friends
  return response.data;
}
