import { createContext, useContext, useState, ReactNode } from 'react';
import { Post, Comment, CreatePostInput, CreateCommentInput } from '../types/community';

interface CommunityContextType {
  posts: Post[];
  createPost: (input: CreatePostInput) => void;
  createComment: (input: CreateCommentInput) => void;
}

const CommunityContext = createContext<CommunityContextType | null>(null);

export function CommunityProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      title: '첫 번째 게시글',
      content: '안녕하세요!',
      author: '사용자1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likes: 0,
      comments: []
    }
  ]);

  const createPost = (input: CreatePostInput) => {
    const newPost: Post = {
      id: Date.now().toString(),
      ...input,
      author: '현재 사용자',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likes: 0,
      comments: []
    };
    setPosts([newPost, ...posts]);
  };

  const createComment = (input: CreateCommentInput) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      content: input.content,
      author: '현재 사용자',
      createdAt: new Date().toISOString(),
      postId: input.postId
    };

    setPosts(posts.map(post => {
      if (post.id === input.postId) {
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));
  };

  return (
    <CommunityContext.Provider value={{ posts, createPost, createComment }}>
      {children}
    </CommunityContext.Provider>
  );
}

export function useCommunity() {
  const context = useContext(CommunityContext);
  if (!context) {
    throw new Error('useCommunity must be used within a CommunityProvider');
  }
  return context;
} 