'use client';

export default function LoadingSpinner() {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800 mx-auto mb-4"></div>
        <p className="text-gray-600 font-[Inter]">Завантаження...</p>
      </div>
    </div>
  );
}