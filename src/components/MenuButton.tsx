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
      className="fixed top-6 left-6 z-40 flex items-center gap-3 px-6 py-3 rounded-full bg-white/70 text-gray-800 cursor-pointer hover:bg-white/100 hover:shadow-md transition-all duration-200"
    >
      <FontAwesomeIcon icon={faBars} className="text-xl" />
      <span className="text-md font-medium text-[Inter]">МЕНЮ</span>
    </button>
  );
}
