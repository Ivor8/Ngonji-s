import React from 'react';
import { AppProvider, useApp } from '@/contexts/AppContext';
import Navbar from './Navbar';
import Hero from './Hero';
import ServiceCards from './ServiceCards';
import AboutSection from './AboutSection';
import TeamSection from './TeamSection';
import ContactSection from './ContactSection';
import Footer from './Footer';
import EntityPage from './EntityPage';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import WhatsAppButton from './WhatsAppButton';
import { ENTITIES } from '@/data/constants';

const AppContent: React.FC = () => {
  const { view, activeEntity } = useApp();

  if (view === 'admin-login') return <AdminLogin />;
  if (view === 'admin') return <AdminDashboard />;

  if (view === 'entity' && activeEntity) {
    const config = ENTITIES[activeEntity];
    return (
      <div className="min-h-screen">
        <Navbar />
        <EntityPage />
        <Footer />
        <WhatsAppButton phone={config.whatsapp} message={`Hello, I'd like to inquire about ${config.name} services.`} />
      </div>
    );
  }

  // Home view
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ServiceCards />
      <AboutSection />
      <TeamSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton phone="+237600000000" />
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default AppLayout;
