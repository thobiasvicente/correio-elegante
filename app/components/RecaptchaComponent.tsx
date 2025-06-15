// components/RecaptchaComponent.tsx
'use client';

import dynamic from 'next/dynamic';
import { useRef, useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

// Importação dinâmica do ReCAPTCHA para evitar SSR issues
const ReCAPTCHA = dynamic(() => import('react-google-recaptcha'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center p-8">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            <span className="ml-2 text-gray-600">Carregando verificação...</span>
        </div>
    ),
});

interface RecaptchaComponentProps {
    onVerify: (token: string | null) => void;
    onExpire: () => void;
    onError: () => void;
}

export const RecaptchaComponent = ({ onVerify, onExpire, onError }: RecaptchaComponentProps) => {
    const recaptchaRef = useRef<any>(null);
    const [isClient, setIsClient] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setIsClient(true);

        // Timeout para detectar se não carregou
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 5000);

        return () => clearTimeout(timeout);
    }, []);

    const handleChange = (token: string | null) => {
        setIsLoading(false);
        setHasError(false);
        onVerify(token);
    };

    const handleExpired = () => {
        setHasError(false);
        onExpire();
    };

    const handleError = () => {
        setIsLoading(false);
        setHasError(true);
        onError();
    };

    const handleLoad = () => {
        setIsLoading(false);
        setHasError(false);
    };

    // Não renderizar no servidor
    if (!isClient) {
        return (
            <div className="flex justify-center my-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border-2 border-orange-300 dark:border-orange-600">
                    <div className="flex items-center justify-center p-8">
                        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                        <span className="ml-2 text-gray-600 dark:text-gray-400">Inicializando verificação...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center my-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border-2 border-orange-300 dark:border-orange-600">
                <div className="text-center mb-4">
                    <div className="flex items-center justify-center mb-2">
                        <span className="text-2xl mr-2">🛡️</span>
                        <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">
                            Verificação de Segurança
                        </h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Confirme que você não é um robô para continuar
                    </p>
                </div>

                <div className="flex justify-center">
                    {hasError ? (
                        <div className="text-center p-4">
                            <p className="text-red-600 mb-4">❌ Erro ao carregar verificação</p>
                            <button
                                onClick={() => {
                                    setHasError(false);
                                    setIsLoading(true);
                                    window.location.reload();
                                }}
                                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                            >
                                🔄 Tentar novamente
                            </button>
                        </div>
                    ) : isLoading ? (
                        <div className="flex items-center justify-center p-8">
                            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                            <span className="ml-2 text-gray-600 dark:text-gray-400">Carregando...</span>
                        </div>
                    ) : (
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                            onChange={handleChange}
                            onExpired={handleExpired}
                            onErrored={handleError}
                            onLoad={handleLoad}
                            theme="light"
                            size="normal"
                            hl="pt"
                        />
                    )}
                </div>

                <div className="text-center mt-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Protegido pelo reCAPTCHA •
                        <a
                            href="https://policies.google.com/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline ml-1"
                        >
                            Privacidade
                        </a> •
                        <a
                            href="https://policies.google.com/terms"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline ml-1"
                        >
                            Termos
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};