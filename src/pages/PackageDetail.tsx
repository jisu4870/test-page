import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, Clock, Calendar, Users, CheckCircle, ArrowLeft, 
  Ship, Share2, Heart, Info, AlertCircle, Utensils, Hotel, Camera, Briefcase, X
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import DestinationInfo from '../components/DestinationInfo';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function PackageDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { packages, addRecentlyViewed } = useAppContext();
  
  const pkg = packages.find(p => p.id === id);
  const [activeTab, setActiveTab] = useState<'itinerary' | 'details' | 'guidelines'>('itinerary');
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(pkg?.image || '');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');

  const itineraryRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const guidelinesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      addRecentlyViewed(id);
    }
  }, [id, addRecentlyViewed]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: pkg?.title,
        text: pkg?.description,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('링크가 클립보드에 복사되었습니다.');
    }
  };

  const scrollToSection = (tab: 'itinerary' | 'details' | 'guidelines') => {
    setActiveTab(tab);
    const refs = { itinerary: itineraryRef, details: detailsRef, guidelines: guidelinesRef };
    const targetRef = refs[tab];
    if (targetRef.current) {
      const offset = 140; // Height of sticky header
      const elementPosition = targetRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">상품을 찾을 수 없습니다.</h2>
          <button onClick={() => navigate(-1)} className="text-[var(--color-sky-blue)] hover:underline">
            이전 페이지로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-24 bg-[#f8f9fa]">
      {/* Breadcrumbs & Title Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
            <button onClick={() => navigate('/')} className="hover:text-gray-600">홈</button>
            <span>&gt;</span>
            <span className="hover:text-gray-600">인천/경기</span>
            <span>&gt;</span>
            <span className="text-gray-900 font-medium">{pkg.island}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                {pkg.status && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {pkg.status}
                  </span>
                )}
                <span className="text-xs text-gray-500 font-medium tracking-wider uppercase">상품번호: ON-{pkg.id}0392</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {pkg.title}
              </h1>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                <Share2 size={16} /> 공유
              </button>
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors",
                  isLiked ? "border-red-500 text-red-500 bg-red-50" : "border-gray-200 text-gray-600 hover:bg-gray-50"
                )}
              >
                <Heart size={16} fill={isLiked ? "currentColor" : "none"} /> 찜
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Area */}
          <div className="lg:col-span-2 space-y-10">
            {/* Gallery Section */}
            <section className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 p-2">
              <div 
                className="aspect-[16/9] w-full rounded-xl overflow-hidden mb-2 cursor-zoom-in relative group"
                onClick={() => {
                  setLightboxImage(selectedImage);
                  setIsLightboxOpen(true);
                }}
              >
                <img 
                  src={selectedImage} 
                  alt={pkg.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <Camera className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={32} />
                </div>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 px-1">
                {[pkg.image, ...(pkg.gallery || [])].map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={cn(
                      "flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all relative group",
                      selectedImage === img ? "border-[var(--color-sky-blue)]" : "border-transparent opacity-70 hover:opacity-100"
                    )}
                  >
                    <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            </section>

            {/* Key Information Summary Grid */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
                <Clock className="text-[var(--color-sky-blue)] mb-3" size={24} />
                <span className="text-[10px] text-gray-400 uppercase font-bold mb-1">여행기간</span>
                <span className="text-sm font-bold text-gray-900">{pkg.duration}</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
                <Ship className="text-[var(--color-sky-blue)] mb-3" size={24} />
                <span className="text-[10px] text-gray-400 uppercase font-bold mb-1">이동수단</span>
                <span className="text-sm font-bold text-gray-900">쾌속선 왕복</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
                <Utensils className="text-[var(--color-sky-blue)] mb-3" size={24} />
                <span className="text-[10px] text-gray-400 uppercase font-bold mb-1">식사정보</span>
                <span className="text-sm font-bold text-gray-900">현지특식 포함</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
                <Users className="text-[var(--color-sky-blue)] mb-3" size={24} />
                <span className="text-[10px] text-gray-400 uppercase font-bold mb-1">최소인원</span>
                <span className="text-sm font-bold text-gray-900">성인 2명</span>
              </div>
            </section>

            {/* Sticky Tabs Navigation */}
            <div className="sticky top-[80px] z-30 bg-white border-y border-gray-100 -mx-4 px-4 sm:mx-0 sm:px-0 sm:rounded-t-2xl shadow-sm">
              <nav className="flex items-center max-w-7xl mx-auto h-16">
                <button 
                  onClick={() => scrollToSection('itinerary')}
                  className={cn(
                    "flex-1 h-full text-sm font-bold border-b-2 transition-all",
                    activeTab === 'itinerary' ? "text-[var(--color-sky-blue)] border-[var(--color-sky-blue)]" : "text-gray-400 border-transparent hover:text-gray-600"
                  )}
                >
                  일정표
                </button>
                <button 
                  onClick={() => scrollToSection('details')}
                  className={cn(
                    "flex-1 h-full text-sm font-bold border-b-2 transition-all",
                    activeTab === 'details' ? "text-[var(--color-sky-blue)] border-[var(--color-sky-blue)]" : "text-gray-400 border-transparent hover:text-gray-600"
                  )}
                >
                  상세설명
                </button>
                <button 
                  onClick={() => scrollToSection('guidelines')}
                  className={cn(
                    "flex-1 h-full text-sm font-bold border-b-2 transition-all",
                    activeTab === 'guidelines' ? "text-[var(--color-sky-blue)] border-[var(--color-sky-blue)]" : "text-gray-400 border-transparent hover:text-gray-600"
                  )}
                >
                  유의사항
                </button>
              </nav>
            </div>

            {/* Content Sections */}
            <div className="space-y-12">
              {/* Itinerary Section */}
              <section ref={itineraryRef} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm scroll-mt-40">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-50">여행 일정표</h2>
                <div className="space-y-10">
                  {pkg.itinerary.map((item, index) => (
                    <div key={index} className="relative pl-10">
                      {/* Timeline vertical line */}
                      <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gray-100"></div>
                      
                      {/* Day marker circle */}
                      <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-white border-2 border-[var(--color-sky-blue)] flex items-center justify-center z-10">
                        <span className="text-xs font-bold text-[var(--color-sky-blue)]">{item.day}일</span>
                      </div>
                      
                      <div className="bg-gray-50 rounded-2xl p-6 hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-blue-50">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <CheckCircle size={18} className="text-[var(--color-sky-blue)]" /> {item.title}
                        </h3>
                        {item.image && (
                          <div className="mb-4 rounded-xl overflow-hidden aspect-[16/9] md:aspect-[21/9] shadow-sm">
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                              referrerPolicy="no-referrer" 
                            />
                          </div>
                        )}
                        <div className="space-y-3">
                          {item.description.split('\n').map((line, i) => {
                             const match = line.match(/^(\[.*?\])(.*)/);
                             if (match) {
                               return (
                                 <div key={i} className="flex gap-3">
                                   <span className="bg-white text-[10px] font-bold text-[var(--color-sky-blue-dark)] px-2 py-1 rounded-md border border-blue-100 whitespace-nowrap h-fit">
                                     {match[1].replace(/[\[\]]/g, '')}
                                   </span>
                                   <p className="text-sm text-gray-600 font-medium leading-relaxed">{match[2]}</p>
                                 </div>
                               );
                             }
                             return <p key={i} className="text-sm text-gray-500 pl-4 border-l border-gray-200 ml-2">{line}</p>;
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* Exit marker */}
                  <div className="relative pl-10 mt-[-20px]">
                    <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center z-10">
                      <ArrowLeft className="text-white rotate-180" size={18} />
                    </div>
                    <div className="pt-2 pl-4">
                      <p className="text-sm font-bold text-gray-900">인천항 도착 후 해산</p>
                      <p className="text-xs text-gray-400 mt-1">이용해 주셔서 감사합니다.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Detailed Description Section */}
              <section ref={detailsRef} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm scroll-mt-40">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-50">상세 설명</h2>
                <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed space-y-6">
                  <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 italic">
                    "{pkg.description}"
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <CheckCircle size={18} className="text-green-500" /> 포함 사항
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex gap-2">· 인천항 ↔ {pkg.island} 왕복 뱃값</li>
                        <li className="flex gap-2">· 현지 숙소 (요청하신 테마에 따른 숙박)</li>
                        <li className="flex gap-2">· 전 일정 현지 특식 및 조식</li>
                        <li className="flex gap-2">· 섬 내 전용 투어 버스 & 카트 지원</li>
                        <li className="flex gap-2">· 주요 관광지 입장료 및 체험 비용</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <AlertCircle size={18} className="text-red-500" /> 불포함 사항
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex gap-2">· 개인 경비 및 주류/음료</li>
                        <li className="flex gap-2">· 포함 사항 외 기타 식사/체험</li>
                        <li className="flex gap-2">· 여행자 보험 (개별 가입 권장)</li>
                      </ul>
                    </div>
                  </div>

                  {pkg.ferryInfo && (
                    <div className="mt-8 border-t border-gray-50 pt-8">
                       <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Ship size={18} className="text-blue-500" /> 교통편 안내 (옹진훼미리호)
                      </h4>
                      <div className="p-4 bg-gray-50 rounded-xl text-sm leading-relaxed">
                        {pkg.ferryInfo.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* Guidelines Section */}
              <section ref={guidelinesRef} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm scroll-mt-40">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-50">취소 및 유의사항</h2>
                <div className="space-y-6 text-sm text-gray-500 leading-relaxed">
                  <div className="bg-orange-50 p-6 rounded-2xl">
                    <h5 className="font-bold text-orange-800 mb-3 flex items-center gap-2">
                      <AlertCircle size={16} /> 예약 전 꼭 확인하세요!
                    </h5>
                    <ul className="space-y-2 list-disc pl-4 text-orange-900/70">
                      <li>기상 상황(풍랑주의보 등)으로 인해 선박 운항이 불가할 경우 전액 환불 또는 일정 변경이 가능합니다.</li>
                      <li>섬 내부 특성상 숙박 시설은 대도시 호텔에 비해 투박할 수 있으나, 위생을 최선으로 관리합니다.</li>
                      <li>출항 1시간 전까지는 선착장에 도착하셔야 하며, 반드시 신분증을 지참하셔야 합니다.</li>
                    </ul>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                    <div>
                      <h5 className="font-bold text-gray-900 mb-3">준비물</h5>
                      <p>신분증(필수), 편안한 신발(운동화/등산화), 상비약, 계절에 맞는 겉옷, 개인 세면도구 등</p>
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 mb-3">취소 수수료 규정</h5>
                      <p className="text-xs">
                        · 여행 개시 7일 전까지 취소 시 : 전액 환불<br/>
                        · 여행 개시 3일 전까지 취소 시 : 총 상품가의 50% 환불<br/>
                        · 여행 개시 당일 취소 시 : 환불 불가
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-1 space-y-6">
            <div className="sticky top-[100px] space-y-6">
              <DestinationInfo location={pkg.island} />
              
              <div className="bg-white border-2 border-[var(--color-sky-blue)]/20 rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-[var(--color-sky-blue)]/5 p-6 border-b border-blue-50">
                  <span className="text-xs text-[var(--color-sky-blue-dark)] font-bold block mb-1">성인 1인 기준</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-gray-900">{pkg.price.toLocaleString()}</span>
                    <span className="text-lg font-bold text-gray-900">원</span>
                  </div>
                </div>

                <div className="p-6 md:p-8 space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">여행지</span>
                      <span className="font-bold text-gray-900">{pkg.island}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">기간</span>
                      <span className="font-bold text-gray-900">{pkg.duration}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">최소인원</span>
                      <span className="font-bold text-gray-900">2명</span>
                    </div>
                  </div>

                  {!showReservationForm ? (
                    <button 
                      onClick={() => setShowReservationForm(true)}
                      className="w-full bg-[var(--color-sky-blue)] hover:bg-[var(--color-sky-blue-dark)] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-1"
                    >
                      실시간 예약 하기
                    </button>
                  ) : (
                    <div className="bg-gray-50 p-4 rounded-2xl animate-in fade-in slide-in-from-top-4">
                      <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
                        <h3 className="font-bold text-gray-900">예약 문의</h3>
                        <button onClick={() => setShowReservationForm(false)} className="text-gray-400 hover:text-gray-600">
                          <X size={18} />
                        </button>
                      </div>
                      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('예약 문의가 접수되었습니다. 담당자가 곧 연락드리겠습니다.'); setShowReservationForm(false); }}>
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">성함</label>
                          <input type="text" required placeholder="홍길동" className="w-full bg-white px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)] text-sm" />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">연락처</label>
                          <input type="tel" required placeholder="010-0000-0000" className="w-full bg-white px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)] text-sm" />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">날짜</label>
                            <input type="date" required className="w-full bg-white px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)] text-xs" />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">인원</label>
                            <input type="number" min="1" defaultValue="2" required className="w-full bg-white px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)] text-sm" />
                          </div>
                        </div>
                        <button type="submit" className="w-full bg-gray-900 hover:bg-black text-white py-3 rounded-xl font-bold transition-all shadow-md">
                          접수하기
                        </button>
                      </form>
                    </div>
                  )}

                  <div className="pt-2">
                    <div className="flex items-center gap-2 p-3 bg-red-50 rounded-xl">
                      <AlertCircle className="text-red-500" size={16} />
                      <p className="text-[10px] text-red-700 leading-tight">패키지 특성상 기상 악화 시 일정이 취소될 수 있습니다.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Share/Like Bottom Mobile (Hidden on Desktop) */}
              <div className="lg:hidden flex gap-2">
                 <button className="flex-1 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold flex items-center justify-center gap-2">
                   <Share2 size={16} /> 공유
                 </button>
                 <button className="flex-1 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold flex items-center justify-center gap-2">
                   <Heart size={16} /> 찜하기
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLightboxOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            >
              <button 
                onClick={() => setIsLightboxOpen(false)}
                className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors"
              >
                <X size={32} />
              </button>
              <img 
                src={lightboxImage} 
                alt="Enlarged view" 
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                referrerPolicy="no-referrer"
              />
              {/* Image Selector inside Lightbox */}
              <div className="mt-6 flex gap-2 overflow-x-auto pb-2 px-4 max-w-full">
                {[pkg.image, ...(pkg.gallery || [])].map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setLightboxImage(img)}
                    className={cn(
                      "flex-shrink-0 w-16 h-12 rounded-md overflow-hidden border-2 transition-all",
                      lightboxImage === img ? "border-[var(--color-sky-blue)]" : "border-white/20 hover:border-white/50"
                    )}
                  >
                    <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
