import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-cr-blue text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold flex items-center gap-2">
            <span className="text-3xl">🇨🇷</span>
            <span>VotoCR</span>
          </Link>
          
          <ul className="flex gap-6 items-center">
            <li>
              <Link 
                href="/" 
                className="hover:text-cr-red transition-colors"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link 
                href="/candidatos" 
                className="hover:text-cr-red transition-colors"
              >
                Candidatos
              </Link>
            </li>
            <li>
              <Link 
                href="/encuesta" 
                className="hover:text-cr-red transition-colors"
              >
                Encuesta
              </Link>
            </li>
            <li>
              <Link 
                href="/mapa" 
                className="hover:text-cr-red transition-colors"
              >
                Resultados
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
