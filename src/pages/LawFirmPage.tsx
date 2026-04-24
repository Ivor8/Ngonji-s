import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TelegramButton from '@/components/TelegramButton';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { ENTITIES, ENTITY_HERO_IMAGES } from '@/data/constants';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { Scale, Home, Users, Phone, Mail, MapPin, Clock, Briefcase, Award, Globe, TrendingUp, MessageCircle } from 'lucide-react';
import teamLadyImage from '../../assets/ngonji.jpeg';

// Team members based on image files
const LAW_FIRM_TEAM = [
  {
    name: 'Barista Ngonji',
    role: 'Founder of Ngonji\'s Law Firm',
    image: '/assets/team/ngonji law firm/Barista Ngonji, Founder of Ngonji\'s law firm.jpeg',
    description: 'With over 25 years of experience in corporate and international law, Maître Ngonji leads our firm with unparalleled expertise and dedication to justice.',
    expertise: ['Corporate Law', 'International Arbitration', 'Legal Strategy'],
    education: 'LLM, Harvard Law School',
    languages: ['English', 'French', 'Cameroonian Pidgin']
  },
  {
    name: 'Junior Legal Counsel',
    role: 'Conseiller Junior',
    image: '/assets/team/ngonji law firm/Conseiller junior.jpeg',
    description: 'Specializing in family law and civil litigation, our junior counsel brings fresh perspectives and meticulous attention to every case.',
    expertise: ['Family Law', 'Civil Litigation', 'Contract Law'],
    education: 'LLB, University of Douala',
    languages: ['English', 'French']
  },
  {
    name: 'Senior Associate',
    role: 'Senior Legal Associate',
    image: '/assets/team/ngonji law firm/No name no positon, use demo data.jpeg',
    description: 'Expert in criminal defense and human rights law, ensuring justice and protection for our clients\' fundamental rights.',
    expertise: ['Criminal Law', 'Human Rights', 'Constitutional Law'],
    education: 'LLM, University of Yaoundé',
    languages: ['English', 'French', 'Spanish']
  }
];

