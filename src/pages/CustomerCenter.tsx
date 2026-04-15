import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function CustomerCenter() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('notice');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab && ['notice', 'faq', 'reservation', 'terms'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [location]);

  const tabs = [
    { id: 'notice', label: '공지사항' },
    { id: 'faq', label: '자주묻는질문' },
    { id: 'reservation', label: '예약확인/취소' },
    { id: 'terms', label: '여행약관' },
  ];

  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">고객센터</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-grow bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 px-6 text-center font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id 
                    ? 'text-[var(--color-sky-blue)] border-b-2 border-[var(--color-sky-blue)]' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-8 min-h-[400px]">
            {activeTab === 'notice' && (
              <div>
                <h2 className="text-xl font-bold mb-6">공지사항</h2>
                <ul className="divide-y divide-gray-100 border-t border-gray-100">
                  <li className="py-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 px-2 rounded">
                    <span className="text-gray-800">[안내] 2026년 하계 성수기 예약 오픈 안내</span>
                    <span className="text-gray-400 text-sm">2026.04.10</span>
                  </li>
                  <li className="py-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 px-2 rounded">
                    <span className="text-gray-800">[이벤트] 온섬투어 신규 회원가입 프로모션</span>
                    <span className="text-gray-400 text-sm">2026.03.25</span>
                  </li>
                  <li className="py-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 px-2 rounded">
                    <span className="text-gray-800">[안내] 기상 악화 시 투어 취소 및 환불 규정 안내</span>
                    <span className="text-gray-400 text-sm">2026.02.15</span>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === 'faq' && (
              <div>
                <h2 className="text-xl font-bold mb-6">자주묻는질문</h2>
                <div className="space-y-4">
                  <details className="group border border-gray-200 rounded-lg">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4">
                      <span>Q. 예약 취소 시 환불 규정은 어떻게 되나요?</span>
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                      </span>
                    </summary>
                    <p className="text-gray-600 mt-3 group-open:animate-fadeIn p-4 pt-0 border-t border-gray-100">
                      여행 출발일 30일 전까지 취소 시 전액 환불되며, 이후 기간에 따라 위약금이 발생합니다. 자세한 내용은 여행약관을 참고해 주시기 바랍니다.
                    </p>
                  </details>
                  <details className="group border border-gray-200 rounded-lg">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4">
                      <span>Q. 기상 악화로 배가 결항되면 어떻게 되나요?</span>
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                      </span>
                    </summary>
                    <p className="text-gray-600 mt-3 group-open:animate-fadeIn p-4 pt-0 border-t border-gray-100">
                      천재지변 및 기상 악화로 인한 선박 결항 시 전액 환불해 드립니다. 단, 현지 체류 중 결항 시 발생하는 추가 숙박비 등은 고객님 부담입니다.
                    </p>
                  </details>
                </div>

                {/* Inquiry Form */}
                <div className="mt-16 pt-12 border-t border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">1:1 문의하기</h3>
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => { e.preventDefault(); alert('문의가 접수되었습니다. 빠른 시일 내에 답변 드리겠습니다.'); }}>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">성함</label>
                      <input type="text" required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)]/50" placeholder="성함을 입력해주세요" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">연락처</label>
                      <input type="tel" required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)]/50" placeholder="연락처를 입력해주세요" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-medium text-gray-700">문의 내용</label>
                      <textarea required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)]/50 h-32 resize-none" placeholder="문의하실 내용을 상세히 적어주세요"></textarea>
                    </div>
                    <div className="md:col-span-2">
                      <button type="submit" className="w-full bg-[var(--color-sky-blue)] hover:bg-[var(--color-sky-blue-dark)] text-white py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl active:scale-[0.98]">
                        문의 접수하기
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'reservation' && (
              <div>
                <h2 className="text-xl font-bold mb-6">예약확인/취소</h2>
                <div className="bg-gray-50 p-6 rounded-xl max-w-md mx-auto mt-8">
                  <p className="text-center text-gray-600 mb-6">예약 시 입력하신 정보를 입력해 주세요.</p>
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('예약 내역이 없습니다.'); }}>
                    <input type="text" placeholder="예약자명" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)]" />
                    <input type="tel" placeholder="연락처 (숫자만 입력)" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)]" />
                    <button type="submit" className="w-full bg-[var(--color-sky-blue)] hover:bg-[var(--color-sky-blue-dark)] text-white py-3 rounded-lg font-bold transition-colors">
                      조회하기
                    </button>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'terms' && (
              <div>
                <h2 className="text-xl font-bold mb-6">여행약관</h2>
                <div className="h-64 overflow-y-auto border border-gray-200 p-4 rounded-lg text-sm text-gray-600 leading-relaxed bg-gray-50">
                  <h3 className="font-bold text-gray-800 mb-2">제1조 (목적)</h3>
                  <p className="mb-4">이 약관은 온섬투어(이하 "당사"라 한다)와 여행자가 체결한 국내여행계약의 세부 이행 및 준수사항을 정함을 목적으로 합니다.</p>
                  <h3 className="font-bold text-gray-800 mb-2">제2조 (당사와 여행자 의무)</h3>
                  <p className="mb-4">1. 당사는 여행자에게 안전하고 만족스러운 여행서비스를 제공하기 위하여 여행알선 및 안내, 운송, 숙박 등 여행계획의 수립 및 실행과정에서 맡은 바 임무를 충실히 수행하여야 합니다.</p>
                  <p className="mb-4">2. 여행자는 안전하고 즐거운 여행을 위하여 여행자간 화합도모 및 당사의 여행인솔자의 지시에 순응하여야 합니다.</p>
                  {/* Add more terms as needed */}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Contact Info */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm p-6 space-y-8 sticky top-24">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">온섬투어 고객센터</h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">여행 상담센터</p>
                  <p className="text-xl font-bold text-[var(--color-sky-blue-dark)]">1544-5252</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">부산/대구출발 여행상담</p>
                  <p className="text-xl font-bold text-gray-900">1544-6722</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">기업행사/출장문의</p>
                  <p className="text-xl font-bold text-gray-900">1661-4873</p>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">고객센터</p>
                  <p className="text-xl font-bold text-gray-900">080-850-5252</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-xl">
              <p className="text-xs text-gray-600 leading-relaxed">
                평일 09:00 - 18:00<br/>
                (주말/공휴일 휴무)
              </p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
