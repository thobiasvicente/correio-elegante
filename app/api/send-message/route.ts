import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { CorreioEleganteEmailTemplate } from '../../components/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email, message } = await request.json();

    if (!email || !message) {
      return NextResponse.json(
        { message: 'Email e mensagem são obrigatórios' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Formato de email inválido' },
        { status: 400 }
      );
    }

    if (message.length > 500) {
      return NextResponse.json(
        { message: 'Mensagem muito longa (máximo 500 caracteres)' },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY não configurada');
      return NextResponse.json(
        { message: 'Erro de configuração do servidor' },
        { status: 500 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Correio Elegante <noreply@thobias.dev>',
      to: [email],
      subject: '💌 Você recebeu uma mensagem no Correio Elegante',
      react: CorreioEleganteEmailTemplate({ message }),
      text: `Correio Elegante - Festa Junina\n\nVocê recebeu uma mensagem especial:\n\n"${message}"\n\nEsta mensagem foi enviada de forma anônima através do nosso sistema.\n\nFesta Junina da Lemit Brasil 🌽\n\nSistema 100% anônimo • Nenhum dado pessoal é armazenado`,
    });

    if (error) {
      console.error('Erro do Resend:', error);
      return NextResponse.json(
        { message: 'Erro ao enviar email. Tente novamente.' },
        { status: 500 }
      );
    }

    console.log(`Email enviado via Resend - ID: ${data?.id} - Domínio: ${email.split('@')[1]} - ${new Date().toISOString()}`);

    return NextResponse.json({ 
      message: 'Mensagem enviada com sucesso!',
      id: data?.id,
    });

  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor. Tente novamente mais tarde.' },
      { status: 500 }
    );
  }
}
