'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useImageObserver } from '@/hooks/useImageObserver';

interface MainWeddingInfoProps {
  guestText?: string;
  phase: string;
  displayText: string;
  formattedCountdown: string;
  imageUrl?: string;
}

export default function MainWeddingInfo({
  guestText,
  phase,
  displayText,
  formattedCountdown,
  imageUrl
}: MainWeddingInfoProps) {
  const sectionRef = useImageObserver<HTMLDivElement>(imageUrl);
  const hasGuestText = guestText && guestText != '';

  return (
    <div className="relative h-screen" ref={sectionRef}>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/pictures/bohemian-bg.webp)' }}
      />
      <div className="relative z-10 text-center text-gray-800 h-screen flex flex-col justify-center px-6 md:px-10">
        {hasGuestText ? (
          // Guest-specific layout
          <>
            <p className="text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl mb-3 font-[Cormorant_Infant] font-bold px-4 md:px-16">{guestText}</p>
            <p className="text-base md:text-lg lg:text-xl 2xl:text-2xl mb-8 xl:mb-12 font-[Cormorant_Infant] italic text-gray-700 px-2 md:px-10">
              Запрошуємо Вас розділити з нами радість нашого весілля!
            </p>
            <h2 className="text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-[Cormorant_Infant]">Середа, 3 Вересня, 2025</h2>
            <p className="text-xl md:text-2xl lg:text-3xl 2xl:text-4xl text-gray-600 mb-5 xl:mb-12 font-[Cormorant_Infant]">Київ, ВДНГ</p>
          </>
        ) : (
          // Default layout
          <>
            <h2 className="text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-[Cormorant_Infant]">Середа</h2>
            <p className="text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl mb-5 xl:mb-12 font-[Cormorant_Infant]">3 Вересня, 2025</p>
            <p className="text-xl md:text-2xl lg:text-3xl 2xl:text-4xl text-gray-600 mb-5 xl:mb-11 font-[Cormorant_Infant]">Київ, ВДНГ</p>
          </>
        )}

        <div className="text-center mb-12 md:mb-16">
          {phase === 'before' && (
            <p className="text-sm md:text-md lg:text-lg 2xl:text-xl font-[Inter] font-light">
              {formattedCountdown}
            </p>
          )}
          {phase === 'during' && (
            <p className="text-base md:text-lg font-[Cormorant_Infant] font-medium text-pink-600">
              {displayText}
            </p>
          )}
          {phase === 'after' && (
            <p className="text-base md:text-lg font-[Cormorant_Infant] font-medium text-green-600">
              {displayText}
            </p>
          )}
        </div>

        <div
          className="text-center cursor-pointer absolute bottom-8 left-1/2 transform -translate-x-1/2"
          onClick={() => {
            const nextSection = document.querySelector('.scrollable-content');
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
            <style jsx>{`
                    @keyframes bounceWide {
                      0%, 10%, 26%, 40%, 100% {
                        transform: scaleX(2) translateY(0);
                      }
                      20%, 22% {
                        transform: scaleX(2) translateY(5px);
                      }
                      35% {
                        transform: scaleX(2) translateY(5px);
                      }
                    }
                  `}
            </style>

            <p className="text-md 2xl:text-xl font-light font-[Inter] mb-2">Дивитися деталі</p>
            <div className="flex justify-center">
            <FontAwesomeIcon
              icon={faChevronDown}
              className="text-2xl text-gray-500"
              style={{
              animation: '4s bounceWide 0s infinite',
              transform: 'scaleX(2)',
              display: 'inline-block',
              }}
            />
            </div>
        </div>
      </div>
    </div>
  );
}
