import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
}

interface WeddingCountdown {
  timeLeft: TimeLeft;
  phase: 'before' | 'during' | 'after';
  displayText: string;
  formattedCountdown: string;
}

// Wedding constants
const WEDDING_START = new Date('2025-09-03T13:15:00+03:00'); // 13:15 CET+1
const WEDDING_END = new Date('2025-09-03T22:00:00+03:00'); // 22:00 CET+1

// Phase texts
const PHASE_TEXTS = {
  during: 'КАЗКА ВІДБУВАЄТЬСЯ ЗАРАЗ',
  after: 'Наречені тепер одна сімʼя'
};

export function useCountdown(): WeddingCountdown {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0 });
  const [phase, setPhase] = useState<'before' | 'during' | 'after'>('before');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const startTime = WEDDING_START.getTime();
      const endTime = WEDDING_END.getTime();
      const currentTime = now.getTime();

      if (currentTime < startTime) {
        // Before wedding
        setPhase('before');
        const difference = startTime - currentTime;

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

          setTimeLeft({ days, hours, minutes });
        }
      } else if (currentTime >= startTime && currentTime <= endTime) {
        // During wedding
        setPhase('during');
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
      } else {
        // After wedding
        setPhase('after');
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 60000);

    return () => clearInterval(timer);
  }, []);

  // Generate display text based on phase
  const displayText = phase === 'before'
    ? ''
    : PHASE_TEXTS[phase as keyof typeof PHASE_TEXTS];

  // Generate formatted countdown string
  const formattedCountdown = `${timeLeft.days} ДН ${timeLeft.hours} ГОД ${timeLeft.minutes} ХВ`;

  return {
    timeLeft,
    phase,
    displayText,
    formattedCountdown
  };
}
