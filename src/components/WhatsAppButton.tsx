import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface WhatsAppButtonProps {
  phone: string;
  message?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ phone, message = 'Hello, I would like to inquire about your services.' }) => {
  const { t } = useLanguage();
  const cleanPhone = phone.replace(/[^0-9+]/g, '');
  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl hover:shadow-green-500/25 transition-all hover:scale-105 group"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline text-sm font-semibold">{t('whatsapp.chat')}</span>
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
    </a>
  );
};

export default WhatsAppButton;
