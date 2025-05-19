import React from 'react';
import Card, { CardHeader, CardContent } from '../common/Card';
import { useNavigate } from 'react-router-dom';
import { useCommunity } from '../../context/CommunityContext';

const CommunityPostsSection: React.FC = () => {
  const navigate = useNavigate();
  const { posts } = useCommunity();

  // 좋아요 순 인기글 상위 3개
  const popularPosts = [...posts].sort((a, b) => b.likes - a.likes).slice(0, 3);

  return (
    <section className="mb-8">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold text-gray-800">커뮤니티 인기글</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {popularPosts.map((post) => (
              <div 
                key={post.id}
                className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => navigate(`/community/${post.id}`)}
              >
                <h3 className="font-medium text-gray-900">{post.title}</h3>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <span>{post.author}</span>
                  <span className="mx-1">•</span>
                  <span>좋아요 {post.likes}</span>
                  <span className="mx-1">•</span>
                  <span>댓글 {post.comments.length}</span>
                  <span className="mx-1">•</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default CommunityPostsSection;