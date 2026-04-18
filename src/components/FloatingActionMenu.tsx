import React, { useState, useEffect } from 'react';
import { ChevronUp, MessageCircle, Home, Clock, X, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useAppContext } from '../context/AppContext';

interface FloatingActionMenuProps {
  onToggleChat: () => void;
  isChatOpen: boolean;
}

export default function FloatingActionMenu({ onToggleChat, isChatOpen }: FloatingActionMenuProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showRecent, setShowRecent] = useState(false);
  const navigate = useNavigate();
  const { recentlyViewed, packages } = useAppContext();

  const recentPackages = recentlyViewed.map(id => packages.find(p => p.id === id)).filter(Boolean);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setShowRecent(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={cn(
      "fixed bottom-8 right-8 z-[60] flex flex-col items-end gap-3 transition-all duration-300 transform",
      isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
    )}>
      {/* Recently Viewed Panel */}
      {showRecent && (
        <div className="mb-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-64 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Clock size={14} className="text-[var(--color-sky-blue)]" /> 최근 본 여행
            </h4>
            <button onClick={() => setShowRecent(false)} className="text-gray-400 hover:text-gray-600">
              <X size={16} />
            </button>
          </div>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {recentPackages.length > 0 ? (
              recentPackages.map((pkg) => (
                <div 
                  key={pkg!.id} 
                  onClick={() => {
                    navigate(`/package/${pkg!.id}`);
                    setShowRecent(false);
                  }}
                  className="flex gap-3 cursor-pointer group hover:bg-gray-50 p-2 rounded-xl transition-colors"
                >
                  <img 
                    src={pkg!.image} 
                    alt={pkg!.title} 
                    className="w-12 h-12 rounded-lg object-cover shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 overflow-hidden">
                    <p className="text-xs font-bold text-gray-900 line-clamp-1 group-hover:text-[var(--color-sky-blue)] transition-colors">
                      {pkg!.title}
                    </p>
                    <p className="text-[10px] text-gray-500">{pkg!.price.toLocaleString()}원</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-center py-6 text-gray-400">최근 본 상품이 없습니다.</p>
            )}
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div className="flex flex-col gap-2 mb-2">
        <button 
          onClick={onToggleChat}
          className={cn(
            "w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all group relative border-2",
            isChatOpen 
              ? "bg-[var(--color-sky-blue)] text-white border-[var(--color-sky-blue)]" 
              : "bg-white text-[var(--color-sky-blue)] border-[var(--color-sky-blue)] hover:bg-blue-50"
          )}
          title="AI 상담"
        >
          <Bot size={28} className="group-hover:scale-110 transition-transform" />
          {!isChatOpen && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full animate-bounce shadow-sm">
              AI
            </span>
          )}
        </button>

        <button 
          onClick={() => navigate('/')}
          className="w-12 h-12 bg-white text-gray-700 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all border border-gray-100 group"
          title="Home"
        >
          <Home size={20} className="group-hover:scale-110 transition-transform" />
        </button>
        
        <button 
          onClick={() => setShowRecent(!showRecent)}
          className={cn(
            "w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all group relative border",
            showRecent ? "bg-gray-100 text-[var(--color-sky-blue)] border-gray-200" : "bg-white text-gray-700 border-gray-100 hover:bg-gray-50"
          )}
          title="Recent Views"
        >
          <Clock size={20} className="group-hover:scale-110 transition-transform" />
          {recentlyViewed.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-gray-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-sm">
              {recentlyViewed.length}
            </span>
          )}
        </button>
      </div>

      {/* Scroll Top Button */}
      <button 
        onClick={scrollToTop}
        className="w-12 h-12 bg-[var(--color-sky-blue)] text-white rounded-full shadow-xl flex items-center justify-center hover:bg-[var(--color-sky-blue-dark)] transition-all transform hover:-translate-y-1 active:scale-95"
        title="Scroll to Top"
      >
        <ChevronUp size={24} />
      </button>
    </div>
  );
}
