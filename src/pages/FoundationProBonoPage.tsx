import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TelegramButton from '@/components/TelegramButton';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { ENTITIES, ENTITY_HERO_IMAGES } from '@/data/constants';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Heart, Home, Users, Phone, Mail, MapPin, Clock, Briefcase, Award, Globe, TrendingUp } from 'lucide-react';

const FoundationProBonoPage: React.FC = () => {
  const { t } = useLanguage();
  const { setActiveEntity } = useApp();
  const { tab } = useParams();
  const navigate = useNavigate();
  const entity = ENTITIES.foundation;
  const currentTab = tab || 'home';
  const [services, setServices] = useState<any[]>([]);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    setActiveEntity('foundation');
  }, [setActiveEntity]);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [sRes, pRes, tRes] = await Promise.all([
        supabase.from('services').select('*').eq('entity', 'foundation').eq('is_active', true).order('sort_order'),
        supabase.from('portfolio').select('*').eq('entity', 'foundation').order('created_at', { ascending: false }),
        supabase.from('testimonials').select('*').eq('entity', 'foundation').eq('is_active', true),
      ]);
      setServices(sRes.data || []);
      setPortfolio(pRes.data || []);
      setTestimonials(tRes.data || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const entityTabs = ['home', 'about', 'services', 'portfolio', 'donate', 'contact'] as const;

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
                  onClick={() => navigate(tab === 'home' ? '/foundation-pro-bono' : `/foundation-pro-bono/${tab}`)}
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
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Welcome to {t('entity.foundation.name')}</h3>
                  <p className="text-gray-600">{t('entity.foundation.description')}</p>
                </div>
              )}
              {currentTab === 'about' && (
                <div className="py-24 bg-white">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                      {/* Left - Image */}
                      <div className="relative">
                        <div className="rounded-2xl overflow-hidden shadow-2xl">
                          <img src={ENTITY_HERO_IMAGES.foundation} alt={entity.name} className="w-full h-96 object-cover" />
                        </div>
                        {/* Floating card */}
                        <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-5 border border-gray-100 hidden md:block">
                          <div className="text-3xl font-bold" style={{ color: entity.color }}>1000+</div>
                          <div className="text-sm text-gray-600">Lives Impacted</div>
                        </div>
                      </div>
                      {/* Right - Content */}
                      <div>
                        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4" style={{ backgroundColor: entity.colorLight, color: entity.colorDark }}>
                          About {entity.name}
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                          {entity.tagline}
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                          {entity.description}
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { icon: Award, title: 'Impact', desc: 'Creating lasting change' },
                            { icon: Users, title: 'Community', desc: 'Supporting underserved groups' },
                            { icon: Globe, title: 'Africa', desc: 'Pan-African initiatives' },
                            { icon: TrendingUp, title: 'Growth', desc: 'Expanding our reach' },
                          ].map((f, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: entity.colorLight }}>
                                <f.icon className="w-5 h-5" style={{ color: entity.colorDark }} />
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
                </div>
              )}
              {currentTab === 'services' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Our Services</h3>
                  {loading ? (
                    <div className="flex justify-center py-20">
                      <div className="w-10 h-10 border-4 border-gray-200 rounded-full animate-spin" style={{ borderTopColor: entity.color }} />
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {services.map((s, i) => (
                        <div key={s.id} className="group p-6 rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300 cursor-pointer">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: entity.colorLight }}>
                            <Briefcase className="w-5 h-5" style={{ color: entity.colorDark }} />
                          </div>
                          <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                          <p className="text-sm text-gray-600 leading-relaxed">{s.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {currentTab === 'portfolio' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Portfolio</h3>
                  {loading ? (
                    <div className="flex justify-center py-20">
                      <div className="w-10 h-10 border-4 border-gray-200 rounded-full animate-spin" style={{ borderTopColor: entity.color }} />
                    </div>
                  ) : portfolio.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                      <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p>Portfolio items coming soon.</p>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {portfolio.map((p, i) => (
                        <div key={p.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                          {p.image_url && (
                            <div className="relative h-52 overflow-hidden">
                              <img src={p.image_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                              {p.is_featured && (
                                <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: entity.color }}>
                                  Featured
                                </div>
                              )}
                              {p.category && (
                                <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-700">
                                  {p.category}
                                </div>
                              )}
                            </div>
                          )}
                          <div className="p-6">
                            <h3 className="font-bold text-gray-900 text-lg mb-2">{p.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed mb-3">{p.description}</p>
                            {p.client_name && (
                              <p className="text-xs font-medium" style={{ color: entity.color }}>Client: {p.client_name}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {currentTab === 'testimonials' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Support Our Mission</h3>
                  <p className="text-gray-600 mb-6">Your generosity helps us continue our work in empowering communities and transforming lives across Africa. Every contribution makes a difference.</p>
                  
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl border border-orange-100">
                      <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-4">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-bold text-gray-900 mb-2">One-Time Donation</h4>
                      <p className="text-sm text-gray-600 mb-4">Make an immediate impact with a single contribution to our ongoing projects.</p>
                      <button
                        onClick={() => window.open('https://donate.foundation-pro-bono.org', '_blank')}
                        className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                      >
                        Donate Now
                      </button>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-bold text-gray-900 mb-2">Monthly Giving</h4>
                      <p className="text-sm text-gray-600 mb-4">Become a sustaining partner and help us plan for long-term community development.</p>
                      <button
                        onClick={() => window.open('https://monthly.foundation-pro-bono.org', '_blank')}
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                      >
                        Monthly Support
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-2xl">
                    <h4 className="font-bold text-gray-900 mb-4">Other Ways to Help</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <Globe className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900 text-sm">Volunteer</h5>
                          <p className="text-xs text-gray-600">Join our team</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Award className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900 text-sm">Partner</h5>
                          <p className="text-xs text-gray-600">Corporate partnerships</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {currentTab === 'contact' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Contact {t('entity.foundation.name')}</h3>
                  <p className="text-gray-600">Get in touch with our foundation team.</p>
                </div>
              )}
              {currentTab === 'donate' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Support Our Mission</h3>
                  <p className="text-gray-600 mb-4">Your generosity helps us continue our work in empowering communities and transforming lives across Africa.</p>
                  <button
                    onClick={() => window.open('https://donate.example.com', '_blank')}
                    className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                  >
                    Donate Now
                  </button>
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

export default FoundationProBonoPage;
