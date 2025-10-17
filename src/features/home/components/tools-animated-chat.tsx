"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { toolsConversations, TOOLS_TIMING, type ToolMessage } from "../data/tools-conversations";

const FALLBACK_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23e5e7eb'/%3E%3Cpath d='M20 20a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm0 2c-4 0-12 2-12 6v4h24v-4c0-4-8-6-12-6z' fill='%23374151'/%3E%3C/svg%3E";
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
        const totalTime = lastMessage.delay + (TOOLS_TIMING?.messageDisplay || 4000) + (TOOLS_TIMING?.conversationPause || 3000);

        const nextTimeout = setTimeout(() => {
          setCurrentConversationIndex((prev) => 
            (prev + 1) % Math.max(1, currentConversations.length)
          );
        }, totalTime);
        timeouts.push(nextTimeout);
      }

      return () => cleanupTimeouts(timeouts);
    } catch (_error) {
      console.warn('ToolsAnimatedChat error:', _error);
      setHasError(true);
    }
  }, [currentConversationIndex, isPlaying, currentConversations, currentConversation, isClient, cleanupTimeouts]);

  if (!currentConversation || !currentConversations.length) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center" style={{ color: 'var(--on-surface-variant)' }}>
        <p>{isEnglish ? 'Chat temporarily unavailable' : 'Chat temporairement indisponible'}</p>
      </div>
    );
  }

  const maxMessages = currentConversations.length > 0 
    ? Math.max(...currentConversations.map(conv => conv?.messages?.length || 0))
    : 0;
  const estimatedHeight = Math.max(400, maxMessages * 150 + 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6 motion-container" style={{ minHeight: `${estimatedHeight}px` }}>
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
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #BADFF6 0%, #E2CDED 100%)' }}
                >
                  <div style={{ filter: 'brightness(0) saturate(100%)' }}>
                    <Image
                      src="/cortex.svg"
                      alt="Cortex"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                      style={{ color: 'var(--on-secondary-container)' }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = FALLBACK_CORTEX;
                      }}
                    />
                  </div>
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
                  src="/avatar.jpg"
                  alt="User"
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
  );
}
