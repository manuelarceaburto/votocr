'use client';

import { useState } from 'react';
import { isValidEmail } from '@/lib/utils';

interface VerificacionEmailProps {
  onVerified: (token: string) => void;
}

export default function VerificacionEmail({ onVerified }: VerificacionEmailProps) {
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!isValidEmail(email)) {
      setError('Por favor ingresa un correo electrónico válido');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/verificar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el código');
      }

      setStep('code');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (code.length !== 6) {
      setError('El código debe tener 6 dígitos');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/confirmar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Código inválido');
      }

      onVerified(data.token);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (step === 'email') {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Verificación de Email
        </h2>
        <p className="text-gray-600 mb-6">
          Para participar en la encuesta, necesitamos verificar tu correo electrónico. 
          Recibirás un código de verificación de 6 dígitos.
        </p>

        <form onSubmit={handleSendCode}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cr-blue focus:border-transparent"
              placeholder="tu@email.com"
              required
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cr-blue text-white py-3 rounded-md font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Enviando...' : 'Enviar Código'}
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-4">
          Tu correo será utilizado únicamente para verificación. No almacenamos tu dirección de correo.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Ingresa el Código
      </h2>
      <p className="text-gray-600 mb-6">
        Hemos enviado un código de 6 dígitos a <strong>{email}</strong>
      </p>

      <form onSubmit={handleVerifyCode}>
        <div className="mb-4">
          <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
            Código de Verificación
          </label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-center text-2xl tracking-widest focus:ring-2 focus:ring-cr-blue focus:border-transparent"
            placeholder="000000"
            maxLength={6}
            required
          />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || code.length !== 6}
          className="w-full bg-cr-blue text-white py-3 rounded-md font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-50"
        >
          {loading ? 'Verificando...' : 'Verificar'}
        </button>

        <button
          type="button"
          onClick={() => setStep('email')}
          className="w-full mt-3 text-cr-blue hover:underline"
        >
          Cambiar correo electrónico
        </button>
      </form>

      <p className="text-xs text-gray-500 mt-4">
        El código es válido por 10 minutos.
      </p>
    </div>
  );
}
