import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

import ReactMarkdown from 'react-markdown';

export default function MagazineDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { magazines } = useAppContext();
  
  const post = magazines.find(m => m.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">게시글을 찾을 수 없습니다.</h2>
          <button onClick={() => navigate(-1)} className="text-[var(--color-sky-blue)] hover:underline">
            이전 페이지로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="text-gray-500 flex items-center gap-2 mb-8 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} /> 목록으로
        </button>

        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-4">
            <span className="text-[var(--color-sky-blue)] font-medium px-3 py-1 bg-blue-50 rounded-full">{post.category}</span>
            <span>{post.date}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {post.title}
          </h1>
        </div>

        <div className="rounded-2xl overflow-hidden mb-12 h-[50vh]">
          <img src={post.image} alt={post.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 leading-loose">
          <ReactMarkdown
            components={{
              img: ({ node, ...props }) => (
                <img 
                  {...props} 
                  referrerPolicy="no-referrer" 
                  className="rounded-2xl shadow-md my-8 w-full object-cover" 
                />
              ),
              h3: ({ node, ...props }) => (
                <h3 {...props} className="text-2xl font-bold text-gray-900 mt-12 mb-6" />
              ),
              p: ({ node, ...props }) => (
                <p {...props} className="mb-6 whitespace-pre-wrap" />
              )
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
