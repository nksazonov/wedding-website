'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useImageObserver } from '@/hooks/useImageObserver';

interface MainWeddingInfoProps {
  guestName: string;
  phase: string;
  displayText: string;
  formattedCountdown: string;
  imageUrl?: string;
}

export default function MainWeddingInfo({
  guestName,
  phase,
  displayText,
  formattedCountdown,
  imageUrl
}: MainWeddingInfoProps) {
  const sectionRef = useImageObserver<HTMLDivElement>(imageUrl);

  return (
    <div className="relative h-screen" ref={sectionRef}>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/pictures/bohemian-bg.webp)' }}
      />
      <div className="relative z-10 text-center text-gray-800 h-screen flex flex-col justify-center px-8">
        <h2 className="text-4xl font-[Cormorant_Infant]">Середа</h2>
        <p className="text-4xl mb-5 font-[Cormorant_Infant]">3 Вересня, 2025</p>
        <p className="text-2xl text-gray-600 mb-5 font-[Cormorant_Infant]">Київ, ВДНГ</p>

        <div className="text-center mb-16">
          {phase === 'before' && (
            <p className="text-md font-[Inter] font-light">
              {formattedCountdown}
            </p>
          )}
          {phase === 'during' && (
            <p className="text-lg font-[Cormorant_Infant] font-medium text-pink-600">
              {displayText}
            </p>
          )}
          {phase === 'after' && (
            <p className="text-lg font-[Cormorant_Infant] font-medium text-green-600">
              {displayText}
            </p>
          )}
        </div>

        <div
          className="text-center mb-6 cursor-pointer"
          onClick={() => {
            const nextSection = document.querySelector('.scrollable-content');
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <p className="text-md font-light font-[Inter] mb-2">Дивитися деталі</p>
          <div className="flex justify-center">
            <FontAwesomeIcon
              icon={faChevronDown}
              className="text-2xl text-gray-500"
              style={{
                animation: 'bounceWide 2s 4s infinite',
                transform: 'scaleX(2)',
                display: 'inline-block',
              }}
            />
          </div>
        </div>

        {guestName !== 'Dear Guest' && (
          <div className="p-4 bg-white/50 backdrop-blur-sm rounded-lg">
            <p className="text-lg text-gray-700" style={{ fontFamily: 'Cormorant Infant', fontWeight: 300 }}>
              Welcome, <span className="font-semibold" style={{ fontFamily: 'Cormorant Infant', fontWeight: 400 }}>{guestName}</span>!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
