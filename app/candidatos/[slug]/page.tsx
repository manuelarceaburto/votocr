import { notFound } from 'next/navigation';
import Link from 'next/link';
import { candidatos } from '@/data/candidatos';

export async function generateStaticParams() {
  return candidatos.map((candidato) => ({
    slug: candidato.slug,
  }));
}

export default function CandidatoPage({ params }: { params: { slug: string } }) {
  const candidato = candidatos.find((c) => c.slug === params.slug);

  if (!candidato) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link 
          href="/candidatos"
          className="inline-flex items-center text-cr-blue hover:underline mb-6"
        >
          ← Volver a candidatos
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header Section */}
          <div 
            className="p-8 text-white"
            style={{ backgroundColor: candidato.colorPartido }}
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img
                src={candidato.foto}
                alt={candidato.nombre}
                className="w-48 h-48 rounded-full border-4 border-white shadow-lg object-cover"
              />
              <div className="text-center md:text-left">
                <h1 className="text-4xl font-bold mb-2">{candidato.nombre}</h1>
                <p className="text-xl opacity-90 mb-2">{candidato.partido}</p>
                <div className="inline-block bg-white text-gray-800 px-4 py-2 rounded-full font-semibold">
                  {candidato.partidoAbreviatura}
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            {/* Biography */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Biografía</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {candidato.biografia}
              </p>
            </section>

            {/* Proposals */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Propuestas de Gobierno
              </h2>
              <ul className="space-y-3">
                {candidato.propuestas.map((propuesta, index) => (
                  <li 
                    key={index}
                    className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
                  >
                    <span 
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: candidato.colorPartido }}
                    >
                      {index + 1}
                    </span>
                    <span className="text-gray-700 pt-1">{propuesta}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Call to Action */}
            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
              <p className="text-gray-600 mb-4">
                ¿Te convencen estas propuestas?
              </p>
              <Link
                href="/encuesta"
                className="inline-block bg-cr-red text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition-colors"
              >
                Participar en la Encuesta
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
