'use client';

import { useState } from 'react';
import { Provincia } from '@/types';

interface MapaCostaRicaProps {
  resultados: {
    [provincia: string]: {
      ganador: string;
      color: string;
      porcentaje: number;
    };
  };
  onProvinciaClick?: (provincia: Provincia) => void;
}

export default function MapaCostaRica({ resultados, onProvinciaClick }: MapaCostaRicaProps) {
  const [hoveredProvincia, setHoveredProvincia] = useState<string | null>(null);

  const getProvinciaColor = (provincia: string) => {
    return resultados[provincia]?.color || '#e5e7eb';
  };

  return (
    <div className="relative">
      <svg
        viewBox="0 0 800 400"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Guanacaste */}
        <path
          d="M 50 100 L 150 80 L 200 100 L 220 150 L 180 180 L 100 170 L 60 140 Z"
          fill={getProvinciaColor('Guanacaste')}
          stroke="#1f2937"
          strokeWidth="2"
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => onProvinciaClick?.('Guanacaste')}
          onMouseEnter={() => setHoveredProvincia('Guanacaste')}
          onMouseLeave={() => setHoveredProvincia(null)}
        />
        
        {/* Alajuela */}
        <path
          d="M 200 100 L 280 90 L 320 120 L 300 180 L 250 190 L 220 150 Z"
          fill={getProvinciaColor('Alajuela')}
          stroke="#1f2937"
          strokeWidth="2"
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => onProvinciaClick?.('Alajuela')}
          onMouseEnter={() => setHoveredProvincia('Alajuela')}
          onMouseLeave={() => setHoveredProvincia(null)}
        />
        
        {/* Heredia */}
        <path
          d="M 280 90 L 350 85 L 370 130 L 340 160 L 300 180 L 280 140 Z"
          fill={getProvinciaColor('Heredia')}
          stroke="#1f2937"
          strokeWidth="2"
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => onProvinciaClick?.('Heredia')}
          onMouseEnter={() => setHoveredProvincia('Heredia')}
          onMouseLeave={() => setHoveredProvincia(null)}
        />
        
        {/* San José */}
        <path
          d="M 250 190 L 300 180 L 340 160 L 380 190 L 360 240 L 280 250 L 240 220 Z"
          fill={getProvinciaColor('San José')}
          stroke="#1f2937"
          strokeWidth="2"
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => onProvinciaClick?.('San José')}
          onMouseEnter={() => setHoveredProvincia('San José')}
          onMouseLeave={() => setHoveredProvincia(null)}
        />
        
        {/* Cartago */}
        <path
          d="M 340 160 L 420 150 L 450 190 L 420 230 L 380 240 L 340 200 Z"
          fill={getProvinciaColor('Cartago')}
          stroke="#1f2937"
          strokeWidth="2"
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => onProvinciaClick?.('Cartago')}
          onMouseEnter={() => setHoveredProvincia('Cartago')}
          onMouseLeave={() => setHoveredProvincia(null)}
        />
        
        {/* Limón */}
        <path
          d="M 420 150 L 520 140 L 580 180 L 560 260 L 480 280 L 420 230 Z"
          fill={getProvinciaColor('Limón')}
          stroke="#1f2937"
          strokeWidth="2"
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => onProvinciaClick?.('Limón')}
          onMouseEnter={() => setHoveredProvincia('Limón')}
          onMouseLeave={() => setHoveredProvincia(null)}
        />
        
        {/* Puntarenas */}
        <path
          d="M 100 170 L 180 180 L 240 220 L 280 250 L 300 320 L 200 350 L 100 330 L 50 280 L 60 200 Z"
          fill={getProvinciaColor('Puntarenas')}
          stroke="#1f2937"
          strokeWidth="2"
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => onProvinciaClick?.('Puntarenas')}
          onMouseEnter={() => setHoveredProvincia('Puntarenas')}
          onMouseLeave={() => setHoveredProvincia(null)}
        />
        
        {/* Province Labels */}
        <text x="130" y="130" textAnchor="middle" className="text-xs font-bold fill-gray-700 pointer-events-none">Guanacaste</text>
        <text x="260" y="140" textAnchor="middle" className="text-xs font-bold fill-gray-700 pointer-events-none">Alajuela</text>
        <text x="320" y="120" textAnchor="middle" className="text-xs font-bold fill-gray-700 pointer-events-none">Heredia</text>
        <text x="300" y="215" textAnchor="middle" className="text-xs font-bold fill-gray-700 pointer-events-none">San José</text>
        <text x="390" y="195" textAnchor="middle" className="text-xs font-bold fill-gray-700 pointer-events-none">Cartago</text>
        <text x="490" y="210" textAnchor="middle" className="text-xs font-bold fill-gray-700 pointer-events-none">Limón</text>
        <text x="180" y="270" textAnchor="middle" className="text-xs font-bold fill-gray-700 pointer-events-none">Puntarenas</text>
      </svg>
      
      {/* Tooltip */}
      {hoveredProvincia && resultados[hoveredProvincia] && (
        <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg border-2 border-gray-200 z-10">
          <h4 className="font-bold text-lg mb-2">{hoveredProvincia}</h4>
          <p className="text-sm">
            <span className="font-semibold">Ganador:</span> {resultados[hoveredProvincia].ganador}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Porcentaje:</span> {resultados[hoveredProvincia].porcentaje}%
          </p>
        </div>
      )}
    </div>
  );
}
