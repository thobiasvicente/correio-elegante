'use client';

import { useState } from 'react';
import { Send, Mail, Shield, Github, Heart, Star, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

export default function CorreioElegante() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, message }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setEmail('');
        setMessage('');
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Erro ao enviar mensagem. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setError('Erro de conexão. Verifique sua internet e tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const canSubmit = email.trim() && message.trim() && isValidEmail(email) && !isLoading;

  return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-50 via-yellow-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 text-6xl">🌽</div>
          <div className="absolute top-32 right-20 text-4xl rotate-12">🎪</div>
          <div className="absolute top-64 left-1/4 text-5xl -rotate-12">🎭</div>
          <div className="absolute bottom-32 right-1/3 text-6xl rotate-45">🎨</div>
          <div className="absolute bottom-20 left-16 text-4xl -rotate-45">🎪</div>
          <div className="absolute top-1/2 right-10 text-5xl">🌽</div>
          <div className="absolute top-20 left-1/2 text-4xl rotate-45">🎨</div>
        </div>

        <div className="absolute top-0 left-0 w-full h-24 overflow-hidden z-20">
          <div className="flex justify-center space-x-4 pt-2">
            {[...Array(20)].map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-1 h-6 bg-yellow-800 dark:bg-yellow-600"></div>
                  <div
                      className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[18px] bandeirinha transform hover:scale-110 transition-transform duration-300"
                      style={{
                        borderLeftColor: 'transparent',
                        borderRightColor: 'transparent',
                        borderTopColor: ['#ff6b35', '#f59e0b', '#dc2626', '#16a34a', '#3b82f6', '#9333ea', '#ec4899'][i % 7],
                        animationDelay: `${i * 0.1}s`
                      }}
                  ></div>
                </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <div className="container mx-auto px-4 py-20">
            <div className="text-center mb-8">
              <div className="flex justify-center items-center mb-4 relative">
                <Heart className="w-10 h-10 text-red-500 mr-4 float" />
                <div className="relative">
                  <h1 className="pb-2 text-4xl lg:text-6xl xl:text-7xl font-black bg-gradient-to-r from-orange-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
                    <span className="block lg:inline whitespace-nowrap">Correio Elegante</span>
                    <span className="hidden lg:inline"> - </span>
                    <span className="block lg:inline">Lemit Brasil</span>
                  </h1>
                  <div className="absolute -top-2 -right-8 text-3xl animate-spin">✨</div>
                </div>
                <Heart className="w-10 h-10 text-red-500 ml-4 float" style={{ animationDelay: '2s' }} />
              </div>

              <div className="relative max-w-3xl mx-auto">
                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                  Envie uma mensagem carinhosa e anônima para alguém especial da nossa equipe!
                  <span className="block mt-2 text-lg font-medium text-orange-600 dark:text-orange-400">
                  Espalhe alegria e fortaleça nossos laços! 🤗💛
                </span>
                </p>
              </div>
            </div>

            <div className="max-w-5xl mx-auto relative">
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 paper-texture border-4 border-orange-300 dark:border-orange-600 relative overflow-hidden"
                   style={{
                     boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 30px rgba(255, 107, 53, 0.1)'
                   }}>

                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 right-4 text-3xl">🎪</div>
                  <div className="absolute bottom-4 left-4 text-3xl">🌽</div>
                  <div className="absolute top-1/2 left-4 text-2xl">🎨</div>
                  <div className="absolute top-1/2 right-4 text-2xl">🎭</div>
                </div>

                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <div className="flex justify-center items-center mb-4">
                      <Sparkles className="w-6 h-6 text-yellow-500 mr-2" />
                      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                        Sua Mensagem Especial
                      </h2>
                      <Sparkles className="w-6 h-6 text-yellow-500 ml-2" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Toque o coração de alguém com suas palavras! 💝
                    </p>
                  </div>

                  {showSuccess && (
                      <div className="mb-8 p-6 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border-2 border-green-400 rounded-3xl flex items-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-200/20 to-emerald-200/20 animate-pulse"></div>
                        <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 mr-4 relative z-10" />
                        <div className="relative z-10">
                          <p className="text-green-800 dark:text-green-200 font-bold text-lg">
                            🎉 Mensagem enviada com sucesso!
                          </p>
                          <p className="text-green-600 dark:text-green-400">
                            Sua mensagem especial está a caminho do coração da pessoa! 💌✨
                          </p>
                        </div>
                        <div className="absolute top-2 right-2 text-2xl animate-bounce">🎊</div>
                      </div>
                  )}

                  {error && (
                      <div className="mb-8 p-6 bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 border-2 border-red-400 rounded-3xl flex items-center">
                        <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400 mr-4" />
                        <p className="text-red-800 dark:text-red-200 font-semibold">{error}</p>
                      </div>
                  )}

                  <div className="space-y-8">
                    <div className="relative">
                      <label htmlFor="email" className="block lg:text-xl font-bold text-gray-700 dark:text-gray-300 mb-4">
                        <Mail className="w-6 h-6 inline mr-3 text-blue-500" />
                        Para quem vai essa surpresa? 🎯
                      </label>
                      <div className="relative">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="colega@lemitti.com"
                            className="w-full px-6 py-5 text-lg border-3 border-orange-300 dark:border-orange-600 rounded-3xl focus:ring-4 focus:ring-orange-400/50 focus:border-orange-500 dark:bg-gray-700 dark:text-white transition-all duration-300 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-gray-700 dark:to-gray-700 shadow-inner"
                            required
                        />
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl">📧</div>
                      </div>
                    </div>

                    <div className="relative">
                      <label htmlFor="message" className="block lg:text-xl font-bold text-gray-700 dark:text-gray-300 mb-4">
                        <Star className="w-6 h-6 inline mr-3 text-yellow-500" />
                        Sua mensagem do coração 💛
                      </label>
                      <div className="relative">
                      <textarea
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Escreva aqui sua mensagem carinhosa... Pode ser um elogio, um agradecimento, uma declaração de amizade, ou algo para alegrar o dia da pessoa! Lembre-se: pequenos gestos fazem grandes diferenças! 🌟💕"
                          rows={7}
                          maxLength={500}
                          className="w-full px-6 py-5 text-lg placeholder:text-sm border-3 border-orange-300 dark:border-orange-600 rounded-3xl focus:ring-4 focus:ring-orange-400/50 focus:border-orange-500 dark:bg-gray-700 dark:text-white resize-none transition-all duration-300 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-gray-700 dark:to-gray-700 shadow-inner"
                          required
                      />
                        <div className="absolute bottom-4 right-4 text-2xl">✍️</div>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <p className={`text-sm font-medium ${message.length > 450 ? 'text-red-500' : message.length > 400 ? 'text-yellow-500' : 'text-gray-500 dark:text-gray-400'}`}>
                          {message.length}/500 caracteres
                        </p>
                        <div className="flex space-x-1">
                          {message.length > 100 && <span className="text-green-500">✨</span>}
                          {message.length > 200 && <span className="text-blue-500">💙</span>}
                          {message.length > 300 && <span className="text-purple-500">🌟</span>}
                        </div>
                      </div>
                    </div>

                    <button
                        type="submit"
                        disabled={!canSubmit}
                        onClick={handleSubmit}
                        className={`w-full py-6 px-8 whitespace-nowrap lg:text-xl font-black rounded-3xl transition-all duration-300 transform relative overflow-hidden ${
                            canSubmit
                                ? 'bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 hover:from-orange-500 hover:via-yellow-500 hover:to-orange-600 text-white shadow-xl hover:shadow-2xl hover:scale-105 hover:-translate-y-1'
                                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                        }`}
                    >
                      {canSubmit && (
                          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 animate-pulse"></div>
                      )}
                      <div className="relative z-10">
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                              <div className="animate-spin rounded-full h-7 w-7 border-b-3 border-white mr-4"></div>
                              <span>Enviando sua surpresa...</span>
                              <span className="ml-2 text-2xl animate-bounce">🚀</span>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center">
                              <span>Enviar Mensagem Especial</span>
                              <Send className="w-7 h-7 ml-3" />
                            </div>
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Seção de privacidade reformulada */}
            <div className="max-w-5xl mx-auto mt-8">
              <div className="bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 dark:from-green-900/20 dark:via-blue-900/20 dark:to-purple-900/20 rounded-3xl p-10 border-3 border-green-300 dark:border-green-700 relative overflow-hidden"
                   style={{
                     boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15)'
                   }}>

                {/* Background decorativo */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-6 left-6 text-4xl">🛡️</div>
                  <div className="absolute top-6 right-6 text-4xl">🔒</div>
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-4xl">✨</div>
                </div>

                <div className="relative z-10">
                  <h2 className="text-3xl font-black text-center mb-8 flex items-center justify-center">
                    <Shield className="w-8 h-8 mr-4 text-green-600" />
                    <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                    100% Anônimo e Seguro
                  </span>
                    <Shield className="w-8 h-8 ml-4 text-green-600" />
                  </h2>

                  <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="p-6 bg-white/70 dark:bg-gray-800/70 rounded-2xl backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300">
                      <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-800/50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Shield className="w-10 h-10 text-green-600" />
                      </div>
                      <h3 className="font-bold text-xl mb-3 text-gray-800 dark:text-gray-200">Zero Registro</h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Não salvamos nenhum dado pessoal, IP ou qualquer informação que possa identificar você!
                      </p>
                    </div>

                    <div className="p-6 bg-white/70 dark:bg-gray-800/70 rounded-2xl backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Mail className="w-10 h-10 text-blue-600" />
                      </div>
                      <h3 className="font-bold text-xl mb-3 text-gray-800 dark:text-gray-200">Envio Direto</h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Mensagem enviada direto para o email do destinatário!
                      </p>
                    </div>

                    <div className="p-6 bg-white/70 dark:bg-gray-800/70 rounded-2xl backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Github className="w-10 h-10 text-purple-600" />
                      </div>
                      <h3 className="font-bold text-xl mb-3 text-gray-800 dark:text-gray-200">Código Aberto</h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Transparência total! Veja exatamente como funciona em nosso repositório GitHub
                      </p>
                    </div>
                  </div>

                  <div className="text-center mt-10">
                    <a
                        href="https://github.com/thobiasvicente/correio-elegante"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 text-white rounded-full hover:from-gray-700 hover:to-gray-800 dark:hover:from-gray-600 dark:hover:to-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-xl font-semibold text-lg"
                    >
                      <Github className="w-6 h-6 mr-3" />
                      Ver código fonte
                      <span className="ml-2 text-xl">🔍</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <footer className="text-center mt-20 relative">
                <div className="flex justify-center items-center">
                  <span className="text-3xl mr-3">🎪</span>
                  <p className="text-xl font-bold text-gray-700 dark:text-gray-300">
                    Este site foi feito para a campanha de decoração de setores da
                    <span className="bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent font-black ml-2">
                    Lemit Brasil
                  </span>
                  </p>
                  <span className="text-3xl ml-3">🌽</span>
                </div>
            </footer>
          </div>
        </div>
      </div>
  );
}