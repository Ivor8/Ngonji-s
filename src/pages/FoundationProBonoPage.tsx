import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { ENTITIES } from '@/data/constants';
import { Heart, Home, Users, Phone, Mail, MapPin, Clock } from 'lucide-react';

const FoundationProBonoPage: React.FC = () => {
  const { t } = useLanguage();
  const { activeEntity, entityTab, setEntityTab } = useApp();
  const entity = ENTITIES.foundation;

  const entityTabs = ['home', 'about', 'services', 'portfolio', 'contact'] as const;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-4">
                {t('entity.foundation.name')}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {t('entity.foundation.tagline')}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t('entity.foundation.description')}
              </p>
            </div>

            {/* Entity Tab Navigation */}
            <div className="flex justify-center mb-8">
              {entityTabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setEntityTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                    entityTab === tab
                      ? 'text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  style={entityTab === tab ? { backgroundColor: entity.color } : {}}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-gray-50 rounded-xl p-8">
              {entityTab === 'home' && (
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Welcome to {t('entity.foundation.name')}</h3>
                  <p className="text-gray-600">{t('entity.foundation.description')}</p>
                </div>
              )}
              {entityTab === 'about' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">About {t('entity.foundation.name')}</h3>
                  <p className="text-gray-600">{t('entity.foundation.description')}</p>
                </div>
              )}
              {entityTab === 'services' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Our Services</h3>
                  <p className="text-gray-600">Community development and philanthropic initiatives.</p>
                </div>
              )}
              {entityTab === 'portfolio' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Portfolio</h3>
                  <p className="text-gray-600">Showcasing our community projects and impact.</p>
                </div>
              )}
              {entityTab === 'contact' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Contact {t('entity.foundation.name')}</h3>
                  <p className="text-gray-600">Get in touch with our foundation team.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton phone={entity.whatsapp} />
    </div>
  );
};

export default FoundationProBonoPage;
