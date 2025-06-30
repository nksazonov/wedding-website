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
import guestsMap from '../../public/data/guestsMap';
import Image from 'next/image';


// Helper function to check if device is mobile
const isMobile = () => {
  return typeof window !== 'undefined' && window.innerWidth < 768;
};

export default function Home() {
  const guestParam = useSearchParams().get('guest') || '';
  const guestName = guestsMap[guestParam]?.text || '';
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
      {/* Menu System */}
      <MenuButton onToggle={handleMenuToggle} />
      <SlidePanel
        isOpen={isMenuOpen}
        sections={sections}
        onClose={handleMenuClose}
        onNavigate={handleNavigate}
      />

      {/* Hero Image - Mobile header / Desktop left panel */}
      <aside className="relative h-screen w-full md:fixed md:top-0 md:left-0 md:h-screen md:w-3/5 overflow-hidden z-10">
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

        {/* Hero Text Overlay - Responsive positioning and typography */}
        <div className="absolute left-8 lg:left-12 xl:left-20 bottom-12 xl:bottom-20 px-6 z-20 text-white drop-shadow-lg">
          <h1 className="text-6xl lg:text-7xl font-light mb-4 lg:mb-6 font-[Marck_Script]">
            Валерія & Нікіта
          </h1>
          <p className="font-[Cormorant_Infant] text-lg lg:text-xl font-medium max-w-xs md:max-w-2xl">
            З нетерпінням чекаємо можливості розділити цей особливий день з вами.
          </p>
        </div>
      </aside>

      {/* Main Content - Full width on mobile, right panel on desktop */}
      <main className="w-full md:ml-[60%] md:w-[40%] min-h-screen relative">
        {/* Wedding Info - Mobile version below hero, Desktop version at top */}
        <MainWeddingInfo
          guestText={guestName}
          phase={phase}
          displayText={displayText}
          formattedCountdown={formattedCountdown}
          imageUrl="/img/main-kiss.jpg"
        />

        {/* Scrollable Content for other sections */}
        <section className="scrollable-content relative z-10 px-4 md:px-5 xl:px-10 2xl:px-20 py-6 md:py-8 space-y-8 md:space-y-12">
          <TextSection id="our-story" heading="Наша історія" imageUrl={!isMobile() ? "/img/coffee.jpg" : undefined}>
            <p>
              Валерія та Нікіта познайомилися у університеті під час вивчення програмної інженерії.
              Спочатку вони були просто однокурсниками, але поступово їхня дружба переросла у щось більше.
              Після трьох років стосунків Нікіта зробив пропозицію на березі Дніпра під час романтичної прогулянки.
              Тепер вони готові розпочати нове життя разом і запрошують вас стати свідками їхнього кохання.
            </p>
          </TextSection>

          {/* Mobile image for dress-code section */}
          <div className="md:hidden w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mb-8">
            <Image
              src="/img/coffee.jpg"
              alt="Dress code"
              width={1200}
              height={400}
              className="w-full h-64 object-cover"
            />
          </div>
          <TextSection id="dress-code" heading="Дрес код" imageUrl={!isMobile() ? "/img/coffee.jpg" : undefined}>
            <p>
              Ми будемо раді бачити вас на нашому весіллі і хотіли б, щоб ваш образ гармоніював із нашою кольоровою палітрою:
            </p>

            <div className="mt-6 mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 leaning-none text-base font-bold text-gray-700 font-[Inter] leading-4.5">
                <div className="flex items-center gap-4">
                  <div className="min-w-8 h-8 rounded-full bg-[#4a5d3a] shadow-sm"></div>
                  <span>Темно-Оливковий</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="min-w-8 h-8 rounded-full bg-[#8b4513] shadow-sm"></div>
                  <span>Шоколадний</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="min-w-8 h-8 rounded-full bg-[#c46f3a] shadow-sm"></div>
                  <span>Карамельний</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="min-w-8 h-8 rounded-full bg-[#c19a6b] shadow-sm"></div>
                  <span>Верблюжий</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="min-w-8 h-8 rounded-full bg-[#f5f5dc] shadow-sm"></div>
                  <span>Бежевий</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="min-w-8 h-8 rounded-full bg-[#fff8dc] shadow-sm"></div>
                  <span>Кремовий</span>
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

          {/* Mobile image for gifts section */}
          <div className="md:hidden w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mb-8">
            <Image
              src="/img/hug-smile.jpg"
              alt="Gifts"
              width={1200}
              height={400}
              className="w-full h-64 object-cover"
            />
          </div>
          <TextSection id="gifts" heading="Подарунки" imageUrl={!isMobile() ? "/img/hug-smile.jpg" : undefined}>
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

          <TextSection id="schedule" heading="Розклад" imageUrl={!isMobile() ? "/img/hug-smile.jpg" : undefined}>
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

          {/* Mobile image for location section */}
          <div className="md:hidden w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mb-8">
            <Image
              src="/img/hug-theatre.jpg"
              alt="Location"
              width={1200}
              height={400}
              className="w-full h-64 object-cover"
            />
          </div>
          <TextSection id="location" heading="Локація" imageUrl={!isMobile() ? "/img/hug-theatre.jpg" : undefined}>
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

          <TextSection id="faq" heading="Питання та відповіді" imageUrl={!isMobile() ? "/img/main-kiss.jpg" : undefined}>
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

          {/* Mobile image for faq section */}
          <div className="md:hidden w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mb-8">
            <Image
              src="/img/main-kiss.jpg"
              alt="FAQ"
              width={1200}
              height={400}
              className="w-full h-64 object-cover"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
