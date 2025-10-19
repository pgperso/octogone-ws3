"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Send, Maximize2, Minimize2 } from "lucide-react";
import { toolsConversations, TOOLS_TIMING, type ToolMessage } from "../data/tools-conversations";
import InlineChart from "./inline-chart";
import InlineDocument from "./inline-document";
import InlineVideo from "./inline-video";
import InlineProgress from "./inline-progress";

const FALLBACK_AVATAR = "/images/avatars/marc.avif";

interface ToolsAnimatedChatProps {
  locale: string;
  onKeyConceptChange?: (concept: string) => void;
}

export default function ToolsAnimatedChat({ locale, onKeyConceptChange }: ToolsAnimatedChatProps) {
  const [currentConversationIndex, setCurrentConversationIndex] = useState(0);
  const [conversationKey, setConversationKey] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState<ToolMessage[]>([]);
  const [isPlaying] = useState(true);
  const [, setHasError] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [chatSize, setChatSize] = useState<'closed' | 'small' | 'large'>('closed');
  const [isAnimatingOpen, setIsAnimatingOpen] = useState(false);
  const [typingText, setTypingText] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isEnglish = locale === 'en';
  const [isMobile, setIsMobile] = useState(false);

  // Détecter si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const currentConversations = useMemo(() => {
    const conversations = toolsConversations?.[isEnglish ? 'en' : 'fr'] || [];
    return conversations.sort((a, b) => a.id - b.id);
  }, [isEnglish]);
  
  const currentConversation = currentConversations[currentConversationIndex];
  
  const cleanupTimeouts = useCallback((timeouts: NodeJS.Timeout[]) => {
    timeouts.forEach(timeout => clearTimeout(timeout));
  }, []);

  // Auto-scroll vers le bas quand un nouveau message apparaît
  useEffect(() => {
    if (chatContainerRef.current && chatSize !== 'closed') {
      // Petit délai pour laisser le contenu se rendre avant de scroller
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTo({
            top: chatContainerRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [visibleMessages, chatSize]);

  // Ouvrir le chat automatiquement après un délai (small sur desktop, large sur mobile)
  useEffect(() => {
    if (!isClient || chatSize !== 'closed') return;
    
    const openTimer = setTimeout(() => {
      setIsAnimatingOpen(true);
      setTimeout(() => setChatSize(isMobile ? 'large' : 'small'), 100);
    }, 2000); // Ouvre après 2 secondes

    return () => clearTimeout(openTimer);
  }, [isClient, currentConversationIndex, chatSize, isMobile]);

  // Fermer le chat et passer à la conversation suivante
  const handleCloseChat = useCallback(() => {
    setChatSize('closed');
    setIsAnimatingOpen(false);
    setVisibleMessages([]);
    setTypingText('');
    onKeyConceptChange?.('');
    
    setTimeout(() => {
      setCurrentConversationIndex((prev) => 
        (prev + 1) % currentConversations.length
      );
      setConversationKey((prev) => prev + 1);
    }, 1500);
  }, [currentConversations.length, onKeyConceptChange]);

  useEffect(() => {
    if (!isPlaying || !isClient || !currentConversation?.messages) return;

    try {
      setVisibleMessages([]);
      setHasError(false);

      const timeouts: NodeJS.Timeout[] = [];
      
      currentConversation.messages.forEach((message) => {
        if (!message || typeof message.delay !== 'number') return;
        
        // Si c'est un message utilisateur, simuler la frappe avant
        if (message.type === 'user') {
          const typingDelay = Math.max(0, message.delay - 2000);
          const typingDuration = 1500;
          
          const startTypingTimeout = setTimeout(() => {
            setTypingText('');
            
            const text = message.text;
            const charDelay = typingDuration / text.length;
            
            text.split('').forEach((char, charIndex) => {
              const charTimeout = setTimeout(() => {
                setTypingText(prev => prev + char);
              }, charIndex * charDelay);
              timeouts.push(charTimeout);
            });
            
            const stopTypingTimeout = setTimeout(() => {
              setTypingText('');
              setVisibleMessages(prev => [...prev, message]);
              
              // Mettre à jour le concept clé si présent
              if (message.keyConcept) {
                onKeyConceptChange?.(message.keyConcept);
              }
              
              // Expand le chat si le message a le marqueur expandChat (après 3s de pause)
              if (message.expandChat) {
                setTimeout(() => setChatSize('large'), 3000);
              }
            }, typingDuration + 200);
            timeouts.push(stopTypingTimeout);
          }, typingDelay);
          timeouts.push(startTypingTimeout);
        } else {
          const timeout = setTimeout(() => {
            setVisibleMessages(prev => [...prev, message]);
            
            // Mettre à jour le concept clé si présent
            if (message.keyConcept) {
              onKeyConceptChange?.(message.keyConcept);
            }
            
            // Expand le chat si le message a le marqueur expandChat (après 3s de pause)
            if (message.expandChat) {
              setTimeout(() => setChatSize('large'), 3000);
            }
          }, Math.max(0, message.delay));
          timeouts.push(timeout);
        }
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
  }, [currentConversationIndex, conversationKey, isPlaying, currentConversations, currentConversation, isClient, onKeyConceptChange, cleanupTimeouts, handleCloseChat]);

  if (!currentConversation || !currentConversations.length) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center" style={{ color: 'var(--on-surface-variant)' }}>
        <p>{isEnglish ? 'Chat temporarily unavailable' : 'Chat temporairement indisponible'}</p>
      </div>
    );
  }

  const dashboardImage = isEnglish ? '/dashboard_en.avif' : '/dashboard_fr.avif';
  const dashboardImageMobile = isEnglish ? '/dashboard_mobile_en.avif' : '/dashboard_mobile_fr.avif';

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Dashboard en arrière-plan */}
      <div 
        className="absolute inset-0 w-full h-full hidden md:block"
        style={{
          backgroundImage: `url('${dashboardImage}')`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Dashboard mobile en arrière-plan */}
      <div 
        className="absolute inset-0 w-full h-full md:hidden"
        style={{
          backgroundImage: `url('${dashboardImageMobile}')`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Bouton flottant Cortex */}
      <AnimatePresence>
        {chatSize === 'closed' && !isAnimatingOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              setIsAnimatingOpen(true);
              setTimeout(() => setChatSize('small'), 100);
            }}
            className="absolute bottom-6 right-6 w-16 h-16 rounded-2xl shadow-2xl flex items-center justify-center cursor-pointer"
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
              style={{ filter: 'brightness(0) saturate(100%)', color: 'var(--on-secondary-container)' }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat popup */}
      <AnimatePresence>
        {chatSize !== 'closed' && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              y: 0
            }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute rounded-2xl shadow-2xl overflow-hidden"
            style={{
              backgroundColor: 'var(--surface)',
              zIndex: 20,
              ...(chatSize === 'small' ? {
                bottom: '16px',
                right: '16px',
                width: '420px',
                height: '500px'
              } : {
                inset: '16px'
              }),
              transformOrigin: 'bottom right',
              transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
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
                    style={{ filter: 'brightness(0) saturate(100%)', color: 'var(--on-secondary-container)' }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: 'var(--on-secondary-container)' }}>
                    Cortex
                  </h3>
                  <p className="text-xs" style={{ color: 'var(--on-secondary-container)' }}>
                    {isEnglish ? 'Intelligent Assistant' : 'Assistant intelligent'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!isMobile && (
                  <button
                    onClick={() => setChatSize(chatSize === 'small' ? 'large' : 'small')}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors cursor-pointer"
                    style={{ color: 'var(--on-secondary-container)' }}
                  >
                    {chatSize === 'small' ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                  </button>
                )}
                <button
                  onClick={handleCloseChat}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors cursor-pointer"
                  style={{ color: 'var(--on-secondary-container)' }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Contenu du chat avec scroll */}
            <div 
              ref={chatContainerRef}
              className="overflow-y-auto overflow-x-hidden p-6"
              style={{ 
                height: 'calc(100% - 72px - 80px)',
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
                    src="/cortex.svg"
                    alt="Cortex"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                    style={{ filter: 'brightness(0) saturate(100%)', color: 'var(--on-secondary-container)' }}
                  />
                </div>
              )}

              <div className={`flex flex-col ${message.type === 'user' ? 'items-end' : 'items-start'} gap-2 ${message.chart ? 'max-w-[95%]' : 'max-w-[80%]'}`}>
                {message.text && (
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
                )}

                {message.cta && (
                  <Link 
                    href={`/${locale}${message.cta.link}`}
                    className="group flex items-center justify-center px-8 py-4 rounded-xl transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl"
                    style={{ 
                      backgroundColor: '#DCB26B',
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#C9A05C';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#DCB26B';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <span className="font-bold">{message.cta.label}</span>
                  </Link>
                )}

                {message.chart && (
                  <div className="w-full max-w-full">
                    <InlineChart chart={message.chart} isEnglish={isEnglish} locale={locale} />
                  </div>
                )}

                {message.document && (
                  <div className="w-full max-w-full">
                    <InlineDocument document={message.document} />
                  </div>
                )}

                {message.video && (
                  <div className="w-full max-w-full">
                    <InlineVideo video={message.video} isEnglish={isEnglish} />
                  </div>
                )}

                {message.progress && (
                  <div className="w-full max-w-full">
                    <InlineProgress title={message.progress.title} duration={message.progress.duration} />
                  </div>
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
            
            {/* Champ de saisie simulé - fixe en bas */}
            <div 
              className="p-4 border-t"
              style={{ 
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--outline)'
              }}
            >
              <div 
                className="flex items-center gap-2 px-4 py-3 rounded-full"
                style={{ 
                  backgroundColor: 'var(--surface-container-high)',
                  border: '1px solid var(--outline)'
                }}
              >
                <input
                  type="text"
                  value={typingText}
                  readOnly
                  placeholder={isEnglish ? 'Type a message...' : 'Tapez un message...'}
                  className="flex-1 bg-transparent outline-none text-sm"
                  style={{ color: 'var(--on-surface)' }}
                />
                <button
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{ 
                    backgroundColor: typingText ? 'var(--primary)' : 'var(--surface-container-high)',
                    color: typingText ? 'var(--on-primary)' : 'var(--on-surface-variant)',
                    cursor: 'default'
                  }}
                  disabled={!typingText}
                >
                  <Send size={16} className="rotate-45" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
