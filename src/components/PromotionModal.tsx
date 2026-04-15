import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function PromotionModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hideUntil = localStorage.getItem('hidePromotionUntil');
    const now = new Date().getTime();
    
    if (!hideUntil || now > parseInt(hideUntil)) {
      // Show after a small delay for better UX
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleHideToday = () => {
    const tomorrow = new Date();
    tomorrow.setHours(24, 0, 0, 0);
    localStorage.setItem('hidePromotionUntil', tomorrow.getTime().toString());
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-none overflow-hidden shadow-2xl max-w-sm w-full relative"
          >
            {/* Close button for top right */}
            <button 
              onClick={handleClose} 
              className="absolute top-4 right-4 z-10 p-2 bg-black/10 hover:bg-black/20 text-white rounded-none transition-colors"
            >
              <X size={20} />
            </button>

            <div className="relative h-64 bg-gradient-to-br from-[var(--color-sky-blue)] to-[var(--color-sky-blue-dark)] flex flex-col items-center justify-center text-white p-8 text-center">
              <h2 className="text-3xl font-bold mb-4 leading-tight">신규 회원<br/>10% 할인 쿠폰</h2>
              <p className="text-white/80 text-sm font-light">지금 가입하고 첫 섬 여행<br/>특별한 혜택을 받아보세요!</p>
            </div>
            
            <div className="p-8">
              <button 
                onClick={handleClose}
                className="w-full bg-[var(--color-sky-blue)] hover:bg-[var(--color-sky-blue-dark)] text-white py-4 rounded-none font-bold transition-all hover:shadow-lg active:scale-[0.98] mb-6"
              >
                쿠폰 받으러 가기
              </button>
              
              <div className="flex justify-between items-center text-sm text-gray-400">
                <button 
                  onClick={handleHideToday} 
                  className="hover:text-gray-600 transition-colors flex items-center gap-1"
                >
                  오늘은 그만보기
                </button>
                <button 
                  onClick={handleClose} 
                  className="hover:text-gray-600 transition-colors font-medium"
                >
                  닫기
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
