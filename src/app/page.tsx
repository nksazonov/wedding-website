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
import LoadingSpinner from '@/components/LoadingSpinner';
import { setImageChangeCallback } from '@/hooks/useImageObserver';
import { useCountdown } from '@/hooks/useCountdown';
import guestsMap from '../../public/data/guestsMap';
import Image from 'next/image';
import GoogleMapComponent from '@/components/GoogleMapComponent';


// Helper function to check if device is mobile
const isMobile = () => {
  return typeof window !== 'undefined' && window.innerWidth < 768;
};

export default function Home() {
  const guestParam = useSearchParams().get('guest') || '';
  const guestName = guestsMap[guestParam]?.text || '';
  const [currentImageSrc, setCurrentImageSrc] = useState('/img/main-kiss.JPG');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const { phase, displayText, formattedCountdown } = useCountdown();

  const sections = [
    { id: 'our-story', label: 'Наша історія' },
    { id: 'dress-code', label: 'Дрес код' },
    { id: 'gifts', label: 'Подарунки' },
    { id: 'schedule', label: 'Розклад' },
    { id: 'location', label: 'Локація' },
    { id: 'faq', label: 'Питання та відповіді' },
    { id: 'photo-upload', label: 'Фотографії з події' },
  ];

  useEffect(() => {
    setImageChangeCallback((src: string) => {
      setCurrentImageSrc(src);
    });

    // Check if device is mobile on client side
    const checkMobile = () => {
      setIsMobileDevice(typeof window !== 'undefined' && window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Set ready state after mobile detection and guest parameter are available
    setIsReady(true);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [guestName]); // Add guestName as dependency

  // Helper function to check if MainWeddingInfo should be shown first on mobile
  const shouldShowMainWeddingInfoFirst = (guestName: string) => {
    return isMobileDevice && guestName !== '';
  };

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

  // Show loading state until everything is ready
  if (!isReady) {
    return <LoadingSpinner />;
  }

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

      {/* Conditional rendering based on mobile + guest status */}
      {shouldShowMainWeddingInfoFirst(guestName) ? (
        // Mobile with guest: MainWeddingInfo first, then Hero Image
        <>
          <main className="w-full md:ml-[60%] md:w-[40%] min-h-screen relative">
            <MainWeddingInfo
              guestText={guestName}
              phase={phase}
              displayText={displayText}
              formattedCountdown={formattedCountdown}
              imageUrl="/img/main-kiss.jpg"
            />
          </main>

          {/* Hero Image - Mobile with guest version */}
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
        </>
      ) : (
        // Default layout: Hero Image first, then MainWeddingInfo
        <>
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
          </main>
        </>
      )}

      {/* Scrollable Content - Always at the bottom */}
      <main className={`w-full ${!shouldShowMainWeddingInfoFirst(guestName) ? 'md:ml-[60%] md:w-[40%]' : ''} min-h-screen relative`}>

        {/* Scrollable Content for other sections */}
        <section className="scrollable-content relative z-10 px-4 md:px-5 xl:px-10 2xl:px-20 py-6 md:py-8 space-y-8 md:space-y-12">
          <TextSection id="our-story" heading="Наша історія" imageUrl={!isMobileDevice ? "/img/coffee.jpg" : undefined}>
            <p className="mb-4">
              Валерія та Нікіта вперше перетнулися на «швидких побаченнях» на факультеті кібернетики КНУ: вона прийшла заради знижки для подруги, він — із цікавості. Хоча перша зустріч не обіцяла романтики (Валерія не шукала стосунків), вони обмінялися контактами.
            </p>
            <p className="mb-4">
              Ще через шість місяців Валерія натрапила на відео, в якому Нікіта розповідав про свою новостворену екологічну ініціативу, і зацікавилась. Вона написала йому — і незабаром вони зустрілися на першому побаченні 6 лютого, а вже 19 березня офіційно почали будувати стосунки.
            </p>
            <p>
              Попри карантин, початок війни та ночівлі в метро, пара підтримувала одне одного в перших роботах і навіть витримала випробування відстанню, коли Валерія поїхала до Італії навчатися на кліматолога. І саме під час цього випробування, 3 вересня, перебуваючи в Києві, на даху хмарочоса з видом на Дніпро, вона отримала несподівану пропозицію руки та серця від Нікіти — і відповіла «ТАК», підтвердивши, що разом їм під силу все.
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
          <TextSection id="dress-code" heading="Дрес код" imageUrl={!isMobileDevice ? "/img/coffee.jpg" : undefined}>
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
              Для дівчат: легка сукня, брючний костюм чи стильні джинси + мінімалістичні або етно-аксесуари (мереживо, квітковий принт).
            </p>
            <p className='mb-6'>
              Для хлопців: класичні штани, стильні джинси чи лляні брюки + сорочка (можна піджак, жилет або лляна сорочка в бохо-стилі) і за бажанням краватка/метелик.
            </p>

            🎨 Приклади дрес-коду доступні <a href="https://uk.pinterest.com/valerierybchynska/dress-code/" target='_blank' className="text-blue-500 hover:text-blue-800 underline">за посиланям</a>.
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
          <TextSection id="gifts" heading="Подарунки" imageUrl={!isMobileDevice ? "/img/hug-smile.jpg" : undefined}>
            <p className="mb-2">
              Найкращий подарунок — підтримка нашої нової родини. Якщо бажаєте привітати нас матеріально, будемо вдячні за внесок у сімейний бюджет 💰.
            </p>
            <p>
              Замість букетів 💐 за бажання можете приносити ароматичні свічки — вони наповнять наш дім теплом, затишком і вашою увагою.
            </p>
          </TextSection>

          <TextSection id="schedule" heading="Розклад" imageUrl={!isMobileDevice ? "/img/hug-smile.jpg" : undefined}>
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
          <TextSection id="location" heading="Локація" imageUrl={!isMobileDevice ? "/img/hug-theatre.jpg" : undefined}>
            <p className="mb-2">
              Зустрічаємося в РАГС №1 на ВДНГ — унікальній, просторій та вишуканій залі з видом на Виставковий центр та сад.
            </p>
            <p className="mb-2">
              РАГС №1 знаходиться у павільйоні №8, що розташований у правій стороні головної алеї павільйонів ВДНГ.
            </p>
            <p>
              Дістатися до головного входу ВДНГ можна на метро (станція &quot;Виставковий центр&quot;) або на автомобілі, для яких поруч розташована велика платна парковка.
            </p>

            <GoogleMapComponent className="mt-6" />
          </TextSection>

          <TextSection id="faq" heading="Питання та відповіді" imageUrl={!isMobileDevice ? "/img/main-kiss.jpg" : undefined}>
            <div className="flex flex-col gap-14">
              <QuestionAndAnswer
                question="Як пройти в ресторан після закінчення церемонії?"
                answer="Після закінчення церемонії організатори проведуть вас до ресторану 'Hay Loft 2.0', але для найдопитливіших гостей ми підготували детальну інструкцію. З центрального входу РАГС №1 йдіть ліворуч по головній алеї павільйонів ВДНГ. Поверніть ліворуч та прямуйте до головного входу, але поверніть одразу перед малим парканом. Прямуйте приблизно 20-30 метрів та ви побачите одноповерхову будівлю ресторану праворуч."
              />

              <QuestionAndAnswer
                question="Скільки локацій на весіллі?"
                answer="Наше весілля проходитиме у двох локаціях: урочиста частина в РАГС №1 на ВДНГ, а святковий банкет у ресторані 'Hay Loft 2.0', що біля центрального входу."
              />

              <QuestionAndAnswer
                question="Що мені вдягати на весілля? Чи є у вас обовʼязковий дрес-код?"
                answer="Наше весілля буде проводитися у стилі бохо, тому ми просимо вас дотримуватися декількох правил, які описані у секції 'Дрес код'. Таким чином, усі фотографії будуть гармонійними та стильними."
              />

              <QuestionAndAnswer
                question="Де зупинитися гостям?"
                answer="Поруч з РАГС №1 на ВДНГ розташована велика платна парковка. Також можна скористатися громадським транспортом — найближча станція метро 'Виставковий центр'."
              />

              <QuestionAndAnswer
                question="Коли дарувати подарунки?"
                answer="Поруч з РАГС №1 на ВДНГ розташована велика платна парковка. Також можна скористатися громадським транспортом — найближча станція метро 'Виставковий центр'."
              />

              <QuestionAndAnswer
                question="Чи варто з подарунком дарувати квіти?"
                answer="Насправді, ми хочемо провести наше весілля з меншим негативним впливом на природу, тому за бажання ви можете дарувати ароматичні свічки."
              />

              <QuestionAndAnswer
                question="До котрої години працюватиме фотограф?"
                answer="Фотограф працюватиме до Першого танцю молодят, який заплановано на 17:00."
              />

              <QuestionAndAnswer
                question="До котрої години працюватиме ресторан?"
                answer="Ресторан працюватиме до 22:00. Ми подбаємо про те, щоб усі відчували себе комфортно та затишно."
              />

              <QuestionAndAnswer
                question="Де залишити автомобіль?"
                answer="Поруч з центральним входом на ВДНГ розташована велика платна парковка, трохи поруч також наявні місця для безкоштовної парковки."
              />

              <QuestionAndAnswer
                question="Чи можна проводити фото- чи відео-зйомку?"
                answer="Так, ми вітаємо фото- та відео-зйомку на нашому святі! Також ми будемо дуже раді, якщо ви поділитеся своїми фотографіями та відео з нами після заходу. Використовуйте надані нижче QR-код або посилання для завантаження ваших матеріалів."
              />

              <QuestionAndAnswer
                question="Чи будуть доступні фото- та відео-матеріали опісля весілля?"
                answer="Авжеж! Ми надамо всі матеріали фотографа, відеографа, а також самих гостей через декілька днів після заходу."
              />
            </div>
          </TextSection>

          <TextSection id="photo-upload" heading="Фотографії з події" imageUrl={!isMobile() ? "/img/main-kiss.jpg" : undefined}>
            <p className="mb-2">
              Заздалегідь просимо усіх гостей робити якомога більше фотографій під час події, і опісля весілля завантажити їх на платформу для обміну фотографіями.
            </p>
            <p className="mb-4">
              Також ви можете переглянути та завантажити фотографії, що зробили інші гості.
            </p>
            <p className="text-sm text-gray-400">
              ⏳ Посилання на платформу для обміну фотографіями буде доступним в цій секції після весілля ⏳
            </p>
            {/* <a
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUJcmljayByb2xs"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full max-w-3xs mx-auto aspect-square mb-2 hover:shadow-lg">
              <Image
                src="/pictures/image-sharing-qr.png"
                alt="QR Code for photo upload"
                width={400}
                height={400}
                className="w-full h-full object-contain"
              />
            </a>
            <p className='mb-6 text-gray-400 text-sm'>
              Для переходу на платформу для обміну фотографіями, відскануйте QR-код камерою телефону або натисніть на нього
            </p> */}
            {/* <p>
              Посилання на матеріали нашого фотографа:
            </p>
            <p>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 underline cursor-not-allowed pointer-events-none"
              >
                ⏳ скоро стане доступним ⏳
              </a>
            </p> */}
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
