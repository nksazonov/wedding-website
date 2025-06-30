'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import TextSection from '@/components/TextSection';
import ScrolledImage from '@/components/ScrolledImage';
import MainWeddingInfo from '@/components/MainWeddingInfo';
import MenuButton from '@/components/MenuButton';
import SlidePanel from '@/components/SlidePanel';
import QuestionAndAnswer from '@/components/QuestionAndAnswer';
import ScheduleItem from '@/components/ScheduleItem';
import { setImageChangeCallback } from '@/hooks/useImageObserver';
import { useCountdown } from '@/hooks/useCountdown';


export default function Home() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get('guest') || 'Dear Guest';
  const [currentImageSrc, setCurrentImageSrc] = useState('/img/main-kiss.JPG');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { phase, displayText, formattedCountdown } = useCountdown();

  const sections = [
    { id: 'our-story', label: 'Наша історія' },
    { id: 'dress-code', label: 'Дрес код' },
    { id: 'gifts', label: 'Подарунки' },
    { id: 'schedule', label: 'Розклад' },
    { id: 'location', label: 'Локація' },
    { id: 'faq', label: 'Питання та відповіді' },
  ];

  useEffect(() => {
    setImageChangeCallback((src: string) => {
      setCurrentImageSrc(src);
    });
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleNavigate = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
      {/* Menu System */}
      <MenuButton onToggle={handleMenuToggle} />
      <SlidePanel
        isOpen={isMenuOpen}
        sections={sections}
        onClose={handleMenuClose}
        onNavigate={handleNavigate}
      />

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
          <p className="font-[Cormorant_Infant] text-xl font-medium max-w-2xl">
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
          imageUrl="/img/main-kiss.jpg"
        />

        {/* Scrollable Content for other sections */}
        <div className="scrollable-content relative z-10 py-8 px-8">
          <TextSection id="our-story" heading="Наша історія" imageUrl="/img/coffee.jpg">
            <p>
              Валерія та Нікіта познайомилися у університеті під час вивчення програмної інженерії.
              Спочатку вони були просто однокурсниками, але поступово їхня дружба переросла у щось більше.
              Після трьох років стосунків Нікіта зробив пропозицію на березі Дніпра під час романтичної прогулянки.
              Тепер вони готові розпочати нове життя разом і запрошують вас стати свідками їхнього кохання.
            </p>
          </TextSection>

          <TextSection id="dress-code" heading="Дрес код" imageUrl="/img/coffee.jpg">
            <p>
              Ми будемо раді бачити вас на нашому весіллі і хотіли б, щоб ваш образ гармоніював із нашою кольоровою палітрою:
            </p>

            <div className="mt-6 mb-8">
              <div className="grid grid-cols-2 gap-4 leaning-none">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#4a5d3a] shadow-sm"></div>
                  <span className="text-lg font-bold text-gray-700 font-[Inter] leading-4.5">Темно-Оливковий</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#8b4513] shadow-sm"></div>
                  <span className="text-lg font-bold text-gray-700 font-[Inter]">Шоколадний</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#c46f3a] shadow-sm"></div>
                  <span className="text-lg font-bold text-gray-700 font-[Inter]">Карамельний</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#c19a6b] shadow-sm"></div>
                  <span className="text-lg font-bold text-gray-700 font-[Inter]">Верблюжий</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#f5f5dc] shadow-sm"></div>
                  <span className="text-lg font-bold text-gray-700 font-[Inter]">Бежевий</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#fff8dc] shadow-sm"></div>
                  <span className="text-lg font-bold text-gray-700 font-[Inter]">Кремовий</span>
                </div>
              </div>
            </div>

            <p className='mb-2'>
              І трохи бохо-натхнення вітається 🌿✨
            </p>
            <p className='mb-2'>
              Ідея – коктейльний з бохо штрихом.
            </p>
            <p className='mb-2'>
              Для дівчат: легка сукня, брючний костюм чи стильні джинси + мінімалістичні або етно-аксесуари (мереживо, квітковий принт).
            </p>
            <p className='mb-6'>
              Для хлопців: класичні штани, стильні джинси чи лляні брюки + сорочка (можна піджак, жилет або лляна сорочка в бохо-стилі) і за бажанням краватка/метелик.
            </p>

            <span className="text-red-500 font-bold">TODOTODOTODO</span><br />
            🎨 Приклади дрес-коду доступні <a href="#gifts" className="text-blue-500 hover:text-blue-800 underline">за посиланям</a>.
            <br /><span className="text-red-500 font-bold">TODOTODOTODO</span>
          </TextSection>

          <TextSection id="gifts" heading="Подарунки" imageUrl="/img/hug-smile.jpg">
            <p className="mb-2">
              Найкращий подарунок — підтримка нашої нової родини. Якщо бажаєте привітати нас матеріально, будемо вдячні за внесок у сімейний бюджет 💰.
            </p>
            <p className="mb-2">
              Замість букетів 💐 просимо приносити ароматичні свічки — вони наповнять наш дім теплом, затишком і вашою увагою.
            </p>
            <p>
              Дякуємо, що ви з нами в цю особливу мить 🤍
            </p>
          </TextSection>

          <TextSection id="schedule" heading="Розклад" imageUrl="/img/hug-smile.jpg">
            <div>
              <ScheduleItem
                time="13:15"
                activity="Збір гостей біля РАГС №1 на ВДНГ. Приходьте заздалегідь, щоб встигнути насолодитися атмосферою."
              />

              <ScheduleItem
                time="13:30"
                activity="Початок урочистої церемонії."
              />

              <ScheduleItem
                time="14:30"
                activity="Урочистий вихід з залу разом з молодятами."
              />

              <ScheduleItem
                time="14:35"
                activity="Welcome-фуршет у ресторані."
              />

              <ScheduleItem
                time="15:10"
                activity="Вручення подарунків молодятам та фотосесія з гостями."
              />

              <ScheduleItem
                time="15:30"
                activity="Початок святкового банкету. Урочисті тости, смачна вечеря та перший танець молодят."
              />

              <ScheduleItem
                time="21:30"
                activity="Завершення святкування."
              />
            </div>
          </TextSection>

          <TextSection id="location" heading="Локація" imageUrl="/img/hug-theatre.jpg">
            <p className="mb-2">
              Зустрічаємося в РАГС №1 на ВДНГ — унікальній, просторій та вишуканій залі з видом на Виставковий центр та сад.
            </p>
            <p className="mb-2">
              РАГС №1 знаходиться у павільйоні №8, що розташований у правій стороні головної алеї павільйонів ВДНГ.
            </p>
            <p>
              Дістатися до головного входу ВДНГ можна на метро (станція &quot;Виставковий центр&quot;) або на автомобілі, для яких поруч розташована велика платна парковка.
            </p>
          </TextSection>

          <TextSection id="faq" heading="Питання та відповіді" imageUrl="/img/main-kiss.jpg">
            <div className="flex flex-col gap-14">
              <QuestionAndAnswer
                question="Чи можу я привести дитину?"
                answer="Так, діти завжди вітаються на нашому святі! Ми передбачили розваги для маленьких гостей та дитяче меню."
              />

              <QuestionAndAnswer
                question="Чи буде безкоштовний бар?"
                answer="Так, усі напої включені у вартість банкету. Буде представлений широкий вибір алкогольних та безалкогольних напоїв на будь-який смак."
              />

              <QuestionAndAnswer
                question="Що робити, якщо я маю дієтичні обмеження?"
                answer="Будь ласка, повідомте нас заздалегідь про ваші дієтичні потреби, і ми подбаємо про спеціальне меню. Ми враховуємо вегетаріанські, веганські та інші особливі вимоги."
              />

              <QuestionAndAnswer
                question="Де можна припаркувати автомобіль?"
                answer="Поруч з РАГС №1 на ВДНГ розташована велика платна парковка. Також можна скористатися громадським транспортом — найближча станція метро 'Виставковий центр'."
              />
            </div>
          </TextSection>
        </div>
        </div>
      </div>
  );
}
