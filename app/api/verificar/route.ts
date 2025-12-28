import { NextRequest, NextResponse } from 'next/server';
import { sendVerificationEmail } from '@/lib/email';
import { generateVerificationCode } from '@/lib/hash';
import { saveVerification, cleanupOldVerifications } from '@/lib/storage';
import { isValidEmail } from '@/lib/utils';

// Rate limiting map (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(email: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(email);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(email, { count: 1, resetTime: now + 60000 }); // 1 minute
    return true;
  }

  if (limit.count >= 3) {
    return false;
  }

  limit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Correo electrónico inválido' },
        { status: 400 }
      );
    }

    // Check rate limit
    if (!checkRateLimit(email)) {
      return NextResponse.json(
        { error: 'Demasiados intentos. Por favor espera un minuto.' },
        { status: 429 }
      );
    }

    // Clean up old verifications
    cleanupOldVerifications();

    // Generate verification code
    const code = generateVerificationCode();

    // Save verification
    saveVerification({
      email: email.toLowerCase().trim(),
      code,
      timestamp: new Date(),
      verified: false,
    });

    // Send email
    const result = await sendVerificationEmail(email, code);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Error al enviar el correo electrónico' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: 'Código enviado exitosamente',
      mock: result.mock || false,
    });
  } catch (error) {
    console.error('Error in verificar API:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
