'use client';

import { useState, useEffect } from 'react';
import MapaCostaRica from '@/components/MapaCostaRica';
import { candidatos } from '@/data/candidatos';
import { Resultados, Provincia } from '@/types';
import { formatPercentage } from '@/lib/utils';

export default function MapaPage() {
  const [resultados, setResultados] = useState<Resultados | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedProvincia, setSelectedProvincia] = useState<Provincia | null>(null);

  useEffect(() => {
    fetchResultados();
    const interval = setInterval(fetchResultados, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchResultados = async () => {
    try {
      const response = await fetch('/api/resultados');
      const data = await response.json();
      setResultados(data);
    } catch (error) {
      console.error('Error fetching results:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMapData = () => {
    if (!resultados) return {};

    const mapData: any = {};

    Object.keys(resultados.porProvincia).forEach((provincia) => {
      const provinciaData = resultados.porProvincia[provincia];
      
      if (provinciaData.total === 0) {
        mapData[provincia] = {
          ganador: 'Sin votos',
          color: '#e5e7eb',
          porcentaje: 0,
        };
        return;
      }

      // Find winner in this province
      let maxVotos = 0;
      let ganadorId = '';

      Object.keys(provinciaData.porCandidato).forEach((candidatoId) => {
        const votos = provinciaData.porCandidato[candidatoId];
        if (votos > maxVotos) {
          maxVotos = votos;
          ganadorId = candidatoId;
        }
      });

      const candidato = candidatos.find((c) => c.id === ganadorId);
      const porcentaje = (maxVotos / provinciaData.total) * 100;

      mapData[provincia] = {
        ganador: candidato ? candidato.nombre : 'Desconocido',
        color: candidato ? candidato.colorPartido : '#e5e7eb',
        porcentaje: porcentaje.toFixed(1),
      };
    });

    return mapData;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-xl text-gray-600">Cargando resultados...</p>
        </div>
      </div>
    );
  }

  const mapData = getMapData();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Resultados en Tiempo Real
          </h1>
          <p className="text-lg text-gray-600">
            Encuesta de intención de voto - Actualizado automáticamente
          </p>
        </div>

        {/* Total Votes */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white rounded-lg shadow-md px-8 py-4">
            <p className="text-sm text-gray-600 mb-1">Total de Votos</p>
            <p className="text-4xl font-bold text-cr-blue">
              {resultados?.totalVotos || 0}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Map */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Mapa por Provincia
            </h2>
            <MapaCostaRica
              resultados={mapData}
              onProvinciaClick={setSelectedProvincia}
            />
          </div>

          {/* National Results */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Resultados Nacionales
            </h2>
            <div className="space-y-3">
              {candidatos
                .map((candidato) => ({
                  ...candidato,
                  votos: resultados?.porCandidato[candidato.id]?.total || 0,
                  porcentaje: resultados?.porCandidato[candidato.id]?.porcentaje || 0,
                }))
                .sort((a, b) => b.votos - a.votos)
                .map((candidato) => (
                  <div
                    key={candidato.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
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
                            {candidato.partidoAbreviatura}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold" style={{ color: candidato.colorPartido }}>
                          {candidato.porcentaje.toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-600">
                          {candidato.votos} votos
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="h-3 rounded-full transition-all duration-500"
                        style={{
                          width: `${candidato.porcentaje}%`,
                          backgroundColor: candidato.colorPartido,
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Provincial Details */}
        {selectedProvincia && resultados && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Resultados en {selectedProvincia}
            </h2>
            <button
              onClick={() => setSelectedProvincia(null)}
              className="text-sm text-cr-blue hover:underline mb-4"
            >
              Cerrar
            </button>
            
            {resultados.porProvincia[selectedProvincia]?.total === 0 ? (
              <p className="text-gray-600">No hay votos registrados en esta provincia.</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {candidatos.map((candidato) => {
                  const votos =
                    resultados.porProvincia[selectedProvincia]?.porCandidato[candidato.id] || 0;
                  const total = resultados.porProvincia[selectedProvincia]?.total || 0;
                  const porcentaje = total > 0 ? (votos / total) * 100 : 0;

                  return (
                    <div
                      key={candidato.id}
                      className="border-2 rounded-lg p-4"
                      style={{ borderColor: candidato.colorPartido }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <img
                          src={candidato.foto}
                          alt={candidato.nombre}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="font-semibold text-sm">
                            {candidato.nombre}
                          </div>
                          <div className="text-xs text-gray-600">
                            {candidato.partidoAbreviatura}
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div
                          className="text-3xl font-bold"
                          style={{ color: candidato.colorPartido }}
                        >
                          {porcentaje.toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-600">
                          {votos} votos
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Province Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Desglose por Provincia
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Object.keys(resultados?.porProvincia || {}).map((provincia) => {
              const data = resultados!.porProvincia[provincia];
              const mapInfo = mapData[provincia];

              return (
                <button
                  key={provincia}
                  onClick={() => setSelectedProvincia(provincia as Provincia)}
                  className="border-2 border-gray-200 rounded-lg p-4 hover:border-cr-blue transition-colors text-left"
                >
                  <h3 className="font-bold text-lg mb-2">{provincia}</h3>
                  <div className="text-sm text-gray-600 mb-1">
                    Total: {data.total} votos
                  </div>
                  {data.total > 0 && (
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: mapInfo.color }}
                      />
                      <div className="text-sm">
                        <span className="font-semibold">{mapInfo.ganador}</span>
                        <br />
                        <span className="text-gray-600">{mapInfo.porcentaje}%</span>
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Estos resultados son de una encuesta no oficial y no representan resultados oficiales del TSE.
          </p>
          <p className="mt-2">
            Los datos se actualizan automáticamente cada 10 segundos.
          </p>
        </div>
      </div>
    </div>
  );
}
