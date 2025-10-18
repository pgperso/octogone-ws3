"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Maximize2, Minimize2 } from "lucide-react";
import { conversations, TIMING, type Message, type GeneratedDocument } from "../data/conversations";
import DocumentBadge from "./document-badge";
import InlineChartComponent from "./inline-chart";

// Fallbacks pour la compatibilité  
const FALLBACK_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23e5e7eb'/%3E%3Cpath d='M20 20a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm0 2c-4 0-12 2-12 6v4h24v-4c0-4-8-6-12-6z' fill='%23374151'/%3E%3C/svg%3E";
const FALLBACK_CORTEX = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z' fill='%23374151'/%3E%3C/svg%3E";

// Type pour les graphiques
type ChartData = {
  type: 'line' | 'bar' | 'pie' | 'area';
  title: string;
  data: Array<{
    name: string;
    value: number;
    color?: string;
  }>;
};

// Composant wrapper pour les graphiques avec gestion d'erreur
function ChartWrapper({ chart, isEnglish }: { chart: ChartData; isEnglish: boolean }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="p-4 text-center" style={{ color: 'var(--on-surface-variant)' }}>
        {isEnglish ? 'Chart temporarily unavailable' : 'Graphique temporairement indisponible'}
      </div>
    );
  }

  try {
    return <InlineChartComponent chart={chart} />;
  } catch (_error) {
    console.warn('Chart rendering error:', _error);
    setHasError(true);
    return null;
  }
}

interface CortexAnimatedChatProps {
  locale: string;
}

