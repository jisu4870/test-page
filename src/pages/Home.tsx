import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Calendar, MapPin, Clock, ArrowRight, X, Star } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import PromotionModal from '../components/PromotionModal';

const ISLANDS = [
  '교동도', '동검도', '황산도', '석모도', '미법도', '서검도', '주문도', '아차도', '볼음도', '말도', 
  '신시모도', '장봉도', '대연평도', '소연평도', '백령도', '대청도', '소청도', '덕적도', '소야도', '문갑도', 
  '백아도', '굴업도', '울도', '지도', '선갑도', '자월도', '대이작도', '소이작도', '승봉도', '영흥도', 
  '선재도', '측도', '대무의도', '소무의도', '세어도', '영종도'
].sort();

const DURATIONS = ['당일치기', '1박 2일', '2박 3일', '3박 4일', '4박 5일 이상'];

const REVIEWS = [
  {
    name: '김*현',
    package: 'MZ와 함께하는 2030 힐링여행',
    rating: 5,
    content: '덕적도 요트 투어 정말 최고였어요! 친구들과 인생샷도 많이 남기고 럭셔리한 휴식을 즐겼습니다. 버틀러분이 너무 친절하게 샴페인도 서비스 해주시고 설명도 잘 해주셔서 정말 대접받는 느낌이었습니다.',
    date: '2026.04.12',
    image: 'https://picsum.photos/seed/review1/400/300'
  },
  {
    name: '이*우',
    package: '소야도 하이엔드 감성 캠핑 & 트레킹',
    rating: 5,
    content: '글램핑 시설이 너무 깨끗하고 좋았어요. 밤에 별이 쏟아지는 걸 보며 불멍했던 시간이 잊혀지지 않네요. 아이와 함께 갔는데 모래놀이도 하고 도자기 체험도 하면서 정말 행복한 시간 보냈습니다.',
    date: '2026.04.08',
    image: 'https://picsum.photos/seed/review2/400/300'
  },
  {
    name: '박*아',
    package: '울릉도 럭셔리 크루즈 & 리조트 투어',
    rating: 5,
    content: '코스모스 리조트 패키지 강추합니다. 가이드님도 너무 친절하시고 독도 새우 다이닝은 정말 감동이었습니다. 크루즈 스위트룸도 너무 편안해서 부모님 효도 관광으로 다시 오고 싶네요.',
    date: '2026.04.05',
    image: 'https://picsum.photos/seed/review3/400/300'
  },
  {
    name: '최*지',
    package: 'MZ와 함께하는 2030 힐링여행',
    rating: 5,
    content: '프라이빗하게 우리 가족끼리만 즐길 수 있어서 안심하고 다녀왔습니다. 버틀러 서비스가 정말 세심했어요! 식사도 매끼니 너무 훌륭해서 여행 내내 입이 즐거웠습니다. 다음엔 제주도 패키지도 이용해보려고요.',
    date: '2026.03.28',
    image: 'https://picsum.photos/seed/review4/400/300'
  },
  {
    name: '정*민',
    package: '백령도 비경 & 사곶 해변 투어',
    rating: 5,
    content: '백령도가 이렇게 아름다운 곳인지 몰랐어요. 사곶 해변의 단단한 모래 위를 걷는 기분은 정말 특별했습니다. 두무진 유람선 투어도 압권이었고, 가이드님의 친절한 설명 덕분에 역사적인 의미도 되새길 수 있었습니다.',
    date: '2026.03.20',
    image: 'https://picsum.photos/seed/review5/400/300'
  },
  {
    name: '한*슬',
    package: '제주도 에메랄드 해변 & 프리미엄 골프 투어',
    rating: 5,
    content: '프리미엄이라는 단어가 딱 맞는 여행이었습니다. 골프 코스 상태도 너무 좋았고, 라운딩 후에 즐긴 요트 파티는 평생 잊지 못할 거예요. 숙소였던 호텔 스위트룸 컨디션도 최상이었습니다.',
    date: '2026.03.15',
    image: 'https://picsum.photos/seed/review6/400/300'
  }
];

