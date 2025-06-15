// app/api/send-message/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { CorreioEleganteEmailTemplate } from '@/app/components/email-template';
import { ratelimit, ipRateLimit, getClientIP } from '@/lib/rate-limit';

const resend = new Resend(process.env.RESEND_API_KEY);

// Verificar Google ReCAPTCHA
async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY!,
        response: token,
      }),
    });

    const data = await response.json();

    // Log para debug (remover em produção)
    console.log('ReCAPTCHA verification result:', {
      success: data.success,
      score: data.score,
      action: data.action,
      challenge_ts: data.challenge_ts,
      hostname: data.hostname,
      'error-codes': data['error-codes']
    });

    return data.success;
  } catch (error) {
    console.error('Erro ao verificar ReCAPTCHA:', error);
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
            message: `Muitos emails enviados deste IP. Tente novamente em ${Math.ceil(ipResult.reset / 1000 / 60)} minutos.`,
            error: 'rate_limit_exceeded',
            remainingTime: ipResult.reset
          },
          { status: 429 }
      );
    }

    // 3. Parse do body
    const { email, message, captchaToken } = await request.json();

    // 4. Validações básicas
    if (!email || !message) {
      return NextResponse.json(
          { message: 'Email e mensagem são obrigatórios.' },
          { status: 400 }
      );
    }

    if (!captchaToken) {
      return NextResponse.json(
          { message: 'Verificação de segurança é obrigatória.' },
          { status: 400 }
      );
    }

    // 5. Verificar ReCAPTCHA
    const captchaValid = await verifyRecaptcha(captchaToken);
    if (!captchaValid) {
      return NextResponse.json(
          {
            message: 'Verificação de segurança falhou. Tente novamente.',
            error: 'captcha_failed'
          },
          { status: 400 }
      );
    }

    // 6. Rate limiting por email
    const emailResult = await ratelimit.limit(email.toLowerCase());
    if (!emailResult.success) {
      return NextResponse.json(
          {
            message: `Limite de emails atingido para este endereço. Tente novamente em ${Math.ceil(emailResult.reset / 1000 / 60)} minutos.`,
            error: 'email_rate_limit',
            remainingTime: emailResult.reset
          },
          { status: 429 }
      );
    }

    // 7. Validação adicional do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
          { message: 'Formato de email inválido.' },
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

    if (message.length < 10) {
      return NextResponse.json(
          { message: 'Mensagem muito curta. Mínimo 10 caracteres.' },
          { status: 400 }
      );
    }

    // 9. Filtro básico de conteúdo
    const forbiddenWords = ['spam', 'viagra', 'casino', 'bitcoin', 'crypto'];
    const containsForbidden = forbiddenWords.some(word =>
        message.toLowerCase().includes(word.toLowerCase())
    );

    if (containsForbidden) {
      return NextResponse.json(
          { message: 'Mensagem contém conteúdo não permitido.' },
          { status: 400 }
      );
    }

    // 10. Verificar se é email da Lemit (opcional - adicionar validação)
    const isLemitEmail = email.toLowerCase().includes('lemitbrasil.com') ||
        email.toLowerCase().includes('lemit.com.br');

    if (!isLemitEmail) {
      console.log(`Email externo detectado: ${email}`);
      // Você pode decidir se quer permitir ou não emails externos
    }

    // 11. Enviar email
    const { data, error } = await resend.emails.send({
      from: 'Correio Elegante <noreply@seudominio.com>',
      to: [email],
      subject: '💌 Você recebeu uma mensagem no Correio Elegante - Festa Junina Lemit Brasil',
      react: CorreioEleganteEmailTemplate({ message }),
      text: `Correio Elegante - Festa Junina da Lemit Brasil\n\nVocê recebeu uma mensagem especial:\n\n"${message}"\n\nEsta mensagem foi enviada de forma anônima através do nosso sistema.\n\n🌽 Festa Junina da Lemit Brasil 🌽\n\nSistema 100% anônimo • Nenhum dado pessoal é armazenado`,
    });

    if (error) {
      console.error('Erro ao enviar email:', error);
      return NextResponse.json(
          {
            message: 'Erro interno do servidor. Tente novamente mais tarde.',
            error: 'email_send_failed'
          },
          { status: 500 }
      );
    }

    // 12. Log para monitoramento (sem dados sensíveis)
    console.log(`✅ Email enviado com sucesso`, {
      timestamp: new Date().toISOString(),
      ip: clientIP,
      emailDomain: email.split('@')[1],
      messageLength: message.length,
      isLemitEmail
    });

    return NextResponse.json(
        {
          message: 'Mensagem enviada com sucesso! 🎉',
          success: true
        },
        { status: 200 }
    );

  } catch (error) {
    console.error('Erro na API:', error);
    return NextResponse.json(
        {
          message: 'Erro interno do servidor.',
          error: 'internal_error'
        },
        { status: 500 }
    );
  }
}