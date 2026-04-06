import React, { useEffect, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { IMAGES, STATS } from '@/data/constants';
import { ArrowRight, Play } from 'lucide-react';

const Hero: React.FC = () => {
  const { openEntity } = useApp();
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={IMAGES.hero} alt="Ngonji's Holding Firm Corporate Headquarters" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-900/85 to-blue-800/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 via-transparent to-transparent" />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-blue-100 font-medium">Trusted by 10,000+ clients across Africa</span>
          </div>

          {/* Heading */}
          <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {t('hero.title')}
            <span className="block bg-gradient-to-r from-blue-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
              {t('hero.subtitle')}
            </span>
          </h1>

          {/* Description */}
          <p className={`text-lg sm:text-xl text-blue-100/90 max-w-2xl mb-10 leading-relaxed transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {t('hero.description')}
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-wrap gap-4 mb-16 transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <button
              onClick={() => {
                const el = document.getElementById('services');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex items-center gap-2 px-8 py-4 bg-white text-blue-900 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
            >
              {t('hero.cta')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => openEntity('realestate')}
              className="group flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all"
            >
              <Play className="w-5 h-5" />
              View Properties
            </button>
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-2 sm:grid-cols-4 gap-6 transition-all duration-700 delay-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {STATS.map((stat, i) => (
              <div key={i} className="text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-blue-200/70 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};

export default Hero;