export default function Home() {
  const { settings, packages, magazines } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [selectedIsland, setSelectedIsland] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [sortOrder, setSortOrder] = useState('recommended');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [showAllPackages, setShowAllPackages] = useState(false);
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  
  const packagesRef = useRef<HTMLDivElement>(null);
  const [filteredPackages, setFilteredPackages] = useState(packages);

  useEffect(() => {
    // Check if we should show the promo modal
    const hiddenUntil = localStorage.getItem('promo_hidden_until');
    const now = new Date().getTime();
    
    if (!hiddenUntil || now > parseInt(hiddenUntil)) {
      const timer = setTimeout(() => {
        setIsPromoOpen(true);
      }, 1500); // Show after 1.5 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const island = params.get('island');
    if (island) {
      setSelectedIsland(island);
      const result = packages.filter(p => p.island === island);
      setFilteredPackages(result);
      setShowAllPackages(true);
      
      if (packagesRef.current || location.hash === '#packages') {
        setTimeout(() => {
          document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }
  }, [location, packages]);

  useEffect(() => {
    if (isReviewModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isReviewModalOpen]);

  useEffect(() => {
    if (window.location.hash === '#packages' && packagesRef.current) {
      setTimeout(() => {
        packagesRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  const handleSearch = () => {
    let result = [...packages];
    if (selectedIsland) {
      result = result.filter(p => p.island === selectedIsland);
    }
    if (selectedDuration) {
      result = result.filter(p => p.duration === selectedDuration);
    }
    if (selectedCategory !== '전체') {
      result = result.filter(p => p.category === selectedCategory);
    }
    
    // Sort logic
    if (sortOrder === 'priceAsc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'priceDesc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'newest') {
      result.reverse(); // Simplified newest
    }

    setFilteredPackages(result);
    setShowAllPackages(true);
    
    if (packagesRef.current) {
      packagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    handleSearch();
  }, [selectedCategory, sortOrder]);

  return (
    <div className="w-full">
      {/* Promotion Modal */}
      <PromotionModal 
        isOpen={isPromoOpen} 
        onClose={() => setIsPromoOpen(false)} 
        onAction={() => {
          if (packagesRef.current) {
            packagesRef.current.scrollIntoView({ behavior: 'smooth' });
          }
          // Optionally filter for "Special" deals
          const result = packages.filter(p => p.status === '특가' || p.status === 'BEST');
          setFilteredPackages(result);
          setShowAllPackages(true);
        }}
      />

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
            당신만을 위한 특별한 섬 여행, <span onClick={() => navigate('/monthly')} className="cursor-pointer hover:text-[var(--color-sky-blue)] transition-colors decoration-[var(--color-sky-blue)] underline underline-offset-8">온섬투어</span>
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

        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" ref={packagesRef} className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">추천 프라이빗 투어</h2>
            <p className="text-gray-600">온섬투어가 엄선한 최고의 럭셔리 섬 여행 패키지</p>
          </div>

          {/* Theme Category Icons - Inspired by ModeTour */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: '전체', name: '전체', icon: <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">🏠</div> },
              { id: '힐링', name: '힐링/휴식', icon: <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">🧘</div> },
              { id: '가족', name: '가족/체험', icon: <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">👨‍👩‍👧</div> },
              { id: '럭셔리', name: '럭셔리/VIP', icon: <div className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center">👑</div> },
              { id: '트레킹', name: '트레킹/액티비티', icon: <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">🥾</div> },
              { id: '역사', name: '역사/탐방', icon: <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">🏺</div> },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "flex flex-col items-center gap-2 px-6 py-4 rounded-2xl transition-all border",
                  selectedCategory === cat.id 
                    ? "bg-white border-[var(--color-sky-blue)] shadow-md text-[var(--color-sky-blue)] scale-105" 
                    : "bg-transparent border-transparent text-gray-500 hover:bg-white hover:shadow-sm"
                )}
              >
                {cat.icon}
                <span className="text-sm font-bold">{cat.name}</span>
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center mb-6 px-2">
            <div className="text-sm text-gray-500 font-medium">
              총 <span className="text-[var(--color-sky-blue)] font-bold">{filteredPackages.length}</span>개의 상품이 있습니다.
            </div>
            <div className="flex items-center gap-2">
              <select 
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)]/20 cursor-pointer shadow-sm"
              >
                <option value="recommended">추천순</option>
                <option value="newest">최신순</option>
                <option value="priceAsc">낮은 금액순</option>
                <option value="priceDesc">높은 금액순</option>
              </select>
            </div>
          </div>
          
          {filteredPackages.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              검색 결과가 없습니다. 다른 조건으로 검색해보세요.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPackages.slice(0, showAllPackages ? undefined : 3).map(pkg => (
                  <div 
                    key={pkg.id} 
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
                    onClick={() => navigate(`/package/${pkg.id}`)}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={pkg.image} 
                        alt={pkg.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-[var(--color-sky-blue-dark)] shadow-sm">
                          {pkg.island}
                        </div>
                        {pkg.status && (
                          <div className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-bold text-white shadow-md uppercase tracking-wider",
                            pkg.status === 'BEST' && "bg-orange-500",
                            pkg.status === '특가' && "bg-red-500",
                            pkg.status === '마감임박' && "bg-gray-800",
                            pkg.status === '모집중' && "bg-green-600"
                          )}>
                            {pkg.status}
                          </div>
                        )}
                      </div>
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-white shadow-sm">
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
              
              {!showAllPackages && filteredPackages.length > 3 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-12 relative h-48 md:h-64 rounded-[2rem] overflow-hidden cursor-pointer group shadow-xl"
                  onClick={() => setShowAllPackages(true)}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                    alt="View All Tours"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/50 transition-colors group-hover:bg-black/40"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                    <span className="inline-block bg-[var(--color-sky-blue)] text-white px-3 py-1 rounded-full text-[10px] font-bold mb-4 uppercase tracking-widest">
                      On Island Private Tours
                    </span>
                    <h3 className="text-2xl md:text-4xl font-bold text-white mb-3 drop-shadow-md">
                      프라이빗 투어 전체보기
                    </h3>
                    <p className="text-white/80 text-sm md:text-base mb-6 font-light max-w-lg hidden sm:block">
                      온섬투어가 준비한 더욱 다채로운 럭셔리 휴양 패키지들을 모두 확인해보세요.
                    </p>
                    <div className="flex items-center gap-3 text-white font-bold group-hover:gap-5 transition-all">
                      <span>지금 확인하기</span>
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                        <ArrowRight size={20} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Theme Travel Banner */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="relative h-64 md:h-80 rounded-[2rem] overflow-hidden group cursor-pointer shadow-2xl"
            onClick={() => navigate('/magazine?category=테마 여행')}
          >
            <img 
              src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
              alt="Theme Travel" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-center max-w-2xl">
              <span className="inline-block bg-[var(--color-sky-blue)] text-white px-3 py-1 rounded-full text-[10px] font-bold mb-4 w-fit uppercase tracking-widest">
                On Island Theme Magazine
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg leading-tight">
                우리의 취향대로 떠나는<br/>
                <span className="text-[var(--color-sky-blue)]">테마별 섬 여행</span> 가이드
              </h2>
              <p className="text-white/80 text-sm md:text-base mb-8 font-light line-clamp-2 md:line-clamp-none">
                로맨틱한 연인 여행부터 아이와 함께하는 역사 탐방까지,<br/> 
                온섬투어가 제안하는 특별한 테마 스토리를 만나보세요.
              </p>
              <div className="flex items-center gap-3 text-white font-bold group-hover:gap-5 transition-all">
                <span>지금 테마 여행 구경하기</span>
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <ArrowRight size={20} />
                </div>
              </div>
            </div>
            
            {/* Visual Accents */}
            <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-[var(--color-sky-blue)]/20 to-transparent"></div>
            <div className="absolute bottom-8 right-8 hidden md:flex gap-4">
              <div className="flex flex-col items-end text-white/40 text-[10px] uppercase tracking-tighter font-mono">
                <span>Curated Themes</span>
                <span>Story & Adventure</span>
              </div>
            </div>
          </div>
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
                title: '[LIVE 특가] 시간 탐험대: 소야덕적 조각의 비밀!',
                subtitle: '아이와 함께 떠나는 역사 탐험 & 호박잼 만들기 체험',
                date: '2026.04.18 PM 08:00',
                image: 'https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202508/27/speaktravel/20250827140002969nwhf.jpg'
              },
              {
                title: '[신비의 풀등] 대이작도 힐링 탐방',
                subtitle: '썰물 때만 열리는 신비의 모래섬 탐험',
                date: '2026.04.19 PM 07:00',
                image: 'https://isum.incheon.go.kr/resource/www/images/sub/img_island_info11.jpg'
              },
              {
                title: '삼시세끼 in 덕적 소야',
                subtitle: '청춘들을 위한 감성 캠핑 & 요트 투어 특가',
                date: '2026.04.20 PM 08:00',
                image: 'https://isum.incheon.go.kr/resource/www/images/sub/img_island_info21.jpg'
              },
              {
                title: '[신의 조각품] 백령도 3일',
                subtitle: '서해 최북단의 비경, 백령도를 가장 깊이 있게 만나는 시간',
                date: '2026.04.25 PM 06:00',
                image: 'https://isum.incheon.go.kr/resource/www/images/sub/img_island_info18.jpg'
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
                    referrerPolicy="no-referrer"
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
                package: '삼시세끼 in 덕적 소야',
                rating: 5,
                content: '덕적도 스탬프 투어 정말 최고였어요! 소야 9경 둘러보면서 인생샷도 많이 남기고 맛있는 로컬 음식까지 완벽한 휴식이었습니다.',
                date: '2026.04.12'
              },
              {
                name: '이*우',
                package: '시간 탐험대: 소야덕적 조각의 비밀!',
                rating: 5,
                content: '아이들이 소야도 바닷길에서 조개 줍고 도자기 체험하는 걸 너무 좋아했어요. 역사 공부도 되고 퍼즐 미션까지 있어서 가족 여행으로 딱이네요!',
                date: '2026.04.08'
              },
              {
                name: '박*아',
                package: '울릉도 럭셔리 크루즈 & 리조트 투어',
                rating: 5,
                content: '코스모스 리조트 패키지 강추합니다. 가이드님도 너무 친절하시고 독도 새우 다이닝은 정말 감동이었습니다. 크루즈 여행이라 정말 편했어요.',
                date: '2026.04.05'
              },
              {
                name: '정*윤',
                package: '[신의 조각품] 백령도 3일',
                rating: 5,
                content: '두무진의 기암절벽은 정말 신의 조각품이라는 말이 아깝지 않네요. 사곶 천연비행장도 신기했고 가이드님의 친절한 설명 덕분에 역사적으로도 뜻깊은 시간이었습니다.',
                date: '2026.04.15'
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

          {/* Customer Reviews Banner */}
          <div className="mt-12 flex justify-center">
            <button 
              onClick={() => setIsReviewModalOpen(true)}
              className="group flex items-center gap-4 bg-[var(--color-sky-blue)]/5 border border-[var(--color-sky-blue)]/20 px-8 py-4 rounded-2xl shadow-sm hover:shadow-md hover:bg-[var(--color-sky-blue)]/10 transition-all"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <img 
                    key={i}
                    src={`https://picsum.photos/seed/user${i}/100/100`} 
                    alt="Customer" 
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <span className="w-px h-6 bg-gray-200"></span>
              <div className="text-left">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-yellow-400 text-xs text-sm">★★★★★</span>
                  <span className="text-gray-900 font-bold text-sm">실제 고객 생생 후기</span>
                </div>
                <p className="text-xs text-gray-500">1,200+명의 회원이 선택한 온섬투어 실시간 리뷰</p>
              </div>
              <ArrowRight size={16} className="text-[var(--color-sky-blue)] group-hover:translate-x-1 transition-all" />
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

      {/* Review Modal */}
      <AnimatePresence>
        {isReviewModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">고객 생생 후기</h2>
                  <p className="text-gray-500 text-sm">온섬투어를 이용해주신 고객님들의 솔직한 기록입니다.</p>
                </div>
                <button 
                  onClick={() => setIsReviewModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} className="text-gray-500" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="overflow-y-auto p-6 md:p-10 bg-gray-50 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {REVIEWS.map((review, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                    >
                      {review.image && (
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={review.image} 
                            alt={review.package} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}
                      <div className="p-6 flex-1">
                        <div className="flex items-center gap-1 text-yellow-400 mb-3">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} size={14} fill="currentColor" />
                          ))}
                        </div>
                        <p className="text-gray-900 font-bold text-sm mb-2">{review.package}</p>
                        <p className="text-gray-700 text-sm leading-relaxed mb-6">"{review.content}"</p>
                        <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[var(--color-sky-blue)]/10 flex items-center justify-center text-[var(--color-sky-blue)] text-xs font-bold">
                              {review.name[0]}
                            </div>
                            <span className="text-xs font-bold text-gray-900">{review.name} 고객님</span>
                          </div>
                          <span className="text-xs text-gray-400">{review.date}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-100 bg-white items-center flex justify-center">
                <button 
                  onClick={() => setIsReviewModalOpen(false)}
                  className="bg-gray-900 text-white px-10 py-3 rounded-xl font-bold hover:bg-gray-800 transition-all"
                >
                  닫기
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
