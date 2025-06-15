interface EmailTemplateProps {
  message: string;
}

export const CorreioEleganteEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  message,
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
    <div style={{
      background: 'linear-gradient(135deg, #f59e0b 0%, #dc2626 25%, #16a34a 50%, #ea580c 75%, #9333ea 100%)',
      padding: '20px',
      textAlign: 'center',
      borderRadius: '15px',
      marginBottom: '20px'
    }}>
      <h1 style={{ color: 'white', margin: '0', fontSize: '28px' }}>💌 Correio Elegante</h1>
      <p style={{ color: 'white', margin: '10px 0 0 0', fontSize: '16px' }}>Festa Junina da Lemit Brasil</p>
    </div>

    <div style={{
      background: '#f9f9f9',
      padding: '30px',
      borderRadius: '15px',
      borderLeft: '5px solid #f59e0b'
    }}>
      <h2 style={{ color: '#dc2626', marginTop: '0' }}>Você recebeu uma mensagem especial! 🎉</h2>

      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        border: '2px dashed #f59e0b',
        margin: '20px 0'
      }}>
        <p style={{
          fontSize: '18px',
          lineHeight: '1.8',
          margin: '0',
          color: '#555',
          fontStyle: 'italic'
        }}>
          "{message}"
        </p>
      </div>

      <p style={{
        color: '#666',
        fontStyle: 'italic',
        textAlign: 'center',
        margin: '20px 0 0 0'
      }}>
        💛 Esta mensagem foi enviada de forma anônima através do nosso Correio Elegante
      </p>
    </div>

    <div style={{
      textAlign: 'center',
      marginTop: '30px',
      padding: '20px',
      background: '#fff3cd',
      borderRadius: '10px'
    }}>
      <h3 style={{ color: '#856404', margin: '0 0 10px 0' }}>🌽 Festa Junina da Lemit Brasil 🌽</h3>
      <p style={{ color: '#856404', margin: '0', fontSize: '14px' }}>
        Um gesto carinhoso para alegrar seu dia!
      </p>
    </div>

    <div style={{
      textAlign: 'center',
      marginTop: '20px',
      fontSize: '12px',
      color: '#999'
    }}>
      <p style={{ margin: '5px 0' }}>Este email foi enviado automaticamente pelo sistema de Correio Elegante.</p>
      <p style={{ margin: '5px 0' }}>Sistema 100% anônimo • Nenhum dado pessoal é armazenado</p>
    </div>
  </div>
);
