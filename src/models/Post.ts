export interface Comment {
  userId: number;
  text: string;
}

export interface Post {
  id: number;
  userId: number;
  content: string;
  images?: string[];
  likes: number[];
  comments: Comment[];
  createdAt: string;
}
