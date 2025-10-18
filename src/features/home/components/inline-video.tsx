"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Play, Clock } from "lucide-react";
import type { InlineVideo } from "../data/tools-conversations";

interface InlineVideoProps {
  video: InlineVideo;
}

export default function InlineVideo({ video }: InlineVideoProps) {
  const content = (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="mt-8 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform"
      style={{
        border: '2px solid white',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Thumbnail avec overlay play */}
      <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900">
        {video.thumbnail ? (
          <img 
            src={video.thumbnail} 
            alt={video.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-white/20 text-6xl">🎬</div>
          </div>
        )}
        
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #BADFF6 0%, #E2CDED 100%)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
            }}
          >
            <Play size={28} fill="white" color="white" className="ml-1" />
          </div>
        </div>

        {/* Duration badge */}
        {video.duration && (
          <div 
            className="absolute bottom-2 right-2 px-2 py-1 rounded flex items-center gap-1"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(4px)'
            }}
          >
            <Clock size={12} color="white" />
            <span className="text-xs font-semibold text-white">
              {video.duration}
            </span>
          </div>
        )}
      </div>

      {/* Video info */}
      <div 
        className="p-3"
        style={{
          background: 'linear-gradient(135deg, #BADFF6 0%, #E2CDED 100%)'
        }}
      >
        <p className="font-semibold text-sm" style={{ color: 'var(--on-secondary-container)' }}>
          {video.title}
        </p>
        <p className="text-xs mt-1" style={{ color: 'var(--on-secondary-container)', opacity: 0.7 }}>
          Cliquez pour regarder
        </p>
      </div>
    </motion.div>
  );

  return video.videoUrl ? (
    <Link href={video.videoUrl}>
      {content}
    </Link>
  ) : content;
}
