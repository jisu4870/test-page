import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Gift, Clock, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface PromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAction: () => void;
}

export default function PromotionModal({ isOpen, onClose, onAction }: PromotionModalProps) {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleClose = () => {
    if (dontShowAgain) {
      const expiry = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours
      localStorage.setItem('promo_hidden_until', expiry.toString());
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Close Button */}
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors"
          >
            <X size={20} />
          </button>

          {/* Banner Image Content */}
          <div className="relative h-64 bg-[var(--color-sky-blue)] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Weekend Special"
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500 text-[10px] font-extrabold uppercase tracking-widest rounded-full mb-3 shadow-lg animate-pulse">
                <Clock size={12} /> Only This Weekend
              </div>
              <h2 className="text-3xl md:text-4xl font-black leading-tight mb-2 flex flex-col">
                <span>주말특가</span>
                <span className="text-yellow-400">역대급 찬스!</span>
              </h2>
              <p className="text-sm text-white/90 font-medium">
                덕적도 & 소야도 패키지를 특별한 가격으로 만나보세요.
              </p>
            </div>
          </div>

          {/* Promotions Details */}
          <div className="p-6 md:p-8 space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 transition-colors hover:bg-white hover:shadow-md">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">전 패키지 최대 30% 할인</h3>
                  <p className="text-xs text-gray-500 mt-0.5">인천 연안부두 출발 전 노선 주말 특가 적용</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 transition-colors hover:bg-white hover:shadow-md">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 shrink-0">
                  <Gift size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">선착순 50명 특별 기프트</h3>
                  <p className="text-xs text-gray-500 mt-0.5">섬 여행 필수템 웰컴 키트 증정</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button 
                onClick={() => {
                  onAction();
                  handleClose();
                }}
                className="w-full bg-[var(--color-navy)] hover:bg-[var(--color-navy-light)] text-white py-4 rounded-xl font-black text-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-[0.98]"
              >
                지금 특가 확인하기
                <ArrowRight size={20} />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 pt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={dontShowAgain}
                    onChange={(e) => setDontShowAgain(e.target.checked)}
                  />
                  <div className="w-4 h-4 border-2 border-gray-300 rounded peer-checked:bg-[var(--color-sky-blue)] peer-checked:border-[var(--color-sky-blue)] transition-all" />
                  <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100">
                    <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                  </div>
                </div>
                <span className="text-xs text-gray-400 font-medium group-hover:text-gray-600 transition-colors">오늘 하루 보지 않기</span>
              </label>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
