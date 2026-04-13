import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TelegramButton from '@/components/TelegramButton';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { ENTITIES } from '@/data/constants';
import { useParams, useNavigate } from 'react-router-dom';
import { Scale, Home, Users, Phone, Mail, MapPin, Clock } from 'lucide-react';

const LawFirmPage: React.FC = () => {
  const { t } = useLanguage();
  const { setActiveEntity } = useApp();
  const { tab } = useParams();
  const navigate = useNavigate();
  const entity = ENTITIES.law;
  const currentTab = tab || 'home';

  React.useEffect(() => {
    setActiveEntity('law');
  }, [setActiveEntity]);

  const entityTabs = ['home', 'about', 'services', 'portfolio', 'contact'] as const;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-4">
                {t('entity.law.name')}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {t('entity.law.tagline')}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t('entity.law.description')}
              </p>
            </div>

            {/* Entity Tab Navigation */}
            <div className="flex justify-center mb-8">
              {entityTabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => navigate(tab === 'home' ? '/law-firm' : `/law-firm/${tab}`)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                    currentTab === tab
                      ? 'text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  style={currentTab === tab ? { backgroundColor: entity.color } : {}}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-gray-50 rounded-xl p-8">
              {currentTab === 'home' && (
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Welcome to {t('entity.law.name')}</h3>
                  <p className="text-gray-600">{t('entity.law.description')}</p>
                </div>
              )}
              {currentTab === 'about' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">About {t('entity.law.name')}</h3>
                  <p className="text-gray-600">{t('entity.law.description')}</p>
                </div>
              )}
              {currentTab === 'services' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Our Services</h3>
                  <p className="text-gray-600">Comprehensive legal solutions for all your needs.</p>
                </div>
              )}
              {currentTab === 'portfolio' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Portfolio</h3>
                  <p className="text-gray-600">Showcasing our successful cases and projects.</p>
                </div>
              )}
              {currentTab === 'contact' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Contact {t('entity.law.name')}</h3>
                  <p className="text-gray-600">Get in touch with our legal team.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <TelegramButton phone={entity.whatsapp} />
    </div>
  );
};

export default LawFirmPage;
