'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';

interface Section {
  id: string;
  label: string;
}

interface SlidePanelProps {
  isOpen: boolean;
  sections: Section[];
  onClose: () => void;
  onNavigate: (id: string) => void;
}

export default function SlidePanel({ isOpen, sections, onClose, onNavigate }: SlidePanelProps) {
  // Lock body scroll when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNavigate = (id: string) => {
    onNavigate(id);
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={handleOverlayClick}
        />
      )}

      {/* Slide Panel */}
      <aside
        className="fixed left-0 top-0 h-screen w-4/5 md:w-1/5 max-w-xs bg-white/100 z-50 transition-all duration-300 ease-in-out backdrop-blur-sm"
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          opacity: isOpen ? 1 : 0,
        }}
      >
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-gray-300/50">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light font-[Marck_Script] text-gray-800">
              Валерія & Нікіта
            </h2>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 transition-colors p-1 cursor-pointer"
            >
              <FontAwesomeIcon icon={faXmark} className="text-lg" />
            </button>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="p-4">
          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => handleNavigate(section.id)}
                  className="w-full text-left px-4 py-3 text-gray-700 cursor-pointer hover:bg-gray-200 rounded-lg transition-colors font-[Inter] text-md"
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
