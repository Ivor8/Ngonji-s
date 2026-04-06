import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ContactForm from '@/components/ContactForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const contactInfo = [
  { icon: MapPin, label: 'Visit Us', value: 'Bonanjo, Douala, Cameroon' },
  { icon: Phone, label: 'Call Us', value: '+237 233 000 000' },
  { icon: Mail, label: 'Email Us', value: 'info@ngonjis.com' },
  { icon: Clock, label: 'Working Hours', value: 'Mon - Fri: 8:00 - 18:00' },
];

const ContactPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-4">
                {t('contact.title')}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {t('contact.subtitle')}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t('contact.description')}
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
              {/* Contact Info */}
              <div className="space-y-6">
                {contactInfo.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.label}</h4>
                      <p className="text-gray-600 text-sm mt-0.5">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">{t('contact.formTitle')}</h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton phone="+237 6 79 84 14 98" />
    </div>
  );
};

export default ContactPage;
