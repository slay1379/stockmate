import React from 'react';
import Card, { CardHeader, CardContent } from '../common/Card';
import { useNavigate } from 'react-router-dom';

// Mock community posts
const communityPosts = [
  {
    id: 'p1',
    title: '분산투자의 중요성에 대해 생각해보았습니다',
    author: '주식사랑',
    likes: 128,
    comments: 24,
    time: '2시간 전'
  },
  {
    id: 'p2',
    title: '처음 주식을 시작하시는 분들이 흔히 하는 실수 TOP 5',
    author: '투자의신',
    likes: 87,
    comments: 15,
    time: '4시간 전'
  },
  {
    id: 'p3',
    title: '오늘 발표된 경제지표 분석 및 시장 전망',
    author: '차트마스터',
    likes: 56,
    comments: 8,
    time: '6시간 전'
  }
];

const CommunityPostsSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="mb-8">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold text-gray-800">커뮤니티 인기글</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {communityPosts.map((post) => (
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
                  <span>댓글 {post.comments}</span>
                  <span className="mx-1">•</span>
                  <span>{post.time}</span>
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