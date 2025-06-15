# 💌 Correio Elegante - Festa Junina

Um sistema simples e anônimo para envio de mensagens carinhosas durante a festa junina da Lemit Brasil.

## ✨ Características

- **100% Anônimo**: Não armazena dados pessoais dos remetentes
- **Simples e Intuitivo**: Interface limpa e fácil de usar
- **Responsivo**: Funciona perfeitamente em dispositivos móveis e desktop
- **Tema Festa Junina**: Visual alegre e temático
- **Código Aberto**: Transparência total sobre como funciona
- **Seguro**: Validações de segurança e rate limiting

## 🚀 Como funciona

1. O usuário acessa o site
2. Digita o email da pessoa destinatária
3. Escreve uma mensagem carinhosa (até 500 caracteres)
4. Clica em enviar
5. A mensagem é enviada diretamente por email, sem armazenar dados

## 📋 Pré-requisitos

- Node.js 18+
- Uma conta de email para envio (Gmail, Outlook, etc.)

## ⚙️ Configuração

### 1. Clone e instale dependências

```bash
git clone [url-do-repositorio]
cd correio-elegante
npm install
```

### 2. Configure as variáveis de ambiente

```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` com sua API key do Resend:

```env
RESEND_API_KEY=re_sua_api_key_aqui
```

### 3. Configuração do Resend

1. Acesse [resend.com](https://resend.com) e faça login/cadastro
2. Vá em "API Keys" no dashboard
3. Clique em "Create API Key"
4. Dê um nome (ex: "Correio Elegante")
5. Copie a chave gerada e cole no arquivo `.env.local`

### 4. Teste a configuração

```bash
npm run test:resend
```

Este comando testará se sua API key está funcionando corretamente.

### 5. Execute o projeto

```bash
npm run dev
```

Acesse `http://localhost:3000`

## 🛠️ Tecnologias Utilizadas

- **Next.js 15**: Framework React para produção
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Estilização
- **Lucide React**: Ícones
- **Resend**: Envio de emails com React templates
- **React 19**: Biblioteca de UI

## 🎨 Funcionalidades

### Interface do Usuário
- Design responsivo e moderno
- Tema visual de festa junina
- Animações suaves e agradáveis
- Feedback visual para ações do usuário
- Validação em tempo real de formulários

### Segurança e Privacidade
- Validação rigorosa de emails
- Sanitização de mensagens
- Rate limiting para prevenir spam
- Nenhum dado armazenado no servidor
- Headers de segurança configurados

### Email Template
- Template HTML responsivo
- Design temático festa junina
- Fallback em texto simples
- Informações claras sobre anonimato

## 🔒 Privacidade e Segurança

Este sistema foi projetado com privacidade em mente:

- **Sem logs de usuário**: Não registramos IPs ou dados de sessão
- **Sem banco de dados**: Mensagens não são armazenadas
- **Processamento direto**: Emails são enviados imediatamente
- **Código transparente**: Todo o código é aberto para auditoria
- **HTTPS obrigatório**: Todas as comunicações são criptografadas

## 📁 Estrutura do Projeto

```
correio-elegante/
├── app/
│   ├── api/
│   │   └── send-message/
│   │       └── route.ts          # API para envio de emails
│   ├── globals.css               # Estilos globais e tema
│   ├── layout.tsx                # Layout principal
│   └── page.tsx                  # Página principal
├── public/                       # Arquivos estáticos
├── .env.example                  # Exemplo de variáveis de ambiente
├── package.json                  # Dependências
└── README.md                     # Este arquivo
```

## 🚀 Deploy

### Vercel (Recomendado)

1. Faça push do código para GitHub
2. Conecte seu repositório no Vercel
3. Adicione as variáveis de ambiente no painel do Vercel
4. Deploy automático!

### Outras Plataformas

O projeto é compatível com:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🎯 Customização

### Cores e Tema
Edite as variáveis CSS em `app/globals.css`:

```css
:root {
  --color-junina-yellow: #f59e0b;
  --color-junina-red: #dc2626;
  --color-junina-green: #16a34a;
  /* ... outras cores */
}
```

### Template de Email
Personalize o template em `app/api/send-message/route.ts`:

```typescript
const htmlTemplate = `
  <!-- Seu template HTML personalizado -->
`;
```

### Validações
Ajuste limites e validações conforme necessário:

```typescript
// Limitar tamanho da mensagem
if (message.length > 500) {
  // Sua lógica
}
```

## 🔧 Configurações Avançadas

### Rate Limiting
Para produção, considere implementar rate limiting:

```bash
npm install @upstash/ratelimit @upstash/redis
```

### Monitoring
Adicione monitoramento com:
- Sentry (erros)
- Vercel Analytics (performance)
- Uptime monitoring

### Backup
Configure backup das configurações:
- Variáveis de ambiente
- Configurações de DNS
- Certificados SSL

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📜 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## ❓ FAQ

### Como garantir que é realmente anônimo?
O código é completamente aberto e pode ser auditado. Não há logs, banco de dados ou qualquer mecanismo de rastreamento.

### Posso usar outros provedores de email?
Sim! Funciona com qualquer provedor SMTP. Ajuste as configurações no `.env.local`.

### Como prevenir spam?
O sistema inclui validações básicas. Para produção, considere implementar rate limiting e captcha.

### Posso customizar o visual?
Totalmente! Edite os estilos em `globals.css` e componentes em `page.tsx`.

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique a seção FAQ acima
2. Abra uma issue no GitHub
3. Entre em contato com a equipe de TI

## 🎉 Créditos

Feito com ❤️ para a festa junina da Lemit Brasil!

- Design inspirado nas tradições juninas brasileiras
- Ícones por [Lucide](https://lucide.dev/)
- Powered by [Next.js](https://nextjs.org/)

---

**Divirta-se espalhando alegria! 🌽💛**
