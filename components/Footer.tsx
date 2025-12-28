export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              <span className="text-2xl">🇨🇷</span>
              <span>VotoCR</span>
            </h3>
            <p className="text-gray-300">
              Plataforma de información electoral para las elecciones presidenciales de Costa Rica 2026.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-3">Enlaces</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="/" className="hover:text-cr-red transition-colors">Inicio</a>
              </li>
              <li>
                <a href="/candidatos" className="hover:text-cr-red transition-colors">Candidatos</a>
              </li>
              <li>
                <a href="/encuesta" className="hover:text-cr-red transition-colors">Encuesta</a>
              </li>
              <li>
                <a href="/mapa" className="hover:text-cr-red transition-colors">Resultados</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-3">Información</h4>
            <p className="text-gray-300 text-sm">
              Esta es una plataforma de encuestas de intención de voto. Los resultados son indicativos y no representan resultados oficiales.
            </p>
            <p className="text-gray-300 text-sm mt-2">
              Tu voto es anónimo y confidencial.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} VotoCR. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
