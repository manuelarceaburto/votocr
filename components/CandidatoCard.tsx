import Link from 'next/link';
import Image from 'next/image';
import { Candidato } from '@/types';

interface CandidatoCardProps {
  candidato: Candidato;
}

export default function CandidatoCard({ candidato }: CandidatoCardProps) {
  return (
    <Link href={`/candidatos/${candidato.slug}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer h-full">
        <div className="relative h-48 bg-gray-200">
          <img
            src={candidato.foto}
            alt={candidato.nombre}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {candidato.nombre}
          </h3>
          
          <div 
            className="inline-block px-3 py-1 rounded-full text-white text-sm font-semibold mb-3"
            style={{ backgroundColor: candidato.colorPartido }}
          >
            {candidato.partidoAbreviatura}
          </div>
          
          <p className="text-gray-600 text-sm mb-3">
            {candidato.partido}
          </p>
          
          <p className="text-gray-700 line-clamp-3">
            {candidato.biografia}
          </p>
          
          <div className="mt-4 text-cr-blue font-semibold">
            Ver más →
          </div>
        </div>
      </div>
    </Link>
  );
}
