import { NextRequest, NextResponse } from 'next/server';
import { getVerification, saveVerification } from '@/lib/storage';
import { generateToken } from '@/lib/hash';
import { isValidCode } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: 'Email y código son requeridos' },
        { status: 400 }
      );
    }

    if (!isValidCode(code)) {
      return NextResponse.json(
        { error: 'Código inválido' },
        { status: 400 }
      );
    }

    // Get verification
    const verification = getVerification(email.toLowerCase().trim());

    if (!verification) {
      return NextResponse.json(
        { error: 'No se encontró verificación para este email' },
        { status: 404 }
      );
    }

    // Check if code matches
    if (verification.code !== code) {
      return NextResponse.json(
        { error: 'Código incorrecto' },
        { status: 400 }
      );
    }

    // Check if code is expired (10 minutes)
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const verificationTime = new Date(verification.timestamp);

    if (verificationTime < tenMinutesAgo) {
      return NextResponse.json(
        { error: 'El código ha expirado. Solicita uno nuevo.' },
        { status: 400 }
      );
    }

    // Generate token
    const token = generateToken();

    // Update verification
    saveVerification({
      ...verification,
      verified: true,
      token,
    });

    return NextResponse.json({
      success: true,
      token,
    });
  } catch (error) {
    console.error('Error in confirmar API:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
