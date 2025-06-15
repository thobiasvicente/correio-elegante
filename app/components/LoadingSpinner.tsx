export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="w-8 h-8 border-4 border-yellow-200 rounded-full animate-spin border-t-yellow-500"></div>
        <div className="absolute top-1 left-1 w-6 h-6 border-4 border-transparent rounded-full animate-spin border-t-orange-500" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
      </div>
      <span className="ml-3 text-white font-semibold">Enviando via Resend...</span>
    </div>
  );
}
