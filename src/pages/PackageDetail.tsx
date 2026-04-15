import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Calendar, Users, CheckCircle, ArrowLeft, Ship } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function PackageDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { packages } = useAppContext();
  
  const pkg = packages.find(p => p.id === id);
  const [showReservationForm, setShowReservationForm] = useState(false);

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
    <div className="pt-20 pb-24 bg-white">
      {/* Hero Image */}
      <div className="relative h-[60vh] w-full">
        <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-7xl mx-auto">
          <button 
            onClick={() => navigate(-1)}
            className="text-white flex items-center gap-2 mb-6 hover:text-gray-200 transition-colors"
          >
            <ArrowLeft size={20} /> 목록으로
          </button>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-[var(--color-sky-blue)] text-white px-3 py-1 rounded-full text-sm font-medium">
              {pkg.island}
            </span>
            <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium">
              {pkg.duration}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {pkg.title}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">상품 설명</h2>
              <div className="text-gray-600 leading-relaxed text-lg space-y-4">
                {pkg.description.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </section>

            {pkg.gallery && pkg.gallery.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">갤러리</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {pkg.gallery.map((imgUrl, idx) => (
                    <div key={idx} className="relative h-48 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <img src={imgUrl} alt={`${pkg.title} 갤러리 ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {pkg.ferryInfo && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Ship className="text-[var(--color-sky-blue)]" /> 탑승 배편 안내
                </h2>
                <div className="bg-blue-50 p-6 rounded-xl text-gray-700 leading-relaxed space-y-2">
                  {pkg.ferryInfo.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </section>
            )}

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">여행 일정</h2>
              <div className="space-y-8">
                {pkg.itinerary.map((item, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-blue-50 text-[var(--color-sky-blue-dark)] flex items-center justify-center font-bold text-lg shrink-0">
                        {item.day}일
                      </div>
                      {index !== pkg.itinerary.length - 1 && (
                        <div className="w-px h-full bg-gray-200 my-2"></div>
                      )}
                    </div>
                    <div className="pb-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                      <div className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl space-y-2">
                        {item.description.split('\n').map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white border border-gray-100 rounded-2xl shadow-xl p-6 md:p-8">
              <div className="mb-6 pb-6 border-b border-gray-100">
                <span className="text-sm text-gray-500 block mb-1">1인 기준</span>
                <div className="text-3xl font-bold text-gray-900">
                  {pkg.price.toLocaleString()}원
                </div>
              </div>

              <div className="space-y-4 mb-8 text-gray-600">
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-[var(--color-sky-blue)]" />
                  <span>목적지: {pkg.island}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-[var(--color-sky-blue)]" />
                  <span>기간: {pkg.duration}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users size={20} className="text-[var(--color-sky-blue)]" />
                  <span>최소 출발 인원: 2명</span>
                </div>
              </div>

              {!showReservationForm ? (
                <button 
                  onClick={() => setShowReservationForm(true)}
                  className="w-full bg-[var(--color-sky-blue)] hover:bg-[var(--color-sky-blue-dark)] text-white py-4 rounded-xl font-bold text-lg transition-colors"
                >
                  예약 문의하기
                </button>
              ) : (
                <div className="bg-gray-50 p-4 rounded-xl animate-in fade-in slide-in-from-bottom-4">
                  <h3 className="font-bold text-gray-900 mb-4">예약 정보 입력</h3>
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('예약 문의가 접수되었습니다. 담당자가 곧 연락드리겠습니다.'); setShowReservationForm(false); }}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">성함</label>
                      <input type="text" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
                      <input type="tel" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">희망 날짜</label>
                      <input type="date" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">인원</label>
                      <input type="number" min="1" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)]" />
                    </div>
                    <button type="submit" className="w-full bg-gray-900 hover:bg-black text-white py-3 rounded-lg font-bold transition-colors mt-4">
                      문의 접수
                    </button>
                    <button type="button" onClick={() => setShowReservationForm(false)} className="w-full text-gray-500 py-2 text-sm hover:text-gray-700">
                      취소
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
