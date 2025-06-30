'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

interface MenuButtonProps {
  onToggle: () => void;
}

export default function MenuButton({ onToggle }: MenuButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 left-4 md:top-6 md:left-6 z-50 flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full bg-white/70 hover:bg-white/90 text-gray-800 cursor-pointer hover:shadow-md transition-all duration-200"
    >
      <FontAwesomeIcon icon={faBars} className="text-xl" />
      <span className="text-md font-medium text-[Inter]">МЕНЮ</span>
    </button>
  );
}
