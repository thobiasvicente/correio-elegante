// app/api/send-message/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { CorreioEleganteEmailTemplate } from '@/app/components/email-template';
import { ratelimit, ipRateLimit, getClientIP } from '@/lib/rate-limit';

const resend = new Resend(process.env.RESEND_API_KEY);

// Verificar hCaptcha
async function verifyHCaptcha(token: string): Promise<boolean> {
  try {
    const response = await fetch('https://hcaptcha.com/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: process.env.HCAPTCHA_SECRET_KEY!,
        response: token,
      }),
    });

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Erro ao verificar hCaptcha:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // 1. Obter IP do cliente
    const clientIP = getClientIP(request);

    // 2. Verificar rate limiting por IP
    const ipResult = await ipRateLimit.limit(clientIP);
    if (!ipResult.success) {
      return NextResponse.json(
          {
            message: `Muitos emails enviados. Tente novamente em ${Math.ceil(ipResult.reset / 1000 / 60)} minutos.`,
            error: 'rate_limit_exceeded'
          },
          { status: 429 }
      );
    }

    // 3. Parse do body
    const { email, message, captchaToken } = await request.json();

    // 4. Validações básicas
    if (!email || !message || !captchaToken) {
      return NextResponse.json(
          { message: 'Email, mensagem e verificação de segurança são obrigatórios.' },
          { status: 400 }
      );
    }

    // 5. Verificar hCaptcha
    const captchaValid = await verifyHCaptcha(captchaToken);
    if (!captchaValid) {
      return NextResponse.json(
          { message: 'Verificação de segurança falhou. Tente novamente.' },
          { status: 400 }
      );
    }

    // 6. Rate limiting por email
    const emailResult = await ratelimit.limit(email.toLowerCase());
    if (!emailResult.success) {
      return NextResponse.json(
          {
            message: `Limite de emails atingido para este endereço. Tente novamente em ${Math.ceil(emailResult.reset / 1000 / 60)} minutos.`,
            error: 'email_rate_limit'
          },
          { status: 429 }
      );
    }

    // 7. Validação adicional do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
          { message: 'Email inválido.' },
          { status: 400 }
      );
    }

    // 8. Validação da mensagem
    if (message.length > 500) {
      return NextResponse.json(
          { message: 'Mensagem muito longa. Máximo 500 caracteres.' },
          { status: 400 }
      );
    }

    // 9. Filtro básico de conteúdo (opcional)
    const forbiddenWords = ['spam', 'viagra', 'casino'];
    const containsForbidden = forbiddenWords.some(word =>
        message.toLowerCase().includes(word.toLowerCase())
    );

    if (containsForbidden) {
      return NextResponse.json(
          { message: 'Mensagem contém conteúdo não permitido.' },
          { status: 400 }
      );
    }

    // 10. Enviar email
    const { data, error } = await resend.emails.send({
      from: 'Correio Elegante <noreply@seudominio.com>',
      to: [email],
      subject: '💌 Você recebeu uma mensagem no Correio Elegante',
      react: CorreioEleganteEmailTemplate({ message }),
      text: `Correio Elegante - Festa Junina\n\nVocê recebeu uma mensagem especial:\n\n"${message}"\n\nEsta mensagem foi enviada de forma anônima através do nosso sistema.\n\nFesta Junina da Lemit Brasil 🌽\n\nSistema 100% anônimo • Nenhum dado pessoal é armazenado`,
    });

    if (error) {
      console.error('Erro ao enviar email:', error);
      return NextResponse.json(
          { message: 'Erro interno. Tente novamente mais tarde.' },
          { status: 500 }
      );
    }

    // 11. Log para monitoramento (sem dados sensíveis)
    console.log(`Email enviado com sucesso. IP: ${clientIP}, Timestamp: ${new Date().toISOString()}`);

    return NextResponse.json(
        { message: 'Mensagem enviada com sucesso!' },
        { status: 200 }
    );

  } catch (error) {
    console.error('Erro na API:', error);
    return NextResponse.json(
        { message: 'Erro interno do servidor.' },
        { status: 500 }
    );
  }
}