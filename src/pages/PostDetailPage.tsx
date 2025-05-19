import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CreateCommentInput } from '../types/community';
import { useCommunity } from '../context/CommunityContext';

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { posts, createComment } = useCommunity();
  const [newComment, setNewComment] = useState('');

  const post = posts.find(p => p.id === id);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post || !newComment.trim()) return;

    createComment({
      content: newComment,
      postId: post.id
    });
    setNewComment('');
  };

  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="mb-8 bg-white p-6 rounded-xl shadow-md border border-blue-100">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">{post.title}</h1>
        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <span>{post.author}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="prose max-w-none text-gray-800">
          {post.content}
        </div>
      </div>

      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">댓글</h2>
        
        <form onSubmit={handleCommentSubmit} className="mb-8 bg-white p-4 rounded-xl shadow border border-blue-100">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border border-blue-300 rounded mb-2 focus:border-blue-500 focus:ring-blue-500"
            rows={3}
            placeholder="댓글을 작성하세요..."
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
          >
            댓글 작성
          </button>
        </form>

        <div className="space-y-4">
          {post.comments.map((comment) => (
            <div key={comment.id} className="border-b pb-4">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>{comment.author}</span>
                <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
              </div>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}