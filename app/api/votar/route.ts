import { NextRequest, NextResponse } from 'next/server';
import { getVerificationByToken, hasVoted, addVote } from '@/lib/storage';
import { hashEmail } from '@/lib/hash';
import { PROVINCIAS } from '@/types';
import { candidatos } from '@/data/candidatos';

export async function POST(request: NextRequest) {
  try {
    const { token, candidatoId, provincia } = await request.json();

    // Validate inputs
    if (!token || !candidatoId || !provincia) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Validate provincia
    if (!PROVINCIAS.includes(provincia as any)) {
      return NextResponse.json(
        { error: 'Provincia inválida' },
        { status: 400 }
      );
    }

    // Validate candidato
    const candidato = candidatos.find((c) => c.id === candidatoId);
    if (!candidato) {
      return NextResponse.json(
        { error: 'Candidato inválido' },
        { status: 400 }
      );
    }

    // Get verification by token
    const verification = getVerificationByToken(token);

    if (!verification) {
      return NextResponse.json(
        { error: 'Token inválido o expirado' },
        { status: 401 }
      );
    }

    // Hash email
    const emailHash = hashEmail(verification.email);

    // Check if already voted
    if (hasVoted(emailHash)) {
      return NextResponse.json(
        { error: 'Ya has votado anteriormente' },
        { status: 400 }
      );
    }

    // Add vote
    addVote({
      id: Date.now().toString(),
      emailHash,
      candidatoId,
      provincia,
      timestamp: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: 'Voto registrado exitosamente',
    });
  } catch (error) {
    console.error('Error in votar API:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
