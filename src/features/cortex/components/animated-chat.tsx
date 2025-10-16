"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
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

interface AnimatedChatProps {
  locale: string;
}

export default function AnimatedChat({ locale }: AnimatedChatProps) {
  const [currentConversationIndex, setCurrentConversationIndex] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [isPlaying] = useState(true);
  const [, setHasError] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Vérifier si on est côté client pour éviter l'hydratation mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  const isEnglish = locale === 'en';
  
  // Gestion d'erreur robuste (mémorisé pour éviter les recalculs)
  const currentConversations = useMemo(() => {
    return conversations?.[isEnglish ? 'en' : 'fr'] || [];
  }, [conversations, isEnglish]);
  
  const currentConversation = currentConversations[currentConversationIndex];
  
  // Vérification de sécurité
  if (!currentConversation || !currentConversations.length) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center" style={{ color: 'var(--on-surface-variant)' }}>
        <p>{isEnglish ? 'Chat temporarily unavailable' : 'Chat temporairement indisponible'}</p>
      </div>
    );
  }

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
        }, Math.max(0, message.delay)); // Assurer que le délai est positif
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
      console.warn('AnimatedChat error:', _error);
      setHasError(true);
    }
  }, [currentConversationIndex, isPlaying, currentConversations, currentConversation, isClient, cleanupTimeouts]);

  // Calculer la hauteur nécessaire pour la conversation la plus longue
  // Chaque message fait environ 120px (bulle + avatar + espacement)
  const maxMessages = currentConversations.length > 0 
    ? Math.max(...currentConversations.map(conv => conv?.messages?.length || 0))
    : 0;
  const estimatedHeight = Math.max(400, maxMessages * 120 + 100); // Minimum 400px

  // Récupérer tous les documents générés dans les messages visibles
  // en tenant compte des suppressions
  const generatedDocuments = visibleMessages.reduce((docs, msg) => {
    if (msg.document) {
      // Ajouter le document
      docs.push(msg.document);
    }
    if (msg.removeDocument) {
      // Retirer le document avec cet ID
      return docs.filter(doc => doc.id !== msg.removeDocument);
    }
    return docs;
  }, [] as GeneratedDocument[]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 motion-container" style={{ minHeight: `${estimatedHeight}px` }}>
      {/* Zone réservée pour les documents générés - hauteur fixe pour éviter les sauts */}
      <div className="min-h-[80px] flex items-start">
        <AnimatePresence>
          {generatedDocuments.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-wrap gap-3 w-full"
            >
              {generatedDocuments.map((doc) => (
                <DocumentBadge key={doc.id} document={doc} locale={locale} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Zone des messages */}
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
            onAnimationComplete={() => {
              // Nettoyage après animation - Technique Netflix
              const element = document.querySelector(`[data-motion-key="conv-${currentConversation.id}-msg-${index}"]`);
              if (element) {
                element.classList.add('animation-complete');
              }
            }}
          >
            {/* Message avec avatar */}
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

              <div className={`flex flex-col ${message.type === 'user' ? 'items-end' : 'items-start'} gap-1 max-w-[80%]`}>
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

            {/* Graphique en pleine largeur */}
            {/* @ts-expect-error - chart property exists in runtime data */}
            {message.chart && (
              <div className="w-full">
                {/* @ts-expect-error - chart property exists in runtime data */}
                <ChartWrapper chart={message.chart} isEnglish={isEnglish} />
              </div>
            )}
          </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}
