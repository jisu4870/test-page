import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { cn } from '../lib/utils';

const ISLANDS = [
  '가거도', '거문도', '거제도', '교동도', '금오도', '남해', '덕적도', '마라도', 
  '백령도', '보길도', '비진도', '사량도', '선유도', '소매물도', '소야도', '신안', 
  '안면도', '연화도', '완도', '울릉도', '제주도', '진도', '청산도', '추자도', '홍도'
].sort();

const DURATIONS = ['당일치기', '1박 2일', '2박 3일', '3박 4일', '4박 5일 이상'];

export default function Home() {
  const { settings, packages, magazines } = useAppContext();
  const navigate = useNavigate();
  
  const [selectedIsland, setSelectedIsland] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  
  const packagesRef = useRef<HTMLDivElement>(null);
  const [filteredPackages, setFilteredPackages] = useState(packages);

  useEffect(() => {
    if (window.location.hash === '#packages' && packagesRef.current) {
      setTimeout(() => {
        packagesRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  const handleSearch = () => {
    let result = packages;
    if (selectedIsland) {
      result = result.filter(p => p.island === selectedIsland);
    }
    if (selectedDuration) {
      result = result.filter(p => p.duration === selectedDuration);
    }
    // Date filtering is skipped for this prototype as we don't have dates in packages
    setFilteredPackages(result);
    
    if (packagesRef.current) {
      packagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[120vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${settings.heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 w-full max-w-6xl mx-auto mt-20">
          <h1 className="text-white text-3xl md:text-5xl font-bold mb-6 drop-shadow-lg">
            당신만을 위한 특별한 섬 여행, 온섬투어
          </h1>
          <p className="text-white/90 text-sm md:text-base font-light mb-14 drop-shadow-md">
            일상의 번잡함을 벗어나, 차별화된 휴식을 경험하세요.
          </p>
          
          {/* Search Bar Area */}
          <div className="max-w-3xl mx-auto">
            {/* Search Area */}
            <div className="bg-white rounded-lg shadow-xl p-1.5 md:p-2 flex flex-col md:flex-row items-center gap-1">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-0 w-full px-3 md:px-5">
                <div className="text-left py-1.5">
                  <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <MapPin size={10} className="text-[var(--color-sky-blue)]" /> Destination
                  </label>
                  <select 
                    className="w-full border-none focus:outline-none bg-transparent text-sm font-bold h-7 appearance-none cursor-pointer"
                    value={selectedIsland}
                    onChange={(e) => setSelectedIsland(e.target.value)}
                  >
                    <option value="">어디로 떠나세요?</option>
                    {ISLANDS.map(island => (
                      <option key={island} value={island}>{island}</option>
                    ))}
                  </select>
                </div>
                
                <div className="text-left py-1.5 md:border-l md:border-gray-100 md:pl-5">
                  <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Calendar size={10} className="text-[var(--color-sky-blue)]" /> Departure
                  </label>
                  <input 
                    type="date" 
                    className="w-full border-none focus:outline-none bg-transparent text-sm font-bold h-7 cursor-pointer"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
                
                <div className="text-left py-1.5 md:border-l md:border-gray-100 md:pl-5">
                  <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Clock size={10} className="text-[var(--color-sky-blue)]" /> Duration
                  </label>
                  <select 
                    className="w-full border-none focus:outline-none bg-transparent text-sm font-bold h-7 appearance-none cursor-pointer"
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                  >
                    <option value="">여행 기간</option>
                    {DURATIONS.map(duration => (
                      <option key={duration} value={duration}>{duration}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <button 
                onClick={handleSearch}
                className="w-full md:w-auto bg-[var(--color-sky-blue)] hover:bg-[var(--color-sky-blue-dark)] text-white px-8 py-3 md:py-3.5 rounded-md font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md active:scale-[0.98]"
              >
                <Search size={16} />
                <span>검색하기</span>
              </button>
            </div>
          </div>

          {/* Popular Search Terms */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-white/90">
            <span className="text-sm font-medium mr-2">인기 검색어:</span>
            {['울릉도', '덕적도', '소야도', '백령도', '제주도'].map((term) => (
              <button
                key={term}
                onClick={() => {
                  setSelectedIsland(term);
                  // Trigger search immediately for convenience
                  let result = packages.filter(p => p.island === term);
                  setFilteredPackages(result);
                  if (packagesRef.current) {
                    packagesRef.current.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-4 py-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-sm transition-colors border border-white/20"
              >
                #{term}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" ref={packagesRef} className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">추천 프라이빗 투어</h2>
            <p className="text-gray-600">온섬투어가 엄선한 최고의 럭셔리 섬 여행 패키지</p>
          </div>
          
          {filteredPackages.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              검색 결과가 없습니다. 다른 조건으로 검색해보세요.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPackages.map(pkg => (
                <div 
                  key={pkg.id} 
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  onClick={() => navigate(`/package/${pkg.id}`)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={pkg.image} 
                      alt={pkg.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-[var(--color-sky-blue-dark)]">
                      {pkg.island}
                    </div>
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-white">
                      {pkg.duration}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{pkg.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{pkg.description}</p>
                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                      <span className="text-lg font-bold text-gray-900">
                        {pkg.price.toLocaleString()}원 <span className="text-sm font-normal text-gray-500">/ 1인</span>
                      </span>
                      <span className="text-[var(--color-sky-blue)] group-hover:translate-x-1 transition-transform">
                        <ArrowRight size={20} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

            {/* Hot Deal LIVE Section */}
      <section id="live" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                핫딜LIVE 미리보기 <span className="inline-block w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              </h2>
              <p className="text-gray-600">라이브 방송에서만 만날 수 있는 파격적인 특가 혜택!</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: '[LIVE 특가] 울릉도 크루즈 & 코스모스 리조트',
                subtitle: '단 1시간, 역대급 최저가 도전!',
                date: '2026.04.20 PM 08:00',
                image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
              },
              {
                title: '[LIVE 특가] 덕적도 요트 투어 & 선상 파티',
                subtitle: 'MZ 취향저격, 요트 위 럭셔리 휴식',
                date: '2026.04.22 PM 07:00',
                image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7bb7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
              },
              {
                title: '[LIVE 특가] 소야도 감성 캠핑 패키지',
                subtitle: '몸만 떠나는 프리미엄 글램핑',
                date: '2026.04.25 PM 06:00',
                image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
              },
              {
                title: '[LIVE 특가] 백령도 비경 & 사곶 해변 투어',
                subtitle: '천연 비행장 해변에서의 특별한 경험',
                date: '2026.04.28 PM 08:00',
                image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
              }
            ].map((live, idx) => (
              <div key={idx} className="group relative rounded-3xl overflow-hidden aspect-[3/4] shadow-lg">
                <img 
                  src={live.image} 
                  alt={live.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                {/* Gray Overlay for Upcoming Broadcast */}
                <div className="absolute inset-0 bg-gray-900/40 group-hover:bg-gray-900/30 transition-colors duration-500"></div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end">
                  <div className="inline-flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-bold mb-4 w-fit">
                    <Clock size={12} /> 방송예정
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                    {live.title}
                  </h3>
                  <p className="text-white/80 text-sm mb-6">{live.subtitle}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-white/90 text-xs bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                      <Calendar size={14} /> {live.date}
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        alert('알림설정이 완료되었습니다!');
                      }}
                      className="w-full bg-[var(--color-sky-blue)] text-white py-3 rounded-xl font-bold text-sm hover:bg-[var(--color-sky-blue-dark)] transition-all active:scale-95 shadow-lg"
                    >
                      알림설정
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Magazine Preview Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">온섬 매거진</h2>
              <p className="text-gray-600">여행의 영감을 채워줄 다채로운 이야기</p>
            </div>
            <button 
              onClick={() => navigate('/magazine')}
              className="hidden md:flex items-center gap-2 text-gray-600 hover:text-[var(--color-sky-blue)] transition-colors"
            >
              전체보기 <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {magazines.slice(0, 2).map(post => (
              <div 
                key={post.id} 
                className="group cursor-pointer"
                onClick={() => navigate(`/magazine/${post.id}`)}
              >
                <div className="relative h-80 rounded-2xl overflow-hidden mb-6">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span className="text-[var(--color-sky-blue)] font-medium">{post.category}</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[var(--color-sky-blue)] transition-colors">{post.title}</h3>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => navigate('/magazine')}
            className="md:hidden mt-8 w-full py-4 border border-gray-200 rounded-xl text-gray-600 font-medium flex items-center justify-center gap-2"
          >
            전체보기 <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">100% 실제 고객 리뷰 📝</h2>
            <p className="text-gray-600">온섬투어와 함께한 고객님들의 생생한 여행 후기</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: '김*현',
                package: 'MZ와 함께하는 2030 힐링여행',
                rating: 5,
                content: '덕적도 요트 투어 정말 최고였어요! 친구들과 인생샷도 많이 남기고 럭셔리한 휴식을 즐겼습니다.',
                date: '2026.04.12'
              },
              {
                name: '이*우',
                package: '소야도 하이엔드 감성 캠핑 & 트레킹',
                rating: 5,
                content: '글램핑 시설이 너무 깨끗하고 좋았어요. 밤에 별이 쏟아지는 걸 보며 불멍했던 시간이 잊혀지지 않네요.',
                date: '2026.04.08'
              },
              {
                name: '박*아',
                package: '울릉도 럭셔리 크루즈 & 리조트 투어',
                rating: 5,
                content: '코스모스 리조트 패키지 강추합니다. 가이드님도 너무 친절하시고 독도 새우 다이닝은 정말 감동이었습니다.',
                date: '2026.04.05'
              },
              {
                name: '최*지',
                package: 'MZ와 함께하는 2030 힐링여행',
                rating: 5,
                content: '프라이빗하게 우리 가족끼리만 즐길 수 있어서 안심하고 다녀왔습니다. 버틀러 서비스가 정말 세심했어요!',
                date: '2026.03.28'
              }
            ].map((review, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex text-yellow-400 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4 h-20 overflow-hidden">
                  "{review.content}"
                </p>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs font-bold text-gray-900 mb-1">{review.package}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{review.name} 고객님</span>
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Rating 4.5+ Banner */}
          <div className="mt-12 flex justify-center">
            <button 
              onClick={() => {
                packagesRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex items-center gap-3 bg-white border border-gray-200 px-6 py-3 rounded-full shadow-sm hover:shadow-md hover:border-[var(--color-sky-blue)] transition-all"
            >
              <span className="flex items-center gap-1 text-yellow-400 font-bold">
                ★ <span className="text-gray-900">평점 4.5+</span>
              </span>
              <span className="w-px h-4 bg-gray-200"></span>
              <span className="text-sm text-gray-600 font-medium group-hover:text-[var(--color-sky-blue)] transition-colors">인기 상품 모두보기</span>
              <ArrowRight size={14} className="text-gray-400 group-hover:text-[var(--color-sky-blue)] group-hover:translate-x-1 transition-all" />
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">🎼 쏠쏠한 혜택, 온섬투어가 한 번 더 알려드려요~!</h2>
            <p className="text-gray-600">여행의 즐거움을 더해주는 온섬투어만의 특별한 혜택</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card Benefit 1 */}
            <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100 flex flex-col items-center text-center group hover:bg-blue-100 transition-colors">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <span className="text-2xl">💳</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">신한카드 결제 혜택</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                온섬투어 패키지 결제 시<br/>
                최대 5% 즉시 할인 + 6개월 무이자 할부
              </p>
            </div>

            {/* Card Benefit 2 */}
            <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100 flex flex-col items-center text-center group hover:bg-indigo-100 transition-colors">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <span className="text-2xl">🏦</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">국민카드 캐시백</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                30만원 이상 결제 시<br/>
                2만원 캐시백 혜택 (선착순 500명)
              </p>
            </div>

            {/* Site Benefit */}
            <div className="bg-sky-50 p-8 rounded-3xl border border-sky-100 flex flex-col items-center text-center group hover:bg-sky-100 transition-colors">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <span className="text-2xl">🏝️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">온섬투어 회원 전용</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                전 상품 예약 시<br/>
                현지 맛집 3만원 이용권 증정
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
