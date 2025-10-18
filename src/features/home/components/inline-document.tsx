"use client";

import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";

export type InlineDocumentData = {
  title: string;
  type: 'pdf' | 'excel' | 'report';
  size?: string;
  downloadUrl?: string;
};

interface InlineDocumentProps {
  document: InlineDocumentData;
}

export default function InlineDocument({ document }: InlineDocumentProps) {
  const getIcon = () => {
    switch (document.type) {
      case 'pdf':
        return <FileText size={24} />;
      case 'excel':
        return <FileText size={24} />;
      case 'report':
        return <FileText size={24} />;
      default:
        return <FileText size={24} />;
    }
  };

  const getTypeLabel = () => {
    switch (document.type) {
      case 'pdf':
        return 'PDF';
      case 'excel':
        return 'Excel';
      case 'report':
        return 'Rapport';
      default:
        return 'Document';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="mt-8 p-4 rounded-xl cursor-pointer hover:scale-105 transition-transform"
      style={{
        background: 'linear-gradient(135deg, #BADFF6 0%, #E2CDED 100%)',
        border: '2px solid white',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }}
      onClick={() => {
        if (document.downloadUrl) {
          window.open(document.downloadUrl, '_blank');
        }
      }}
    >
      <div className="flex items-center gap-3">
        <div 
          className="p-3 rounded-lg"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.5)'
          }}
        >
          {getIcon()}
        </div>
        
        <div className="flex-1">
          <p className="font-semibold text-sm" style={{ color: 'var(--on-background)' }}>
            {document.title}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              color: 'var(--on-background)'
            }}>
              {getTypeLabel()}
            </span>
            {document.size && (
              <span className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>
                {document.size}
              </span>
            )}
          </div>
        </div>

        <div 
          className="p-2 rounded-lg"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.5)'
          }}
        >
          <Download size={20} />
        </div>
      </div>
    </motion.div>
  );
}
