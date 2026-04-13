import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'nav.services': 'Our Services',
    'nav.about': 'About',
    'nav.team': 'Team',
    'nav.contact': 'Contact',
    'nav.allServices': 'All Services',
    'nav.admin': 'Admin',
    'nav.dashboard': 'Dashboard',
    'services.title': 'Our Business Entities',
    'services.subtitle': 'Four Pillars of Excellence',
    'services.description': 'Each entity operates independently while benefiting from the collective strength and reputation of Ngonji\'s Holding Firm.',
    'about.title': 'About Us',
    'about.subtitle': 'A Legacy of Trust & African Excellence',
    'about.description1': 'Founded by Maître Jean Ngonji, our holding firm represents a vision of integrated excellence across legal, real estate, philanthropic, and financial services. For over two decades, we have been at the forefront of Africa\'s business landscape, delivering premium solutions that transform lives and communities.',
    'about.description2': 'Our four distinct entities operate with autonomy while leveraging the collective strength, reputation, and resources of the Ngonji\'s Holding Firm ecosystem.',
    'hero.title': 'Building Africa\'s Future',
    'hero.subtitle': 'Through Excellence, Innovation & Trust',
    'hero.description': 'Ngonji\'s Holding Firm represents a legacy of integrated excellence across legal, real estate, philanthropic, and financial services, empowering communities and transforming lives.',
    'hero.cta': 'Explore Our Services',
    'team.title': 'Our Leadership Team',
    'team.subtitle': 'Meet the Visionaries Behind Our Success',
    'team.description': 'Our team of experienced professionals brings together diverse expertise and a shared commitment to excellence.',
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Contact Us',
    'contact.description': 'Ready to get started? Reach out to us and let\'s discuss how we can help you.',
    'contact.formTitle': 'Send us a message',
    'card.learnMore': 'Learn More',
    'card.explore': 'Explore',
    'card.contact': 'Contact',
    'whatsapp.chat': 'Chat on WhatsApp',
    'telegram.chat': 'Chat on Telegram',
    'entity.law.name': "Ngonji's Law Firm",
    'entity.law.tagline': 'Justice. Integrity. Excellence.',
    'entity.law.description': 'Premier legal services with a commitment to justice and client advocacy. Our experienced attorneys provide comprehensive legal solutions across corporate, family, criminal, and immigration law.',
    'entity.realestate.name': 'Eagle Company',
    'entity.realestate.tagline': 'Building Dreams. Creating Reality.',
    'entity.realestate.description': 'Leading real estate development and property management services. From residential to commercial properties, we deliver exceptional spaces that inspire and endure.',
    'entity.foundation.name': 'Foundation Pro Bono',
    'entity.foundation.tagline': 'Empowering Communities. Transforming Lives.',
    'entity.foundation.description': 'Dedicated to community development through education, healthcare, and social welfare initiatives. We believe in creating sustainable change through targeted philanthropy.',
    'entity.credit.name': 'Crédit Immobilier',
    'entity.credit.tagline': 'Financial Solutions. Trust Built.',
    'entity.credit.description': 'Comprehensive financial services including mortgage solutions, investment advice, and credit facilities tailored to meet your unique financial goals.',
  },
  fr: {
    'nav.services': 'Nos Services',
    'nav.about': 'À Propos',
    'nav.team': 'Équipe',
    'nav.contact': 'Contact',
    'nav.allServices': 'Tous les Services',
    'nav.admin': 'Admin',
    'nav.dashboard': 'Tableau de Bord',
    'services.title': 'Nos Entités Commerciales',
    'services.subtitle': 'Quatre Piliers d\'Excellence',
    'services.description': 'Chaque entité opère indépendamment tout en bénéficiant de la force collective et de la réputation de la Société Holding Ngonji.',
    'about.title': 'À Propos de Nous',
    'about.subtitle': 'Un Héritage de Confiance & d\'Excellence Africaine',
    'about.description1': 'Fondée par Maître Jean Ngonji, notre société holding représente une vision d\'excellence intégrée dans les domaines juridique, immobilier, philanthropique et financier. Depuis plus de deux décennies, nous sommes à l\'avant-garde du paysage des affaires africain, offrant des solutions premium qui transforment les vies et les communautés.',
    'about.description2': 'Nos quatre entités distinctes opèrent avec autonomie tout en exploitant la force collective, la réputation et les ressources de l\'écosystème de la Société Holding Ngonji.',
    'hero.title': 'Construire l\'Avenir de l\'Afrique',
    'hero.subtitle': 'À travers l\'Excellence, l\'Innovation & la Confiance',
    'hero.description': 'La Société Holding Ngonji représente un héritage d\'excellence intégrée dans les domaines juridique, immobilier, philanthropique et financier, autonomisant les communautés et transformant les vies.',
    'hero.cta': 'Explorer Nos Services',
    'team.title': 'Notre Équipe de Direction',
    'team.subtitle': 'Rencontrez les Visionnaires Derrière Notre Succès',
    'team.description': 'Notre équipe de professionnels expérimentés rassemble une expertise diversifiée et un engagement partagé pour l\'excellence.',
    'contact.title': 'Entrer en Contact',
    'contact.subtitle': 'Contactez-Nous',
    'contact.description': 'Prêt à commencer ? Contactez-nous et discutons de la manière dont nous pouvons vous aider.',
    'contact.formTitle': 'Envoyez-nous un message',
    'card.learnMore': 'En Savoir Plus',
    'card.explore': 'Explorer',
    'card.contact': 'Contacter',
    'whatsapp.chat': 'Discuter sur WhatsApp',
    'telegram.chat': 'Discuter sur Telegram',
    'entity.law.name': "Cabinet d'Avocats Ngonji",
    'entity.law.tagline': 'Justice. Intégrité. Excellence.',
    'entity.law.description': 'Services juridiques de premier ordre avec un engagement pour la justice et la défense des clients. Nos avocats expérimentés fournissent des solutions juridiques complètes en droit des sociétés, familial, pénal et de l\'immigration.',
    'entity.realestate.name': 'Eagle Company',
    'entity.realestate.tagline': 'Construire les Rêves. Créer la Réalité.',
    'entity.realestate.description': 'Services de développement immobilier et de gestion de biens de premier ordre. Du résidentiel au commercial, nous livrons des espaces exceptionnels qui inspirent et durent.',
    'entity.foundation.name': 'Foundation Pro Bono',
    'entity.foundation.tagline': 'Autonomiser les Communautés. Transformer les Vies.',
    'entity.foundation.description': 'Dédiée au développement communautaire par l\'éducation, la santé et les initiatives de bien-être social. Nous croyons à créer un changement durable par la philanthropie ciblée.',
    'entity.credit.name': 'Crédit Immobilier',
    'entity.credit.tagline': 'Solutions Financières. Confiance Construite.',
    'entity.credit.description': 'Services financiers complets incluant des solutions hypothécaires, des conseils en investissement et des facilités de crédit adaptées pour atteindre vos objectifs financiers uniques.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    try {
      const value = translations[language][key as keyof typeof translations.en];
      return value || key;
    } catch (error) {
      console.warn(`Translation missing for key: ${key} in language: ${language}`);
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
