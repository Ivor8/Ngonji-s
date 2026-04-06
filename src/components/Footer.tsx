import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { ENTITIES, ENTITY_LIST } from '@/data/constants';
import { MapPin, Phone, Mail, Globe, ArrowUp, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const { goHome, openEntity, openAdminLogin } = useApp();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-gray-950 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <button onClick={goHome} className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-lg">
                N
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Ngonji's Holding Firm</h3>
              </div>
            </button>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              A premier African holding company uniting legal excellence, real estate innovation, 
              community empowerment, and financial solutions.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <button key={i} className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Our Entities */}
          <div>
            <h4 className="text-white font-semibold mb-4">Our Entities</h4>
            <ul className="space-y-3">
              {ENTITY_LIST.map(key => (
                <li key={key}>
                  <button
                    onClick={() => openEntity(key)}
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ENTITIES[key].color }} />
                    {ENTITIES[key].name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {['About Us', 'Our Team', 'Services', 'Portfolio', 'Contact'].map(link => (
                <li key={link}>
                  <button
                    onClick={() => {
                      goHome();
                      setTimeout(() => {
                        const el = document.getElementById(link.toLowerCase().replace(' ', ''));
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
              <li>
                <button onClick={openAdminLogin} className="text-sm text-gray-400 hover:text-white transition-colors">
                  Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-400" />
                Bonanjo, Douala, Cameroon
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="w-4 h-4 flex-shrink-0 text-blue-400" />
                +237 233 000 000
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="w-4 h-4 flex-shrink-0 text-blue-400" />
                info@ngonjis.com
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Globe className="w-4 h-4 flex-shrink-0 text-blue-400" />
                www.ngonjis.com
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Ngonji's Holding Firm. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button className="text-sm text-gray-500 hover:text-white transition-colors">Privacy Policy</button>
            <button className="text-sm text-gray-500 hover:text-white transition-colors">Terms of Service</button>
            <button onClick={scrollToTop} className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors">
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
