export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  postId: string;
}

export interface CreatePostInput {
  title: string;
  content: string;
}

export interface CreateCommentInput {
  content: string;
  postId: string;
} 