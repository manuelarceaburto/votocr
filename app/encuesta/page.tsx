'use client';

import { useState } from 'react';
import { candidatos } from '@/data/candidatos';
import { PROVINCIAS } from '@/types';
import VerificacionEmail from '@/components/VerificacionEmail';

export default function EncuestaPage() {
  const [token, setToken] = useState<string | null>(null);
  const [candidatoId, setCandidatoId] = useState('');
  const [provincia, setProvincia] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!candidatoId || !provincia) {
      setError('Por favor completa todos los campos');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/votar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          candidatoId,
          provincia,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al registrar el voto');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-6xl mb-4">✓</div>
            <h1 className="text-3xl font-bold text-green-600 mb-4">
              ¡Voto Registrado!
            </h1>
            <p className="text-gray-600 mb-6">
              Gracias por participar en nuestra encuesta de intención de voto.
              Tu opinión es importante para Costa Rica.
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="/mapa"
                className="bg-cr-blue text-white px-6 py-3 rounded-md font-semibold hover:bg-opacity-90 transition-colors"
              >
                Ver Resultados
              </a>
              <a
                href="/"
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-md font-semibold hover:bg-gray-300 transition-colors"
              >
                Volver al Inicio
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Encuesta de Intención de Voto
            </h1>
            <p className="text-lg text-gray-600">
              Participa de forma anónima en nuestra encuesta
            </p>
          </div>

          <VerificacionEmail onVerified={setToken} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Tu Voto
          </h1>
          <p className="text-lg text-gray-600">
            Email verificado ✓ - Selecciona tu candidato y provincia
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
          {/* Provincia Selection */}
          <div className="mb-6">
            <label htmlFor="provincia" className="block text-sm font-medium text-gray-700 mb-2">
              Provincia de Residencia
            </label>
            <select
              id="provincia"
              value={provincia}
              onChange={(e) => setProvincia(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cr-blue focus:border-transparent"
              required
            >
              <option value="">Selecciona tu provincia</option>
              {PROVINCIAS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Candidate Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Candidato de tu Preferencia
            </label>
            <div className="space-y-3">
              {candidatos.map((candidato) => (
                <label
                  key={candidato.id}
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    candidatoId === candidato.id
                      ? 'border-cr-blue bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="candidato"
                    value={candidato.id}
                    checked={candidatoId === candidato.id}
                    onChange={(e) => setCandidatoId(e.target.value)}
                    className="mr-4 w-5 h-5 text-cr-blue"
                    required
                  />
                  <div className="flex items-center gap-4 flex-1">
                    <img
                      src={candidato.foto}
                      alt={candidato.nombre}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-800">
                        {candidato.nombre}
                      </div>
                      <div className="text-sm text-gray-600">
                        {candidato.partidoAbreviatura} - {candidato.partido}
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cr-red text-white py-3 rounded-md font-semibold text-lg hover:bg-opacity-90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Registrando...' : 'Enviar Voto'}
          </button>

          <p className="text-xs text-gray-500 mt-4 text-center">
            Tu voto es anónimo y no puede ser modificado una vez enviado.
          </p>
        </form>
      </div>
    </div>
  );
}
