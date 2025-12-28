import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send verification email with code
 * @param email Recipient email
 * @param code 6-digit verification code
 */
export async function sendVerificationEmail(email: string, code: string) {
  try {
    // Check if API key is configured
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'your_resend_api_key') {
      console.log('⚠️  Resend API key not configured. Email would be sent to:', email);
      console.log('📧 Verification code:', code);
      return { success: true, mock: true };
    }

    const { data, error } = await resend.emails.send({
      from: 'VotoCR <onboarding@resend.dev>', // Change this to your verified domain
      to: [email],
      subject: 'Código de Verificación - VotoCR',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #002b7f 0%, #ce1126 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .code { background: white; border: 2px solid #002b7f; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0; border-radius: 5px; color: #002b7f; }
              .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🇨🇷 VotoCR</h1>
                <p>Elecciones Presidenciales 2026</p>
              </div>
              <div class="content">
                <h2>Código de Verificación</h2>
                <p>Gracias por participar en nuestra encuesta de intención de voto.</p>
                <p>Tu código de verificación es:</p>
                <div class="code">${code}</div>
                <p>Este código es válido por 10 minutos.</p>
                <p><strong>Si no solicitaste este código, ignora este mensaje.</strong></p>
              </div>
              <div class="footer">
                <p>VotoCR - Plataforma de Información Electoral</p>
                <p>Este es un sistema de encuestas anónimas. Tu voto es confidencial.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error in sendVerificationEmail:', error);
    return { success: false, error };
  }
}
