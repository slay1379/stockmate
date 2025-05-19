import { Link } from 'react-router-dom';
import { useCommunity } from '../context/CommunityContext';

export default function CommunityPage() {
  const { posts } = useCommunity();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">커뮤니티</h1>
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
            key={post.id}
            to={`/community/${post.id}`}
            className="block p-4 border rounded hover:bg-gray-50"
          >
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{post.author}</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 