export default function CortexAnimatedChat({ locale }: CortexAnimatedChatProps) {
  const [currentConversationIndex, setCurrentConversationIndex] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [isPlaying] = useState(true);
  const [, setHasError] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [chatState, setChatState] = useState<'closed' | 'small' | 'large'>('closed');
  const [isAnimatingOpen, setIsAnimatingOpen] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatContainerMobileRef = useRef<HTMLDivElement>(null);

  const isEnglish = useMemo(() => locale === 'en', [locale]);

  // Images du dashboard
  const dashboardImage = useMemo(() => isEnglish ? '/dashboard_en.avif' : '/dashboard_fr.avif', [isEnglish]);
  const dashboardImageMobile = useMemo(() => isEnglish ? '/dashboard_mobile_en.avif' : '/dashboard_mobile_fr.avif', [isEnglish]);

  // Vérifier si on est côté client pour éviter l'hydratation mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Auto-scroll vers le bas quand un nouveau message apparaît
  useEffect(() => {
    if (chatContainerRef.current && chatState !== 'closed') {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
    if (chatContainerMobileRef.current && chatState !== 'closed') {
      chatContainerMobileRef.current.scrollTo({
        top: chatContainerMobileRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [visibleMessages, chatState]);
  
  // Gestion d'erreur robuste (mémorisé pour éviter les recalculs)
  const currentConversations = useMemo(() => {
    return conversations?.[isEnglish ? 'en' : 'fr'] || [];
  }, [isEnglish]);
  
  const currentConversation = currentConversations[currentConversationIndex];
  
  // Fonction de nettoyage des timeouts
  const cleanupTimeouts = useCallback((timeouts: NodeJS.Timeout[]) => {
    timeouts.forEach(timeout => clearTimeout(timeout));
  }, []);

  useEffect(() => {
    if (!isPlaying || !isClient || !currentConversation?.messages) return;

    try {
      // Reset les messages visibles
      setVisibleMessages([]);
      setHasError(false);

      // Afficher les messages avec leurs délais
      const timeouts: NodeJS.Timeout[] = [];
      
      currentConversation.messages.forEach((message) => {
        if (!message || typeof message.delay !== 'number') return;
        
        const timeout = setTimeout(() => {
          setVisibleMessages(prev => [...prev, message]);
        }, Math.max(0, message.delay));
        timeouts.push(timeout);
      });

      // Calculer le temps total de la conversation
      const lastMessage = currentConversation.messages[currentConversation.messages.length - 1];
      if (lastMessage && typeof lastMessage.delay === 'number') {
        const totalTime = lastMessage.delay + (TIMING?.messageDisplay || 4000) + (TIMING?.conversationPause || 3000);

        // Passer à la conversation suivante
        const nextTimeout = setTimeout(() => {
          setCurrentConversationIndex((prev) => 
            (prev + 1) % Math.max(1, currentConversations.length)
          );
        }, totalTime);
        timeouts.push(nextTimeout);
      }

      return () => cleanupTimeouts(timeouts);
    } catch (_error) {
      console.warn('CortexAnimatedChat error:', _error);
      setHasError(true);
    }
  }, [currentConversationIndex, isPlaying, currentConversations, currentConversation, isClient, cleanupTimeouts]);

  // Vérification de sécurité APRÈS tous les hooks
  if (!currentConversation || !currentConversations.length) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center" style={{ color: 'var(--on-surface-variant)' }}>
        <p>{isEnglish ? 'Chat temporarily unavailable' : 'Chat temporairement indisponible'}</p>
      </div>
    );
  }

  // Récupérer tous les documents générés dans les messages visibles
  const generatedDocuments = visibleMessages.reduce((docs, msg) => {
    if (msg.document) {
      docs.push(msg.document);
    }
    if (msg.removeDocument) {
      return docs.filter(doc => doc.id !== msg.removeDocument);
    }
    return docs;
  }, [] as GeneratedDocument[]);

  const handleCloseChat = () => {
    setChatState('closed');
  };

  const handleExpandChat = () => {
    setChatState('large');
  };

  const handleMinimizeChat = () => {
    setChatState('small');
  };

  const handleOpenChat = () => {
    setIsAnimatingOpen(true);
    setTimeout(() => setChatState('small'), 100);
  };

  return (
    <div className="relative w-full h-full overflow-hidden max-w-6xl mx-auto">
      {/* Dashboard desktop en arrière-plan */}
      <div 
        className="absolute inset-0 w-full h-full hidden md:block rounded-2xl overflow-hidden shadow-2xl"
        style={{
          backgroundImage: `url('${dashboardImage}')`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
          {/* Bouton flottant Cortex */}
          <AnimatePresence>
            {chatState === 'closed' && !isAnimatingOpen && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={handleOpenChat}
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
                  style={{ filter: 'brightness(0) saturate(100%)', color: 'var(--on-secondary-container)' }}
                />
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {chatState !== 'closed' && (
              <>
                {/* Overlay derrière le chat */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-black/30"
                  style={{ zIndex: 10 }}
                />
                
                {/* Chat */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute rounded-2xl shadow-2xl overflow-hidden flex flex-col ${
                    chatState === 'large' 
                      ? 'inset-4' 
                      : 'bottom-4 right-4 w-[420px] h-[500px]'
                  }`}
                  style={{
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--outline)',
                    zIndex: 20
                  }}
                >
                {/* Header du chat */}
                <div 
                  className="flex items-center justify-between p-4"
                  style={{
                    background: 'linear-gradient(135deg, #BADFF6 0%, #E2CDED 100%)',
                    borderBottom: '1px solid var(--outline)'
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
                        style={{ filter: 'brightness(0) saturate(100%)', color: 'var(--on-secondary-container)' }}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm" style={{ color: 'var(--on-secondary-container)' }}>
                        Cortex
                      </h3>
                      <p className="text-xs" style={{ color: 'var(--on-secondary-container)', opacity: 0.8 }}>
                        {isEnglish ? 'AI Assistant' : 'Assistant IA'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={chatState === 'large' ? handleMinimizeChat : handleExpandChat}
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors"
                      style={{ color: 'var(--on-secondary-container)' }}
                      title={chatState === 'large' ? (isEnglish ? 'Minimize' : 'Réduire') : (isEnglish ? 'Expand' : 'Agrandir')}
                    >
                      {chatState === 'large' ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                    </button>
                    <button
                      onClick={handleCloseChat}
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors"
                      style={{ color: 'var(--on-secondary-container)' }}
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Corps du chat avec scroll */}
                <div 
                  ref={chatContainerRef}
                  className="p-4 overflow-y-auto flex-1"
                  style={{ 
                    backgroundColor: 'var(--surface)'
                  }}
                >
                  {/* Zone des documents générés */}
                  {generatedDocuments.length > 0 && (
                    <div className="mb-4">
                      <AnimatePresence>
                        <motion.div
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="flex flex-wrap gap-2"
                        >
                          {generatedDocuments.map((doc) => (
                            <DocumentBadge key={doc.id} document={doc} locale={locale} />
                          ))}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  )}

                  {/* Messages */}
                  <div className="space-y-3">
                    <AnimatePresence mode="wait">
                      <div key={currentConversation.id}>
                        {visibleMessages.map((message, index) => (
                          <motion.div
                            key={`conv-${currentConversation.id}-msg-${index}`}
                            initial={{ opacity: 0, x: message.type === 'user' ? 50 : -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4 }}
                            className="mb-3"
                          >
                            <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} items-start gap-2`}>
                              {message.type === 'cortex' && (
                                <div 
                                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                                  style={{ background: 'linear-gradient(135deg, #BADFF6 0%, #E2CDED 100%)' }}
                                >
                                  <Image
                                    src="/cortex.svg"
                                    alt="Cortex"
                                    width={16}
                                    height={16}
                                    style={{ color: 'var(--on-secondary-container)' }}
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.src = FALLBACK_CORTEX;
                                    }}
                                  />
                                </div>
                              )}

                              <div className={`flex flex-col ${message.type === 'user' ? 'items-end' : 'items-start'} gap-1 max-w-[75%]`}>
                                <div 
                                  className="rounded-2xl px-3 py-2"
                                  style={{ 
                                    backgroundColor: message.type === 'user' ? 'var(--purple_cortex)' : 'var(--secondary-container)',
                                    color: message.type === 'user' ? 'var(--on-purple_cortex)' : 'var(--on-secondary-container)'
                                  }}
                                >
                                  <p className="text-xs whitespace-pre-line">
                                    {message.text}
                                  </p>
                                </div>
                                <span className="text-[10px] px-2" style={{ color: 'var(--on-surface-variant)' }}>
                                  11:05
                                </span>
                              </div>

                              {message.type === 'user' && (
                                <Image
                                  src="/avatar.jpg"
                                  alt="User"
                                  width={32}
                                  height={32}
                                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = FALLBACK_AVATAR;
                                  }}
                                />
                              )}
                            </div>

                            {/* Graphique */}
                            {message.chart && (
                              <div className="w-full mt-2 max-w-full overflow-hidden">
                                <ChartWrapper chart={message.chart} isEnglish={isEnglish} />
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
              </>
            )}
          </AnimatePresence>
      </div>

      {/* Dashboard mobile en arrière-plan */}
      <div 
        className="absolute inset-0 w-full h-full md:hidden rounded-2xl overflow-hidden shadow-2xl"
        style={{
          backgroundImage: `url('${dashboardImageMobile}')`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
          {/* Bouton flottant Cortex */}
          <AnimatePresence>
            {chatState === 'closed' && !isAnimatingOpen && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={handleOpenChat}
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
                  style={{ filter: 'brightness(0) saturate(100%)', color: 'var(--on-secondary-container)' }}
                />
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {chatState !== 'closed' && (
              <>
                {/* Overlay derrière le chat */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-black/30"
                  style={{ zIndex: 10 }}
                />
                
                {/* Chat */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-4 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                  style={{
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--outline)',
                    zIndex: 20
                  }}
                >
                {/* Header du chat */}
                <div 
                  className="flex items-center justify-between p-3"
                  style={{
                    background: 'linear-gradient(135deg, #BADFF6 0%, #E2CDED 100%)',
                    borderBottom: '1px solid var(--outline)'
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ 
                        backgroundColor: 'var(--secondary-container)',
                        border: '2px solid white'
                      }}
                    >
                      <Image
                        src="/cortex.svg"
                        alt="Cortex"
                        width={20}
                        height={20}
                        style={{ filter: 'brightness(0) saturate(100%)', color: 'var(--on-secondary-container)' }}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xs" style={{ color: 'var(--on-secondary-container)' }}>
                        Cortex
                      </h3>
                      <p className="text-[10px]" style={{ color: 'var(--on-secondary-container)', opacity: 0.8 }}>
                        {isEnglish ? 'AI Assistant' : 'Assistant IA'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleCloseChat}
                    className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors"
                    style={{ color: 'var(--on-secondary-container)' }}
                  >
                    ✕
                  </button>
                </div>

                {/* Corps du chat avec scroll */}
                <div 
                  ref={chatContainerMobileRef}
                  className="p-3 overflow-y-auto flex-1"
                  style={{ 
                    backgroundColor: 'var(--surface)'
                  }}
                >
                  {/* Zone des documents générés */}
                  {generatedDocuments.length > 0 && (
                    <div className="mb-3">
                      <AnimatePresence>
                        <motion.div
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="flex flex-wrap gap-2"
                        >
                          {generatedDocuments.map((doc) => (
                            <DocumentBadge key={doc.id} document={doc} locale={locale} />
                          ))}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  )}

                  {/* Messages */}
                  <div className="space-y-2">
                    <AnimatePresence mode="wait">
                      <div key={currentConversation.id}>
                        {visibleMessages.map((message, index) => (
                          <motion.div
                            key={`conv-${currentConversation.id}-msg-${index}`}
                            initial={{ opacity: 0, x: message.type === 'user' ? 50 : -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4 }}
                            className="mb-2"
                          >
                            <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} items-start gap-2`}>
                              {message.type === 'cortex' && (
                                <div 
                                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                                  style={{ background: 'linear-gradient(135deg, #BADFF6 0%, #E2CDED 100%)' }}
                                >
                                  <Image
                                    src="/cortex.svg"
                                    alt="Cortex"
                                    width={14}
                                    height={14}
                                    style={{ color: 'var(--on-secondary-container)' }}
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.src = FALLBACK_CORTEX;
                                    }}
                                  />
                                </div>
                              )}

                              <div className={`flex flex-col ${message.type === 'user' ? 'items-end' : 'items-start'} gap-1 max-w-[75%]`}>
                                <div 
                                  className="rounded-2xl px-3 py-2"
                                  style={{ 
                                    backgroundColor: message.type === 'user' ? 'var(--purple_cortex)' : 'var(--secondary-container)',
                                    color: message.type === 'user' ? 'var(--on-purple_cortex)' : 'var(--on-secondary-container)'
                                  }}
                                >
                                  <p className="text-[11px] whitespace-pre-line">
                                    {message.text}
                                  </p>
                                </div>
                                <span className="text-[9px] px-2" style={{ color: 'var(--on-surface-variant)' }}>
                                  11:05
                                </span>
                              </div>

                              {message.type === 'user' && (
                                <Image
                                  src="/avatar.jpg"
                                  alt="User"
                                  width={28}
                                  height={28}
                                  className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = FALLBACK_AVATAR;
                                  }}
                                />
                              )}
                            </div>

                            {/* Graphique */}
                            {message.chart && (
                              <div className="w-full mt-2 max-w-full overflow-hidden">
                                <ChartWrapper chart={message.chart} isEnglish={isEnglish} />
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
              </>
            )}
          </AnimatePresence>
      </div>
    </div>
  );
}
