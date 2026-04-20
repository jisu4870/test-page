import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, X, Camera } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';

import ReactMarkdown from 'react-markdown';

export default function MagazineDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { magazines } = useAppContext();
  
  const post = magazines.find(m => m.id === id);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">게시글을 찾을 수 없습니다.</h2>
          <button onClick={() => navigate(-1)} className="text-[var(--color-sky-blue)] hover:underline">
            이전 페이지로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const openLightbox = (imgUrl: string) => {
    setLightboxImage(imgUrl);
    setIsLightboxOpen(true);
  };

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="text-gray-500 flex items-center gap-2 mb-8 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} /> 목록으로
        </button>

        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-4">
            <span className="text-[var(--color-sky-blue)] font-medium px-3 py-1 bg-blue-50 rounded-full">{post.category}</span>
            <span>{post.date}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {post.title}
          </h1>
        </div>

        <div 
          className="rounded-2xl overflow-hidden mb-12 h-[50vh] cursor-zoom-in relative group"
          onClick={() => openLightbox(post.image)}
        >
          <img 
            src={post.image} 
            alt={post.title} 
            referrerPolicy="no-referrer" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <Camera className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={48} />
          </div>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 leading-loose">
          <ReactMarkdown
            components={{
              img: ({ node, ...props }) => (
                <div 
                  className="cursor-zoom-in relative group" 
                  onClick={() => openLightbox(props.src || '')}
                >
                  <img 
                    {...props} 
                    referrerPolicy="no-referrer" 
                    className="rounded-2xl shadow-md my-8 w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" 
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors rounded-2xl" />
                </div>
              ),
              h3: ({ node, ...props }) => (
                <h3 {...props} className="text-2xl font-bold text-gray-900 mt-12 mb-6" />
              ),
              p: ({ node, ...props }) => (
                <p {...props} className="mb-6 whitespace-pre-wrap" />
              )
            }}
          >
            {post.content}
          </ReactMarkdown>
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
                alt="Enlarged magazine view" 
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
