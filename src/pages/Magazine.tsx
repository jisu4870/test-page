import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const CATEGORIES = ['전체', '테마 여행', '트레킹/캠핑', '역사 탐방', '여행 팁', '맛집 추천', '숙소 리뷰', '체험 관광', '섬 에세이'];

export default function Magazine() {
  const { magazines } = useAppContext();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '전체';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  useEffect(() => {
    const categoryFromURL = searchParams.get('category');
    if (categoryFromURL) {
      setSelectedCategory(categoryFromURL);
    }
  }, [searchParams]);

  const filteredMagazines = selectedCategory === '전체'
    ? magazines
    : magazines.filter(post => post.category === selectedCategory);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === '전체') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">온섬 매거진</h1>
          <p className="text-lg text-gray-600">여행의 영감을 채워줄 다채로운 이야기</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                ? 'bg-[var(--color-sky-blue)] text-white shadow-md'
                : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMagazines.length > 0 ? (
            filteredMagazines.map(post => (
              <div 
                key={post.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col"
                onClick={() => navigate(`/magazine/${post.id}`)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-[var(--color-sky-blue-dark)]">
                    {post.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
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
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-500">
              해당 카테고리의 게시물이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
