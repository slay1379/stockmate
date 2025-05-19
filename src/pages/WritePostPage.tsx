import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreatePostInput } from '../types/community';
import { useCommunity } from '../context/CommunityContext';

export default function WritePostPage() {
  const navigate = useNavigate();
  const { createPost } = useCommunity();
  const [post, setPost] = useState<CreatePostInput>({
    title: '',
    content: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    createPost(post);
    navigate('/community');
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">게시글 작성</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md border border-blue-100">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-blue-700">
            제목
          </label>
          <input
            type="text"
            id="title"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            className="mt-1 block w-full rounded-md border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-blue-700">
            내용
          </label>
          <textarea
            id="content"
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            rows={10}
            className="mt-1 block w-full rounded-md border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/community')}
            className="px-4 py-2 border border-blue-300 rounded-xl text-blue-700 bg-blue-50 hover:bg-blue-100"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
          >
            작성하기
          </button>
        </div>
      </form>
    </div>
  );
} 