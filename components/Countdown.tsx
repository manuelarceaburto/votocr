'use client';

import { useState, useEffect } from 'react';
import { getTimeRemaining } from '@/lib/utils';

export default function Countdown() {
  const targetDate = new Date('2026-02-01T00:00:00');
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(getTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (timeRemaining.total <= 0) {
    return (
      <div className="text-center">
        <p className="text-2xl font-bold text-cr-red">¡Es día de elecciones!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 text-center">
        <div className="text-4xl font-bold text-cr-blue">{timeRemaining.days}</div>
        <div className="text-sm text-gray-600 mt-1">Días</div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 text-center">
        <div className="text-4xl font-bold text-cr-blue">{timeRemaining.hours}</div>
        <div className="text-sm text-gray-600 mt-1">Horas</div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 text-center">
        <div className="text-4xl font-bold text-cr-blue">{timeRemaining.minutes}</div>
        <div className="text-sm text-gray-600 mt-1">Minutos</div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 text-center">
        <div className="text-4xl font-bold text-cr-blue">{timeRemaining.seconds}</div>
        <div className="text-sm text-gray-600 mt-1">Segundos</div>
      </div>
    </div>
  );
}
