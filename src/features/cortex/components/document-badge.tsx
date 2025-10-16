'use client';

import { motion } from 'framer-motion';
import { FileText, Download, FileSpreadsheet, Image as ImageIcon, File, BarChart3 } from 'lucide-react';
import type { GeneratedDocument } from '../data/conversations';

interface DocumentBadgeProps {
  document: GeneratedDocument;
  locale: string;
}

export default function DocumentBadge({ document, locale }: DocumentBadgeProps) {
  const isEnglish = locale === 'en';

  // Icône selon le format du fichier
  const getFileIcon = () => {
    const format = document.icon || 'pdf'; // Par défaut PDF
    
    switch (format.toLowerCase()) {
      case 'pdf':
        return <FileText className="w-5 h-5" style={{ color: '#DC2626' }} />; // Rouge PDF
      case 'csv':
      case 'excel':
      case 'xlsx':
        return <FileSpreadsheet className="w-5 h-5" style={{ color: '#16A34A' }} />; // Vert Excel
      case 'image':
      case 'png':
      case 'jpg':
      case 'jpeg':
        return <ImageIcon className="w-5 h-5" style={{ color: '#2563EB' }} />; // Bleu Image
      case 'chart':
        return <BarChart3 className="w-5 h-5" style={{ color: '#7C3AED' }} />; // Violet Chart
      default:
        return <File className="w-5 h-5" style={{ color: '#6B7280' }} />; // Gris générique
    }
  };

  const handleClick = () => {
    // Simuler le téléchargement ou l'ouverture
    console.log(`Opening document: ${document.id}`);
    // Ici tu pourrais ajouter une vraie logique de téléchargement
  };

  // Couleur unique pour tous les badges
  const borderColor = 'var(--marine)';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: 0,
        transition: {
          type: 'spring',
          stiffness: 400,
          damping: 15,
          mass: 0.8
        }
      }}
      exit={{ 
        opacity: 0, 
        scale: 0.8, 
        y: -10,
        transition: { duration: 0.2 }
      }}
      className="inline-flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:scale-105 transition-transform shadow-md"
      style={{ 
        backgroundColor: 'var(--surface)',
        border: `2px dashed ${borderColor}`,
        outline: `1px solid ${borderColor}`,
        outlineOffset: '2px'
      }}
      onClick={handleClick}
    >
      {/* Icône du document - la couleur indique le type de fichier */}
      <div 
        className="flex items-center justify-center w-10 h-10 rounded-lg"
        style={{ backgroundColor: 'var(--surface-variant)' }}
      >
        {getFileIcon()}
      </div>

      {/* Informations */}
      <div className="flex flex-col">
        <span className="text-xs font-medium" style={{ color: borderColor }}>
          {document.type === 'chart' 
            ? (isEnglish ? 'Generated chart' : 'Graphique généré')
            : (isEnglish ? 'Generated document' : 'Document généré')
          }
        </span>
        <span className="text-sm font-semibold" style={{ color: 'var(--on-surface)' }}>
          {document.name}
        </span>
      </div>

      {/* Icône de téléchargement */}
      <Download className="w-4 h-4 ml-2" style={{ color: borderColor }} />
    </motion.div>
  );
}
