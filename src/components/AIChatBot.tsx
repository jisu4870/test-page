import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: '안녕하세요! 온섬투어 AI 상담사입니다. 무엇을 도와드릴까요?' }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      let botResponse = "죄송합니다. 현재 상세 상담은 준비 중입니다. 고객센터(080-850-5252)로 문의주시면 친절히 안내해 드리겠습니다.";
      
      if (input.includes('할인')) {
        botResponse = "현재 신규 회원 가입 시 10% 할인 쿠폰을 드리고 있습니다! 또한 신한카드 결제 시 5% 추가 할인 혜택도 있으니 확인해 보세요.";
      } else if (input.includes('울릉도')) {
        botResponse = "울릉도 패키지는 럭셔리 크루즈와 코스모스 리조트 숙박이 포함된 VIP 코스가 가장 인기가 많습니다. 상세 페이지에서 일정을 확인해 보시겠어요?";
      } else if (input.includes('예약')) {
        botResponse = "예약은 원하시는 상품 상세 페이지에서 '예약하기' 버튼을 통해 진행하실 수 있습니다.";
      }

      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[60] w-16 h-16 bg-[var(--color-sky-blue)] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform group"
      >
        <MessageSquare size={28} className="group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-bounce">AI</span>
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100, x: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100, x: 50 }}
            className="fixed bottom-28 right-8 z-[70] w-[360px] h-[500px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-[var(--color-sky-blue)] p-6 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-bold">온섬 AI 상담사</h3>
                  <p className="text-xs text-white/70">24시간 자동 상담 서비스</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-lg transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-4 bg-gray-50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-[var(--color-sky-blue)] text-white rounded-tr-none' 
                      : 'bg-white text-gray-800 shadow-sm rounded-tl-none border border-gray-100'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="궁금한 점을 물어보세요..."
                className="flex-grow bg-gray-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)]/50"
              />
              <button
                onClick={handleSend}
                className="bg-[var(--color-sky-blue)] text-white p-2 rounded-xl hover:bg-[var(--color-sky-blue-dark)] transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
