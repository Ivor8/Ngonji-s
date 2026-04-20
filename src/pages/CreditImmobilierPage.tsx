import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TelegramButton from '@/components/TelegramButton';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { ENTITIES, ENTITY_HERO_IMAGES } from '@/data/constants';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Landmark, Home, Users, Phone, Mail, MapPin, Clock, Briefcase, Award, Globe, TrendingUp } from 'lucide-react';
import officeImage from '../../assets/his office.jpeg';

const CreditImmobilierPage: React.FC = () => {
  const { t } = useLanguage();
  const { setActiveEntity } = useApp();
  const { tab } = useParams();
  const navigate = useNavigate();
  const entity = ENTITIES.credit;
  const currentTab = tab || 'home';
  const [services, setServices] = useState<any[]>([]);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    setActiveEntity('credit');
  }, [setActiveEntity]);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [sRes, pRes, tRes] = await Promise.all([
        supabase.from('services').select('*').eq('entity', 'credit').eq('is_active', true).order('sort_order'),
        supabase.from('portfolio').select('*').eq('entity', 'credit').order('created_at', { ascending: false }),
        supabase.from('testimonials').select('*').eq('entity', 'credit').eq('is_active', true),
      ]);
      setServices(sRes.data || []);
      setPortfolio(pRes.data || []);
      setTestimonials(tRes.data || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const entityTabs = ['home', 'about', 'services', 'portfolio', 'testimonials', 'contact'] as const;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-4">
                {t('entity.credit.name')}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {t('entity.credit.tagline')}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t('entity.credit.description')}
              </p>
            </div>

            {/* Entity Tab Navigation */}
            <div className="flex justify-center mb-8">
              {entityTabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => navigate(tab === 'home' ? '/credit-immobilier' : `/credit-immobilier/${tab}`)}
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
                <div className="space-y-12">
                  <div className="relative overflow-hidden rounded-3xl bg-cover bg-center" style={{ backgroundImage: `url(${ENTITY_HERO_IMAGES.credit})` }}>
                    <div className="absolute inset-0 bg-slate-900/55" />
                    <div className="relative px-6 py-16 sm:px-10 lg:px-16 lg:py-24 text-white">
                      <span className="inline-flex rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-slate-100 mb-4">
                        {t('entity.credit.name')}
                      </span>
                      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight max-w-3xl">
                        Financing tomorrow’s real estate projects with confidence.
                      </h3>
                      <p className="mt-6 max-w-2xl text-base sm:text-lg text-slate-200">
                        {t('entity.credit.description')}
                      </p>
                      <div className="mt-10 flex flex-col sm:flex-row gap-4">
                        <button
                          onClick={() => navigate('/credit-immobilier/services')}
                          className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-slate-900/5 transition hover:bg-slate-100"
                        >
                          Explore Services
                        </button>
                        <button
                          onClick={() => navigate('/credit-immobilier/portfolio')}
                          className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                        >
                          View Projects
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Welcome to {t('entity.credit.name')}</h3>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-8">{t('entity.credit.description')}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: entity.color }}>100M+</div>
                        <div className="text-sm text-gray-600">Funds Disbursed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: entity.color }}>15+</div>
                        <div className="text-sm text-gray-600">Years Experience</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: entity.color }}>50K+</div>
                        <div className="text-sm text-gray-600">Happy Clients</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: entity.color }}>200+</div>
                        <div className="text-sm text-gray-600">Projects Funded</div>
                      </div>
                    </div>
                  </div>

                  {/* Featured Services */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-6">Our Financial Services</h4>
                    {loading ? (
                      <div className="flex justify-center py-10">
                        <div className="w-8 h-8 border-4 border-gray-200 rounded-full animate-spin" style={{ borderTopColor: entity.color }} />
                      </div>
                    ) : (
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.slice(0, 3).map((s, i) => (
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

                  {/* Portfolio Showcase */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-6">Successful Projects</h4>
                    {loading ? (
                      <div className="flex justify-center py-10">
                        <div className="w-8 h-8 border-4 border-gray-200 rounded-full animate-spin" style={{ borderTopColor: entity.color }} />
                      </div>
                    ) : portfolio.length === 0 ? (
                      <div className="text-center py-10 text-gray-500">
                        <Landmark className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>Project portfolio coming soon.</p>
                      </div>
                    ) : (
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {portfolio.slice(0, 3).map((p, i) => (
                          <div key={p.id} className="group relative overflow-hidden rounded-2xl bg-gray-100 cursor-pointer">
                            <img src={p.image_url} alt={p.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                              <h3 className="font-bold text-sm mb-1">{p.title}</h3>
                              <p className="text-xs opacity-90">{p.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Testimonials */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-6">Client Testimonials</h4>
                    {loading ? (
                      <div className="flex justify-center py-10">
                        <div className="w-8 h-8 border-4 border-gray-200 rounded-full animate-spin" style={{ borderTopColor: entity.color }} />
                      </div>
                    ) : testimonials.length === 0 ? (
                      <div className="text-center py-10 text-gray-500">
                        <Award className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>Testimonials coming soon.</p>
                      </div>
                    ) : (
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {testimonials.slice(0, 3).map((t, i) => (
                          <div key={t.id} className="p-4 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center gap-1 mb-3">
                              {[...Array(5)].map((_, star) => (
                                <Award key={star} className="w-3 h-3" style={{ color: entity.color }} />
                              ))}
                            </div>
                            <p className="text-gray-600 italic text-sm mb-3">"{t.message}"</p>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="text-xs font-semibold text-gray-600">{t.name ? t.name.charAt(0).toUpperCase() : '?'}</span>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 text-sm">{t.name || 'Anonymous'}</h4>
                                <p className="text-xs text-gray-500">{t.position || 'Client'}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Call to Action */}
                  <div className="text-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Ready to Finance Your Project?</h4>
                    <p className="text-gray-600 mb-6">Get competitive rates and expert financial guidance for your real estate dreams.</p>
                    <button
                      onClick={() => navigate('/credit-immobilier/contact')}
                      className="px-6 py-3 rounded-lg font-semibold text-white transition-colors"
                      style={{ backgroundColor: entity.color }}
                    >
                      Apply for Financing
                    </button>
                  </div>
                </div>
              )}
              {currentTab === 'about' && (
                <div className="py-24 bg-white">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                      {/* Left - Image */}
                      <div className="relative">
                        <div className="rounded-2xl overflow-hidden shadow-2xl">
                          <img src={officeImage} alt={entity.name} className="w-full h-96 object-cover" />
                        </div>
                        {/* Floating card */}
                        <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-5 border border-gray-100 hidden md:block">
                          <div className="text-3xl font-bold" style={{ color: entity.color }}>100M+</div>
                          <div className="text-sm text-gray-600">Funds Disbursed</div>
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
                            { icon: Award, title: 'Trust', desc: 'Building financial confidence' },
                            { icon: Users, title: 'Clients', desc: 'Supporting your dreams' },
                            { icon: Globe, title: 'Africa', desc: 'Pan-African financial solutions' },
                            { icon: TrendingUp, title: 'Growth', desc: 'Fueling economic development' },
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
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Our Portfolio</h3>
                  {loading ? (
                    <div className="flex justify-center py-20">
                      <div className="w-10 h-10 border-4 border-gray-200 rounded-full animate-spin" style={{ borderTopColor: entity.color }} />
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {portfolio.map((p, i) => (
                        <div key={p.id} className="group relative overflow-hidden rounded-2xl bg-gray-100 cursor-pointer">
                          <img src={p.image_url} alt={p.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="font-bold text-lg mb-2">{p.title}</h3>
                            <p className="text-sm opacity-90">{p.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {currentTab === 'testimonials' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Client Testimonials</h3>
                  {loading ? (
                    <div className="flex justify-center py-20">
                      <div className="w-10 h-10 border-4 border-gray-200 rounded-full animate-spin" style={{ borderTopColor: entity.color }} />
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {testimonials.map((t, i) => (
                        <div key={t.id} className="p-6 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
                          <div className="flex items-center gap-1 mb-4">
                            {[...Array(5)].map((_, star) => (
                              <Award key={star} className="w-4 h-4" style={{ color: entity.color }} />
                            ))}
                          </div>
                          <p className="text-gray-600 italic mb-4">"{t.message}"</p>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-sm font-semibold text-gray-600">{t.name ? t.name.charAt(0).toUpperCase() : '?'}</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{t.name || 'Anonymous'}</h4>
                              <p className="text-sm text-gray-500">{t.position || 'Client'}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {currentTab === 'contact' && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h3>
                  <p className="text-gray-600 mb-6">Get in touch with our financial services team through our main contact page.</p>
                  <button
                    onClick={() => navigate('/contact')}
                    className="px-6 py-3 rounded-lg font-semibold text-white transition-colors"
                    style={{ backgroundColor: entity.color }}
                  >
                    Go to Contact Page
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

export default CreditImmobilierPage;
