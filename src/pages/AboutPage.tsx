import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TelegramButton from '@/components/TelegramButton';
import { useLanguage } from '@/contexts/LanguageContext';
import { Award, Users, Globe, TrendingUp } from 'lucide-react';

const features = [
  { icon: Award, title: 'Excellence', desc: 'Committed to the highest standards in every service we deliver.' },
  { icon: Users, title: 'Client-Centric', desc: 'Your success is our priority. We build lasting partnerships.' },
  { icon: Globe, title: 'Pan-African', desc: 'Serving clients across the African continent and beyond.' },
  { icon: TrendingUp, title: 'Growth', desc: 'Driving sustainable growth through innovation and integrity.' },
];

const AboutPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left - Image */}
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img src="/assets/ngonji.jpeg" alt="Ngonji's Leadership" className="w-full h-100 object-cover" />
                </div>
                {/* Floating card */}
                <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-5 border border-gray-100 hidden md:block">
                  <div className="text-3xl font-bold text-blue-700">25+</div>
                  <div className="text-sm text-gray-600">Years of Excellence</div>
                </div>
              </div>

              {/* Right - Content */}
              <div>
                <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-4">
                  {t('about.title')}
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  {t('about.subtitle')}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {t('about.description1')}
                </p>
                <p className="text-gray-600 leading-relaxed mb-8">
                  {t('about.description2')}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {features.map((f, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-blue-50 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <f.icon className="w-5 h-5 text-blue-700" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{f.title}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <TelegramButton phone="+237 6 79 84 14 98" />
    </div>
  );
};

export default AboutPage;
