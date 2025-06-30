'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import TextSection from '@/components/TextSection';
import ScrolledImage from '@/components/ScrolledImage';
import MainWeddingInfo from '@/components/MainWeddingInfo';
import { setImageChangeCallback } from '@/hooks/useImageObserver';
import { useCountdown } from '@/hooks/useCountdown';


export default function Home() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get('guest') || 'Dear Guest';
  const [currentImageSrc, setCurrentImageSrc] = useState('/img/main-kiss.JPG');

  const { phase, displayText, formattedCountdown } = useCountdown();

  useEffect(() => {
    setImageChangeCallback((src: string) => {
      setCurrentImageSrc(src);
    });
  }, []);

  return (
    <div className="bg-white">
      <style jsx>{`
        @keyframes bounceWide {
          0%, 20%, 53%, 80%, 100% {
            transform: scaleX(2) translateY(0);
          }
          40%, 43% {
            transform: scaleX(2) translateY(5px);
          }
          70% {
            transform: scaleX(2) translateY(5px);
          }
        }
      `}</style>
      {/* Navigation */}
      <div className="fixed top-6 left-6 z-30">
        <button className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
          <FontAwesomeIcon icon={faBars} className="text-lg" />
          <span className="text-sm font-medium">MENU</span>
        </button>
      </div>

      {/* Left Panel - Couple Photo - Fixed Position */}
      <div className="fixed left-0 top-0 w-[61%] h-screen overflow-hidden z-10">
        {/* Subtle lighting effect */}
        <div
          className="absolute top-0 left-0 w-full z-20 pointer-events-none"
          style={{
            height: '50vh',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 50%)'
          }}
        ></div>
        <ScrolledImage
          src={currentImageSrc}
          fadeDuration={1500}
          className="w-full h-full"
        />

        {/* Couple Names Overlay */}
        <div className="absolute bottom-20 left-20 z-20 text-white">
          <h1 className="text-7xl font-light mb-6 font-[Marck_Script]">
            Валерія & Нікіта
          </h1>
          <p className="font-[Cormorant_Infant] text-xl font-medium opacity-90 max-w-2xl">
            З нетерпінням чекаємо можливості розділити цей особливий день з вами.
          </p>
        </div>
      </div>

      {/* Right Panel - Wedding Details - Scrollable */}
      <div className="ml-[61%] w-[39%] min-h-screen relative">
        <MainWeddingInfo
          guestName={guestName}
          phase={phase}
          displayText={displayText}
          formattedCountdown={formattedCountdown}
          imageUrl="/img/main-kiss.JPG"
        />

        {/* Scrollable Content for other sections */}
        <div className="scrollable-content relative z-10 py-8 px-8">
          <TextSection heading="Наша історія" imageUrl="/img/second-coffee.JPG">
            <p>
              Валерія та Нікіта познайомилися у університеті під час вивчення програмної інженерії.
              Спочатку вони були просто однокурсниками, але поступово їхня дружба переросла у щось більше.
              Після трьох років стосунків Нікіта зробив пропозицію на березі Дніпра під час романтичної прогулянки.
              Тепер вони готові розпочати нове життя разом і запрошують вас стати свідками їхнього кохання.
            </p>
          </TextSection>

          <TextSection heading="Дрес код">
            <p>
              Ми дуже раді, що ви будете з нами у цей осоtelбливий день! Просимо дотримуватися напівформального дрес-коду.
              Чоловікам рекомендуємо костюми у темних тонах або елегантні сорочки з брюками.
              Жінкам підійдуть сукні міді або максі довжини у пастельних або насичених тонах.
              Будь ласка, уникайте білих відтінків, щоб не затьмарити наречену у її особливий день.
            </p>
          </TextSection>

          <TextSection heading="Подарунки">
            <p>
              Ваша присутність на нашому весіллі - це найкращий подарунок, який ми можемо отримати!
              Якщо ви все ж таки хочете подарувати нам щось особливе, ми будемо вдячні за будь-який внесок
              у наш спільний майбутній дім. Ми також створили список побажань у популярних магазинах,
              з яким можна ознайомитися за посиланням на нашому весільному сайті.
            </p>
          </TextSection>

          <TextSection heading="Розклад">
            <p>
              День нашого весілля буде насичений емоціями та святковими подіями!
              Урочиста церемонія розпочнеться о 16:00 у красивому парку ВДНГ.
              Після цього о 17:30 запрошуємо всіх на фуршет та фотосесію.
              Святковий банкет та танці триватимуть з 19:00 до пізньої ночі,
              тож готуйтеся відзначати з нами до самого ранку!
            </p>
          </TextSection>

          <TextSection heading="Локація" imageUrl="/img/second-coffee.JPG">
            <p>
              Наше весілля відбудеться у мальовничому комплексі на території ВДНГ у Києві.
              Це унікальне місце поєднує в собі красу природи та елегантність архітектури.
              Для вашої зручності ми організували трансфер від станції метро &quot;Виставковий центр&quot;.
              Також на території є достатньо місць для паркування автомобілів.
              Детальну карту проїзду ви знайдете у запрошенні.
            </p>
          </TextSection>

          <TextSection heading="Питання та відповіді" imageUrl="/img/main-kiss.JPG">
            <p>
              Чи можу я привести дитину? Так, діти завжди вітаються на нашому святі!
              Чи буде безкоштовний бар? Так, усі напої включені у вартість банкету.
              Що робити, якщо я маю дієтичні обмеження? Будь ласка, повідомте нас заздалегідь,
              і ми подбаємо про спеціальне меню. У разі інших питань, зв&apos;язуйтеся з нами
              за телефонами, вказаними у запрошенні.
            </p>
          </TextSection>
        </div>
        </div>
      </div>
  );
}
