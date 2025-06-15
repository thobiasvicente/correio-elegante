/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                // Aplicar headers a todas as rotas
                source: '/(.*)',
                headers: [
                    // CSP mais permissivo para desenvolvimento
                    {
                        key: 'Content-Security-Policy',
                        value: process.env.NODE_ENV === 'development'
                            ? `
                default-src 'self';
                script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com https://www.recaptcha.net;
                style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
                font-src 'self' https://fonts.gstatic.com data:;
                img-src 'self' data: https: blob:;
                connect-src 'self' https://www.google.com https://www.recaptcha.net;
                frame-src 'self' https://www.google.com https://www.recaptcha.net;
                worker-src 'self' blob:;
                object-src 'none';
              `.replace(/\s+/g, ' ').trim()
                            : `
                default-src 'self';
                script-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com https://www.recaptcha.net;
                style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
                font-src 'self' https://fonts.gstatic.com;
                img-src 'self' data: https:;
                connect-src 'self' https://www.google.com https://www.recaptcha.net;
                frame-src 'self' https://www.google.com https://www.recaptcha.net;
                object-src 'none';
              `.replace(/\s+/g, ' ').trim()
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin'
                    }
                ],
            },
        ];
    },

    // Permitir domínios externos para imagens (se necessário)
    images: {
        domains: ['www.google.com', 'www.gstatic.com'],
    },
}

module.exports = nextConfig;