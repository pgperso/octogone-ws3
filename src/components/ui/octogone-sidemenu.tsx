"use client";

import React from 'react';
import { X } from 'lucide-react';

interface OctogoneSideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;
}

export const OctogoneSideMenu: React.FC<OctogoneSideMenuProps> = ({
  isOpen,
  onClose,
  title,
  children,
  width = '400px'
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay de fond */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Side menu */}
      <div
        className="fixed top-0 right-0 h-full z-50 shadow-2xl transition-transform duration-300 flex flex-col"
        style={{
          backgroundColor: 'var(--surface-container)',
          width: width,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)'
        }}
      >
        {/* Header */}
        <div
          className="px-6 py-4 border-b flex items-center justify-between"
          style={{ borderColor: 'var(--outline)' }}
        >
          <h2
            className="text-xl font-bold"
            style={{ color: 'var(--on-surface)' }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-all hover:bg-opacity-80"
            style={{
              backgroundColor: 'var(--surface-variant)',
              color: 'var(--on-surface-variant)'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Contenu */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </>
  );
};
