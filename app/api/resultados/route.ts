import { NextResponse } from 'next/server';
import { readVotes } from '@/lib/storage';
import { candidatos } from '@/data/candidatos';
import { PROVINCIAS, Resultados } from '@/types';

export async function GET() {
  try {
    const votes = readVotes();

    // Initialize results structure
    const resultados: Resultados = {
      totalVotos: votes.length,
      porProvincia: {},
      porCandidato: {},
    };

    // Initialize province data
    PROVINCIAS.forEach((provincia) => {
      resultados.porProvincia[provincia] = {
        total: 0,
        porCandidato: {},
      };
    });

    // Initialize candidate data
    candidatos.forEach((candidato) => {
      resultados.porCandidato[candidato.id] = {
        total: 0,
        porcentaje: 0,
      };
    });

    // Process votes
    votes.forEach((vote) => {
      // Count by province
      if (resultados.porProvincia[vote.provincia]) {
        resultados.porProvincia[vote.provincia].total++;
        
        if (!resultados.porProvincia[vote.provincia].porCandidato[vote.candidatoId]) {
          resultados.porProvincia[vote.provincia].porCandidato[vote.candidatoId] = 0;
        }
        resultados.porProvincia[vote.provincia].porCandidato[vote.candidatoId]++;
      }

      // Count by candidate
      if (resultados.porCandidato[vote.candidatoId]) {
        resultados.porCandidato[vote.candidatoId].total++;
      }
    });

    // Calculate percentages
    Object.keys(resultados.porCandidato).forEach((candidatoId) => {
      if (resultados.totalVotos > 0) {
        resultados.porCandidato[candidatoId].porcentaje =
          (resultados.porCandidato[candidatoId].total / resultados.totalVotos) * 100;
      }
    });

    return NextResponse.json(resultados);
  } catch (error) {
    console.error('Error in resultados API:', error);
    return NextResponse.json(
      { error: 'Error al obtener resultados' },
      { status: 500 }
    );
  }
}

// Enable revalidation every 10 seconds for real-time updates
export const revalidate = 10;
