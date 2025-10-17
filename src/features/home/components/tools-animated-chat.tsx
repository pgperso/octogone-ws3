"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { toolsConversations, TOOLS_TIMING, type ToolMessage } from "../data/tools-conversations";

const FALLBACK_AVATAR = "/images/avatars/marc.avif";
const FALLBACK_CORTEX = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z' fill='%23374151'/%3E%3C/svg%3E";

interface ToolsAnimatedChatProps {
  locale: string;
}

export default function ToolsAnimatedChat({ locale }: ToolsAnimatedChatProps) {
  const [currentConversationIndex, setCurrentConversationIndex] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState<ToolMessage[]>([]);
  const [isPlaying] = useState(true);
  const [, setHasError] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAnimatingOpen, setIsAnimatingOpen] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isEnglish = locale === 'en';
  
  const currentConversations = useMemo(() => {
    return toolsConversations?.[isEnglish ? 'en' : 'fr'] || [];
  }, [isEnglish]);
  
  const currentConversation = currentConversations[currentConversationIndex];
  
  const cleanupTimeouts = useCallback((timeouts: NodeJS.Timeout[]) => {
    timeouts.forEach(timeout => clearTimeout(timeout));
  }, []);

  // Auto-scroll vers le bas quand un nouveau message apparaît
  useEffect(() => {
    if (chatContainerRef.current && isChatOpen) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [visibleMessages, isChatOpen]);

  // Ouvrir le chat automatiquement après un délai
  useEffect(() => {
    if (!isClient) return;
    
    const openTimer = setTimeout(() => {
      setIsAnimatingOpen(true);
      setTimeout(() => setIsChatOpen(true), 100);
    }, 2000); // Ouvre après 2 secondes

    return () => clearTimeout(openTimer);
  }, [isClient, currentConversationIndex]);

  // Fermer le chat et passer à la conversation suivante
  const handleCloseChat = useCallback(() => {
    setIsChatOpen(false);
    setIsAnimatingOpen(false);
    setVisibleMessages([]);
    
    setTimeout(() => {
      setCurrentConversationIndex((prev) => 
        (prev + 1) % currentConversations.length
      );
    }, 1000);
  }, [currentConversations.length]);

  useEffect(() => {
    if (!isPlaying || !isClient || !currentConversation?.messages) return;

    try {
      setVisibleMessages([]);
      setHasError(false);

      const timeouts: NodeJS.Timeout[] = [];
      
      currentConversation.messages.forEach((message) => {
        if (!message || typeof message.delay !== 'number') return;
        
        const timeout = setTimeout(() => {
          setVisibleMessages(prev => [...prev, message]);
        }, Math.max(0, message.delay));
        timeouts.push(timeout);
      });

      const lastMessage = currentConversation.messages[currentConversation.messages.length - 1];
      if (lastMessage && typeof lastMessage.delay === 'number') {
        const totalTime = lastMessage.delay + (TOOLS_TIMING?.messageDisplay || 4000) + 2000;

        const closeTimeout = setTimeout(() => {
          handleCloseChat();
        }, totalTime);
        timeouts.push(closeTimeout);
      }

      return () => cleanupTimeouts(timeouts);
    } catch (_error) {
      console.warn('ToolsAnimatedChat error:', _error);
      setHasError(true);
    }
  }, [currentConversationIndex, isPlaying, currentConversations, currentConversation, isClient, cleanupTimeouts, handleCloseChat]);

  if (!currentConversation || !currentConversations.length) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center" style={{ color: 'var(--on-surface-variant)' }}>
        <p>{isEnglish ? 'Chat temporarily unavailable' : 'Chat temporairement indisponible'}</p>
      </div>
    );
  }

  const dashboardImage = isEnglish ? '/dashboard_en.avif' : '/dashboard_fr.avif';

  return (
    <div className="relative w-full h-full">
      {/* Dashboard en arrière-plan */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url('${dashboardImage}')`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Bouton flottant Cortex */}
      <AnimatePresence>
        {!isChatOpen && !isAnimatingOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              setIsAnimatingOpen(true);
              setTimeout(() => setIsChatOpen(true), 100);
            }}
            className="absolute bottom-6 right-6 w-16 h-16 rounded-2xl shadow-2xl flex items-center justify-center"
            style={{
              backgroundColor: 'var(--secondary-container)',
              border: '2px solid white',
              zIndex: 10
            }}
          >
            <Image
              src="/cortex.svg"
              alt="Cortex"
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat popup */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 m-4 rounded-2xl shadow-2xl overflow-hidden"
            style={{
              backgroundColor: 'var(--surface)',
              zIndex: 20
            }}
          >
            {/* Header du chat */}
            <div 
              className="flex items-center justify-between px-6 py-4"
              style={{
                background: 'linear-gradient(135deg, #BADFF6 0%, #E2CDED 100%)',
                borderBottom: '1px solid var(--outline-variant)'
              }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ 
                    backgroundColor: 'var(--secondary-container)',
                    border: '2px solid white'
                  }}
                >
                  <Image
                    src="/cortex.svg"
                    alt="Cortex"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: 'var(--on-surface)' }}>
                    Cortex
                  </h3>
                  <p className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>
                    {isEnglish ? 'Intelligent Assistant' : 'Assistant intelligent'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseChat}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors"
                style={{ color: 'var(--on-surface-variant)' }}
              >
                ✕
              </button>
            </div>

            {/* Contenu du chat avec scroll */}
            <div 
              ref={chatContainerRef}
              className="overflow-y-auto overflow-x-hidden p-6"
              style={{ 
                height: 'calc(100% - 72px)',
                scrollbarWidth: 'thin',
                scrollbarColor: '#cbd5e0 transparent'
              }}
            >
              <AnimatePresence mode="wait">
                <div key={currentConversation.id} className="space-y-4">
          {visibleMessages.map((message, index) => (
          <motion.div
            key={`conv-${currentConversation.id}-msg-${index}`}
            initial={{ opacity: 0, x: message.type === 'user' ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="w-full motion-element"
          >
            <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} items-start gap-3 mb-2`}>
              {message.type === 'cortex' && (
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ 
                    backgroundColor: 'var(--secondary-container)',
                    border: '2px solid white'
                  }}
                >
                  <Image
                    src="/images/cortex.svg"
                    alt="Cortex"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = '<span style="color: var(--on-secondary-container); font-weight: bold;">C</span>';
                      }
                    }}
                  />
                </div>
              )}

              <div className={`flex flex-col ${message.type === 'user' ? 'items-end' : 'items-start'} gap-2 max-w-[80%]`}>
                <div 
                  className="rounded-2xl px-4 py-3"
                  style={{ 
                    backgroundColor: message.type === 'user' ? 'var(--purple_cortex)' : 'var(--secondary-container)',
                    color: message.type === 'user' ? 'var(--on-purple_cortex)' : 'var(--on-secondary-container)'
                  }}
                >
                  <p className="text-sm whitespace-pre-line">
                    {message.text}
                  </p>
                </div>
                
                {message.cta && (
                  <Link 
                    href={`/${locale}${message.cta.link}`}
                    className="group flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200"
                    style={{ 
                      backgroundColor: '#DCB26B',
                      color: '#002236'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#BADFF6';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#DCB26B';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <span className="text-sm font-semibold">{message.cta.label}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                )}
                
                <span className="text-xs px-2" style={{ color: 'var(--on-surface-variant)' }}>
                  11:05
                </span>
              </div>

              {message.type === 'user' && (
                <Image
                  src={currentConversation.userAvatar || FALLBACK_AVATAR}
                  alt={currentConversation.userName || "User"}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = FALLBACK_AVATAR;
                  }}
                />
              )}
            </div>
          </motion.div>
          ))}
                </div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
