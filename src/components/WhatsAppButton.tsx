import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface WhatsAppButtonProps {
  phone: string;
  message?: string;
}

const TelegramButton: React.FC<WhatsAppButtonProps> = ({ phone, message = 'Hello, I would like to inquire about your services.' }) => {
  const { t } = useLanguage();
  const cleanPhone = phone.replace(/[^0-9+]/g, '');
  const url = `https://t.me/+${cleanPhone}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all hover:scale-105 group"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline text-sm font-semibold">{t('telegram.chat')}</span>
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20" />
    </a>
  );
};

export default TelegramButton;