const LawFirmPage: React.FC = () => {
  const { t } = useLanguage();
  const { setActiveEntity } = useApp();
  const { tab } = useParams();
  const navigate = useNavigate();
  const entity = ENTITIES.law;
  const currentTab = tab || 'home';
  const [services, setServices] = useState<any[]>([]);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    setActiveEntity('law');
  }, [setActiveEntity]);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [sRes, pRes, tRes] = await Promise.all([
          api.getServices({ entity: 'law', is_active: true }),
          api.getPortfolioItems({ entity: 'law' }),
          api.getTestimonials({ entity: 'law', is_active: true }),
        ]);
        setServices(sRes || []);
        setPortfolio(pRes || []);
        setTestimonials(tRes || []);
      } catch (error) {
        console.error('Error fetching law firm data:', error);
        // Set empty arrays on error to prevent UI crashes
        setServices([]);
        setPortfolio([]);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const entityTabs = ['home', 'about', 'services', 'portfolio', 'team', 'contact'] as const;

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
                <div className="space-y-12">
                  <div className="relative overflow-hidden rounded-3xl bg-cover bg-center" style={{ backgroundImage: `url(${ENTITY_HERO_IMAGES.law})` }}>
                    <div className="absolute inset-0 bg-slate-900/65" />
                    <div className="relative px-6 py-16 sm:px-10 lg:px-16 lg:py-24 text-white">
                      <span className="inline-flex rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-slate-100 mb-4">
                        {t('entity.law.name')}
                      </span>
                      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight max-w-3xl">
                        Justice you can trust, advocacy that delivers.
                      </h3>
                      <p className="mt-6 max-w-2xl text-base sm:text-lg text-slate-200">
                        {t('entity.law.description')}
                      </p>
                      <div className="mt-10 flex flex-col sm:flex-row gap-4">
                        <button
                          onClick={() => navigate('/law-firm/services')}
                          className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-slate-900/5 transition hover:bg-slate-100"
                        >
                          Explore Services
                        </button>
                        <button
                          onClick={() => navigate('/law-firm/portfolio')}
                          className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                        >
                          View Cases
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Welcome to {t('entity.law.name')}</h3>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-8">{t('entity.law.description')}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: entity.color }}>25+</div>
                        <div className="text-sm text-gray-600">Years Experience</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: entity.color }}>10K+</div>
                        <div className="text-sm text-gray-600">Clients Served</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: entity.color }}>500+</div>
                        <div className="text-sm text-gray-600">Cases Won</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: entity.color }}>150+</div>
                        <div className="text-sm text-gray-600">Legal Experts</div>
                      </div>
                    </div>
                  </div>

                  {/* Featured Services */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-6">Our Legal Services</h4>
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

                  {/* Recent Portfolio */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-6">Recent Cases</h4>
                    {loading ? (
                      <div className="flex justify-center py-10">
                        <div className="w-8 h-8 border-4 border-gray-200 rounded-full animate-spin" style={{ borderTopColor: entity.color }} />
                      </div>
                    ) : portfolio.length === 0 ? (
                      <div className="text-center py-10 text-gray-500">
                        <Scale className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>Case studies coming soon.</p>
                      </div>
                    ) : (
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {portfolio.slice(0, 3).map((p, i) => (
                          <div key={p.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            {p.image_url && (
                              <div className="relative h-40 overflow-hidden">
                                <img src={p.image_url.startsWith('http') ? p.image_url : `http://localhost:5000${p.image_url}`} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                {p.is_featured && (
                                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: entity.color }}>
                                    Featured
                                  </div>
                                )}
                              </div>
                            )}
                            <div className="p-4">
                              <h3 className="font-bold text-gray-900 text-sm mb-2">{p.title}</h3>
                              <p className="text-xs text-gray-600 leading-relaxed">{p.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Team Section */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-6">Meet Our Legal Team</h4>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {LAW_FIRM_TEAM.map((member, i) => (
                        <div key={i} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                          {/* Image Section */}
                          <div className="relative h-80 overflow-hidden">
                            <img 
                              src={member.image} 
                              alt={member.name} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: entity.color }} />
                                <span className="text-xs font-medium text-white/90">Available</span>
                              </div>
                              <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                              <p className="text-sm text-white/90">{member.role}</p>
                            </div>
                          </div>
                          
                          {/* Content Section */}
                          <div className="p-6">
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.description}</p>
                            
                            {/* Expertise */}
                            <div className="mb-4">
                              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Expertise</h4>
                              <div className="flex flex-wrap gap-1">
                                {member.expertise.map((skill, j) => (
                                  <span 
                                    key={j} 
                                    className="px-2 py-1 text-xs font-medium rounded-full" 
                                    style={{ backgroundColor: entity.colorLight, color: entity.colorDark }}
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            {/* Education & Languages */}
                            <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                              <div className="flex items-center gap-2">
                                <Award className="w-3 h-3" style={{ color: entity.color }} />
                                <div>
                                  <p className="text-gray-500">Education</p>
                                  <p className="font-medium text-gray-700">{member.education}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Globe className="w-3 h-3" style={{ color: entity.color }} />
                                <div>
                                  <p className="text-gray-500">Languages</p>
                                  <p className="font-medium text-gray-700">{member.languages.join(', ')}</p>
                                </div>
                              </div>
                            </div>
                            
                            {/* Contact Button */}
                            <button 
                              onClick={() => navigate('/law-firm/contact')}
                              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border hover:border-transparent"
                              style={{ 
                                backgroundColor: entity.colorLight, 
                                color: entity.colorDark,
                                borderColor: entity.color 
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = entity.color;
                                e.currentTarget.style.color = 'white';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = entity.colorLight;
                                e.currentTarget.style.color = entity.colorDark;
                              }}
                            >
                              <MessageCircle className="w-4 h-4" />
                              Contact {member.name.split(' ')[0]}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="text-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Need Legal Assistance?</h4>
                    <p className="text-gray-600 mb-6">Our experienced attorneys are ready to help you with your legal needs.</p>
                    <button
                      onClick={() => navigate('/law-firm/contact')}
                      className="px-6 py-3 rounded-lg font-semibold text-white transition-colors"
                      style={{ backgroundColor: entity.color }}
                    >
                      Contact Us Today
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
                          <img src={teamLadyImage} alt={entity.name} className="w-full h-96 object-cover" />
                        </div>
                        {/* Floating card */}
                        <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-5 border border-gray-100 hidden md:block">
                          <div className="text-3xl font-bold" style={{ color: entity.color }}>500+</div>
                          <div className="text-sm text-gray-600">Cases Won</div>
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
                            { icon: Award, title: 'Excellence', desc: 'Highest legal standards' },
                            { icon: Users, title: 'Client Focus', desc: 'Your success is our priority' },
                            { icon: Globe, title: 'International', desc: 'Global legal expertise' },
                            { icon: TrendingUp, title: 'Results', desc: 'Proven track record' },
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
                      <Scale className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p>Portfolio items coming soon.</p>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {portfolio.map((p, i) => (
                        <div key={p.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                          {p.image_url && (
                            <div className="relative h-52 overflow-hidden">
                              <img src={p.image_url.startsWith('http') ? p.image_url : `http://localhost:5000${p.image_url}`} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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
              {currentTab === 'team' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Our Legal Team</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {LAW_FIRM_TEAM.map((member, i) => (
                      <div key={i} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                        {/* Image Section */}
                        <div className="relative h-80 overflow-hidden">
                          <img 
                            src={member.image} 
                            alt={member.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: entity.color }} />
                              <span className="text-xs font-medium text-white/90">Available</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                            <p className="text-sm text-white/90">{member.role}</p>
                          </div>
                        </div>
                        
                        {/* Content Section */}
                        <div className="p-6">
                          <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.description}</p>
                          
                          {/* Expertise */}
                          <div className="mb-4">
                            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Expertise</h4>
                            <div className="flex flex-wrap gap-1">
                              {member.expertise.map((skill, j) => (
                                <span 
                                  key={j} 
                                  className="px-2 py-1 text-xs font-medium rounded-full" 
                                  style={{ backgroundColor: entity.colorLight, color: entity.colorDark }}
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          {/* Education & Languages */}
                          <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                            <div className="flex items-center gap-2">
                              <Award className="w-3 h-3" style={{ color: entity.color }} />
                              <div>
                                <p className="text-gray-500">Education</p>
                                <p className="font-medium text-gray-700">{member.education}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Globe className="w-3 h-3" style={{ color: entity.color }} />
                              <div>
                                <p className="text-gray-500">Languages</p>
                                <p className="font-medium text-gray-700">{member.languages.join(', ')}</p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Contact Button */}
                          <button 
                            onClick={() => navigate('/law-firm/contact')}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border hover:border-transparent"
                            style={{ 
                              backgroundColor: entity.colorLight, 
                              color: entity.colorDark,
                              borderColor: entity.color 
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = entity.color;
                              e.currentTarget.style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = entity.colorLight;
                              e.currentTarget.style.color = entity.colorDark;
                            }}
                          >
                            <MessageCircle className="w-4 h-4" />
                            Contact {member.name.split(' ')[0]}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {currentTab === 'contact' && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h3>
                  <p className="text-gray-600 mb-6">Get in touch with our legal team through our main contact page.</p>
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

export default LawFirmPage;
