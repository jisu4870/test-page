import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Facebook, MessageCircle, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAppContext } from '../context/AppContext';
import AIChatBot from './AIChatBot';
import FloatingActionMenu from './FloatingActionMenu';

export default function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();
  const { settings } = useAppContext();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const headerBg = isHomePage && !isScrolled ? 'bg-transparent text-white' : 'bg-white text-gray-900 shadow-sm';
  const logoColor = isHomePage && !isScrolled ? 'text-white' : 'text-[var(--color-sky-blue)]';

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <AIChatBot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
      <FloatingActionMenu onToggleChat={() => setIsChatOpen(!isChatOpen)} isChatOpen={isChatOpen} />
      {/* Header */}
      <header className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300', headerBg)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-6 flex-1">
              <Link to="/" className={cn('text-2xl font-bold tracking-tighter', logoColor)}>
                온섬투어
              </Link>
              
              {/* Hot Deal LIVE Banner - Near Logo */}
              <div className="pt-1">
                <button 
                  onClick={() => {
                    if (location.pathname !== '/') {
                      window.location.href = '/#live';
                    } else {
                      document.getElementById('live')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={cn(
                    "hidden lg:flex px-4 py-1.5 font-bold text-xs transition-all items-center gap-2 group rounded-full",
                    isHomePage && !isScrolled 
                      ? "bg-white/10 hover:bg-white/20 text-white border border-white/30" 
                      : "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"
                  )}
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                  </span>
                  핫딜LIVE
                </button>
              </div>
            </div>

            {/* Top Right Navigation */}
            <div className="hidden md:flex flex-col items-end flex-1">
              <div className="flex space-x-4 text-[10px] text-gray-400 mb-1">
                <Link to="/login" className="hover:text-[var(--color-sky-blue)]">로그인</Link>
                <span>|</span>
                <Link to="/signup" className="hover:text-[var(--color-sky-blue)]">회원가입</Link>
              </div>
              <nav className="flex space-x-8">
                <button 
                  onClick={() => {
                    if (location.pathname !== '/') {
                      window.location.href = '/#packages';
                    } else {
                      document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="hover:text-[var(--color-sky-blue)] transition-colors font-medium"
                >
                  여행상품
                </button>
                <Link to="/magazine" className="hover:text-[var(--color-sky-blue)] transition-colors font-medium">매거진</Link>
                <Link to="/customer-center" className="hover:text-[var(--color-sky-blue)] transition-colors font-medium">고객센터</Link>
              </nav>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white text-gray-900 shadow-lg absolute top-20 left-0 right-0 border-t border-gray-100">
            <div className="flex flex-col px-4 pt-2 pb-6 space-y-4">
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (location.pathname !== '/') {
                    window.location.href = '/#packages';
                  } else {
                    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="block px-3 py-2 text-base font-medium hover:bg-gray-50 rounded-md text-left"
              >
                여행상품
              </button>
              <Link to="/magazine" className="block px-3 py-2 text-base font-medium hover:bg-gray-50 rounded-md">매거진</Link>
              <Link to="/customer-center" className="block px-3 py-2 text-base font-medium hover:bg-gray-50 rounded-md">고객센터</Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-4">On-Island Tour</h3>
              <p className="mb-4 text-sm leading-relaxed text-gray-400 max-w-md">
                고품격 섬 여행 및 프라이빗 투어 전문 여행사.<br/>
                당신만을 위한 특별한 휴식을 디자인합니다.
              </p>
              <div className="flex space-x-4 mt-6">
                <a href="https://pf.kakao.com/_onislandtour" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <MessageCircle size={20} />
                </a>
                <a href="https://www.instagram.com/onislandtour" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="https://www.facebook.com/onislandtour" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">고객지원</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/customer-center?tab=notice" className="hover:text-white transition-colors">공지사항</Link></li>
                <li><Link to="/customer-center?tab=faq" className="hover:text-white transition-colors">자주묻는질문</Link></li>
                <li><Link to="/customer-center?tab=reservation" className="hover:text-white transition-colors">예약확인/취소</Link></li>
                <li><Link to="/customer-center?tab=terms" className="hover:text-white transition-colors">이용약관</Link></li>
                <li><Link to="/customer-center?tab=privacy" className="hover:text-white transition-colors font-bold text-[var(--color-sky-blue)]">개인정보처리방침</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/magazine" className="hover:text-white transition-colors">인기 매거진</Link></li>
                <li><Link to="/monthly" className="hover:text-white transition-colors">이달의 추천 섬</Link></li>
                <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors text-left w-full">Top으로 이동</button></li>
              </ul>
              <h4 className="text-white font-semibold mb-4 mt-8">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Email: {settings.contactEmail}</li>
                <li>Tel: {settings.contactPhone}</li>
                <li>영업시간: 평일 09:00 - 18:00</li>
              </ul>
              <div className="mt-6 flex gap-4 items-center">
                <Link to="/admin" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
                  관리자
                </Link>
                <span className="text-gray-800">|</span>
                <span className="text-[10px] text-gray-600">v2.4.0</span>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-xs text-gray-500 leading-relaxed">
            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
              <span>(주)온섬투어네트워크</span>
              <span>|</span>
              <span>대표이사 김정하</span>
              <span>|</span>
              <span>사업자등록번호 202-81-49245</span>
              <span>|</span>
              <span>통신판매업신고번호 계양구 제03900호</span>
              <span>|</span>
              <span>호스팅 업체 (주)온섬투어네트워크</span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
              <span>관광사업자 등록번호 2026-04(인천광역시 계양구)</span>
              <span>|</span>
              <span>영업여행업보증 15억 1천만원</span>
              <span>|</span>
              <span>기획여행영업보증 7억원</span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-6">
              <span>상담문의 032-540-0208</span>
              <span>|</span>
              <span>팩스 032-552-4100</span>
              <span>|</span>
              <span>주소 인천광역시 계양구 계양산로 63</span>
            </div>
            
            <div className="mb-6">
              <button className="underline hover:text-gray-300">사업자정보확인</button>
            </div>

            <div className="space-y-1 mb-8">
              <p>※ 부득이한 사정에 의해 확정된 여행일정이 변경되는 경우 여행자의 사전 동의를 받습니다.</p>
              <p>※ 온섬투어의 법인계좌 또는 가상계좌가 아닌 다른 계좌로 입금하신 경우 발생하는 피해에 관하여, 당사는 책임지지 않습니다. 타 계좌의 입금을 유도하는 행위가 발생하는 경우 반드시 온섬투어 고객센터로 문의하거나 신고하여 주시기 바랍니다.</p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
              <p>COPYRIGHT ONISLANDTOUR. ALL RIGHTS RESERVED.</p>
              <div className="mt-4 md:mt-0 space-x-4">
                <a href="#" className="hover:text-gray-300">개인정보처리방침</a>
                <a href="#" className="hover:text-gray-300">이용약관</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
