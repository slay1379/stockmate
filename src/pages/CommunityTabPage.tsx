import React from 'react';
import { Link } from 'react-router-dom';
import { useCommunity } from '../context/CommunityContext';

const CommunityTabPage: React.FC = () => {
  const { posts } = useCommunity();

  return (
    <div className="max-w-xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-700">커뮤니티</h1>
        <Link
          to="/community/write"
          className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition"
        >
          글쓰기
        </Link>
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            to={`/community/${post.id}`}
            key={post.id}
            className="block p-4 bg-white border border-blue-100 rounded-xl shadow hover:bg-blue-50 transition"
          >
            <div className="font-semibold text-lg mb-1 text-blue-800">{post.title}</div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>{post.author}</span>
              <span>좋아요 {post.likes} · 댓글 {post.comments.length} · {new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CommunityTabPage; 