import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ENTITIES, ENTITY_LIST, IMAGES } from '@/data/constants';
import { Scale, Building2, Heart, Landmark, ArrowRight, MessageCircle } from 'lucide-react';

const ENTITY_ICONS = {
  law: Scale,
  realestate: Building2,
  foundation: Heart,
  credit: Landmark,
};

const ENTITY_IMAGES = {
  law: '/assets/law firm logo.jpeg',
  realestate: '/assets/eagle company logo.jpeg',
  foundation: '/assets/foundation probono logo.jpeg',
  credit: '/assets/his office.jpeg',
};

const ServiceCards: React.FC = () => {
  const { openEntity, setEntityTab } = useApp();
  const { t } = useLanguage();

  const getTranslatedEntity = (key: keyof typeof ENTITIES) => {
    const entity = ENTITIES[key];
    return {
      ...entity,
      name: t(`entity.${key}.name`),
      tagline: t(`entity.${key}.tagline`),
      description: t(`entity.${key}.description`),
    };
  };

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-4">
            {t('services.title')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t('services.subtitle')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('services.description')}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {ENTITY_LIST.map((key, index) => {
            const entity = getTranslatedEntity(key);
            const Icon = ENTITY_ICONS[key];
            const image = ENTITY_IMAGES[key];

            return (
              <div
                key={key}
                onClick={() => openEntity(key)}
                className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={image}
                    alt={entity.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Entity badge */}
                  <div className="absolute top-4 left-4">
                    <div
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md text-white text-xs font-semibold"
                      style={{ backgroundColor: `${entity.color}cc` }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {entity.name}
                    </div>
                  </div>

                  {/* Tagline on image */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white/90 text-sm font-medium">{entity.tagline}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {entity.description}
                  </p>
                  
                  <div className="flex items-center gap-3 mt-6">
                    <button
                      onClick={() => openEntity(key)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      style={{ backgroundColor: entity.color }}
                    >
                      {t('card.explore')}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    {key === 'foundation' && (
                      <button
                        onClick={() => {
                          openEntity(key);
                          setEntityTab('donate');
                        }}
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                      >
                        Donate
                        <Heart className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => window.open(`https://t.me/+${entity.phone.replace(/\D/g, '')}`, '_blank')}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {t('telegram.chat')}
                    </button>
                  </div>
                </div>

                {/* Accent border */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: entity.color }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
