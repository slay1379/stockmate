import React from 'react';
import { Link } from 'react-router-dom';
import { useCommunity } from '../context/CommunityContext';

const CommunityTabPage: React.FC = () => {
  const { posts } = useCommunity();

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">커뮤니티</h1>
        <Link
          to="/community/write"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          글쓰기
        </Link>
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            to={`/community/${post.id}`}
            key={post.id}
            className="block p-4 border rounded hover:bg-gray-50"
          >
            <div className="font-semibold text-lg mb-1">{post.title}</div>
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