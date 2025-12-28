import { candidatos } from '@/data/candidatos';
import CandidatoCard from '@/components/CandidatoCard';

export default function CandidatosPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Candidatos Presidenciales 2026
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conoce a los candidatos que aspiran a la presidencia de Costa Rica. 
            Explora sus biografías, partidos políticos y propuestas de gobierno.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {candidatos.map((candidato) => (
            <CandidatoCard key={candidato.id} candidato={candidato} />
          ))}
        </div>
      </div>
    </div>
  );
}
