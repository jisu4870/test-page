import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function Magazine() {
  const { magazines } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">온섬 매거진</h1>
          <p className="text-lg text-gray-600">여행의 영감을 채워줄 다채로운 이야기</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {magazines.map(post => (
            <div 
              key={post.id} 
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col"
              onClick={() => navigate(`/magazine/${post.id}`)}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span className="text-[var(--color-sky-blue)] font-medium">{post.category}</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[var(--color-sky-blue)] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                  {post.content}
                </p>
                <div className="text-[var(--color-sky-blue)] font-medium text-sm mt-auto">
                  자세히 보기 &rarr;
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
