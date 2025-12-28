import Link from 'next/link';
import Countdown from '@/components/Countdown';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cr-blue via-cr-blue to-cr-red text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            🇨🇷 Elecciones Presidenciales 2026
          </h1>
          <p className="text-xl md:text-2xl mb-4">
            Costa Rica va a las urnas
          </p>
          <p className="text-lg mb-12">
            1 de Febrero, 2026
          </p>
          
          <div className="mb-8">
            <Countdown />
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              ¿Qué es VotoCR?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              VotoCR es una plataforma de información electoral que te permite conocer a los candidatos 
              presidenciales y participar en encuestas de intención de voto de manera anónima y segura.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Conoce a los Candidatos
              </h3>
              <p className="text-gray-600 mb-4">
                Información detallada sobre cada candidato presidencial, su partido y propuestas.
              </p>
              <Link 
                href="/candidatos"
                className="inline-block bg-cr-blue text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors"
              >
                Ver Candidatos
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-5xl mb-4">🗳️</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Participa en la Encuesta
              </h3>
              <p className="text-gray-600 mb-4">
                Comparte tu intención de voto de forma anónima con verificación por email.
              </p>
              <Link 
                href="/encuesta"
                className="inline-block bg-cr-red text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors"
              >
                Votar Ahora
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Resultados en Tiempo Real
              </h3>
              <p className="text-gray-600 mb-4">
                Mapa interactivo con los resultados de la encuesta por provincia.
              </p>
              <Link 
                href="/mapa"
                className="inline-block bg-cr-blue text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors"
              >
                Ver Resultados
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Privacidad y Seguridad
            </h2>
            <div className="bg-white rounded-lg shadow-md p-8">
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span>
                    <strong>Anonimato Garantizado:</strong> No almacenamos tu correo electrónico. 
                    Solo guardamos un hash irreversible para evitar votos duplicados.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span>
                    <strong>Verificación por Email:</strong> Un código de 6 dígitos asegura que eres 
                    una persona real.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span>
                    <strong>Un Voto por Persona:</strong> El sistema evita que una persona vote 
                    múltiples veces.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span>
                    <strong>Encuesta No Oficial:</strong> Los resultados son indicativos y no 
                    representan resultados oficiales del TSE.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
