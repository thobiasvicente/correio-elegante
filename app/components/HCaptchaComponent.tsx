'use client';

import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useRef } from 'react';

interface HCaptchaComponentProps {
    onVerify: (token: string) => void;
    onExpire: () => void;
    onError: () => void;
}

export const HCaptchaComponent = ({ onVerify, onExpire, onError }: HCaptchaComponentProps) => {
    const captchaRef = useRef<HCaptcha>(null);

    const handleVerify = (token: string) => {
        onVerify(token);
    };

    const handleExpire = () => {
        onExpire();
    };

    const handleError = () => {
        onError();
    };

    return (
        <div className="flex justify-center my-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg border-2 border-orange-300 dark:border-orange-600">
                <div className="text-center mb-3">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        🛡️ Verificação de segurança
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Confirme que você não é um robô
                    </p>
                </div>
                <HCaptcha
                    ref={captchaRef}
                    sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
                    onVerify={handleVerify}
                    onExpire={handleExpire}
                    onError={handleError}
                    theme="light" // ou "dark" baseado no tema
                    size="normal"
                />
            </div>
        </div>
    );
};