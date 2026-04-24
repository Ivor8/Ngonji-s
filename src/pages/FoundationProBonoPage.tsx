import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TelegramButton from '@/components/TelegramButton';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { ENTITIES, ENTITY_HERO_IMAGES } from '@/data/constants';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { Heart, Home, Users, Phone, Mail, MapPin, Clock, Briefcase, Award, Globe, TrendingUp, MessageCircle } from 'lucide-react';
import meetingImage from '../../assets/outdoor meeting.jpeg';

// Team members based on image files
const FOUNDATION_TEAM = [
  {
    name: 'Mr. Ngonji',
    role: 'Founder & Chairman',
    image: '/assets/team/pro bono/Mr Ngonji.jpeg',
    description: 'Visionary leader committed to transforming communities through sustainable development and humanitarian initiatives across Africa.',
    expertise: ['Strategic Planning', 'Community Development', 'Resource Mobilization'],
    education: 'MBA, University of Douala',
    languages: ['English', 'French', 'Multiple African Languages']
  },
  {
    name: 'Program Coordinator',
    role: 'Conseiller Junior',
    image: '/assets/team/pro bono/Conseiller junior.jpeg',
    description: 'Dedicated to implementing educational and healthcare programs that make a tangible difference in underserved communities.',
    expertise: ['Program Management', 'Community Outreach', 'Monitoring & Evaluation'],
    education: 'MA, Social Work',
    languages: ['English', 'French']
  }
];

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
      try {
        const [sRes, pRes, tRes] = await Promise.all([
          api.getServices({ entity: 'foundation', is_active: true }),
          api.getPortfolioItems({ entity: 'foundation' }),
          api.getTestimonials({ entity: 'foundation', is_active: true }),
        ]);
        setServices(sRes || []);
        setPortfolio(pRes || []);
        setTestimonials(tRes || []);
      } catch (error) {
        console.error('Error fetching foundation data:', error);
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

  const entityTabs = ['home', 'about', 'services', 'portfolio', 'team', 'donate', 'contact'] as const;

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
                <div className="space-y-12">
                  <div className="relative overflow-hidden rounded-3xl bg-cover bg-center" style={{ backgroundImage: `url(${ENTITY_HERO_IMAGES.foundation})` }}>
                    <div className="absolute inset-0 bg-slate-900/55" />
                    <div className="relative px-6 py-16 sm:px-10 lg:px-16 lg:py-24 text-white">
                      <span className="inline-flex rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-slate-100 mb-4">
                        {t('entity.foundation.name')}
                      </span>
                      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight max-w-3xl">
                        Empowering communities with programs that change lives.
                      </h3>
                      <p className="mt-6 max-w-2xl text-base sm:text-lg text-slate-200">
                        {t('entity.foundation.description')}
                      </p>
                      <div className="mt-10 flex flex-col sm:flex-row gap-4">
                        <button
                          onClick={() => navigate('/foundation-pro-bono/services')}
                          className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-slate-900/5 transition hover:bg-slate-100"
                        >
                          Explore Programs
                        </button>
                        <button
                          onClick={() => navigate('/foundation-pro-bono/portfolio')}
                          className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                        >
                          View Impact
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Welcome to {t('entity.foundation.name')}</h3>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-8">{t('entity.foundation.description')}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: entity.color }}>50K+</div>
                        <div className="text-sm text-gray-600">Lives Impacted</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: entity.color }}>15+</div>
                        <div className="text-sm text-gray-600">Years Serving</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: entity.color }}>200+</div>
                        <div className="text-sm text-gray-600">Communities</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: entity.color }}>100+</div>
                        <div className="text-sm text-gray-600">Programs</div>
                      </div>
                    </div>
                  </div>

                  {/* Featured Programs */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-6">Our Programs</h4>
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

                  {/* Impact Portfolio */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-6">Our Impact</h4>
                    {loading ? (
                      <div className="flex justify-center py-10">
                        <div className="w-8 h-8 border-4 border-gray-200 rounded-full animate-spin" style={{ borderTopColor: entity.color }} />
                      </div>
                    ) : portfolio.length === 0 ? (
                      <div className="text-center py-10 text-gray-500">
                        <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>Impact stories coming soon.</p>
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
                    <h4 className="text-xl font-bold text-gray-900 mb-6">Meet Our Dedicated Team</h4>
                    <div className="grid md:grid-cols-2 gap-8">
                      {FOUNDATION_TEAM.map((member, i) => (
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
                              onClick={() => navigate('/foundation-pro-bono/contact')}
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

                  {/* Quick Donation Section */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-6">Support Our Mission</h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl border border-orange-100">
                        <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-4">
                          <Heart className="w-6 h-6 text-white" />
                        </div>
                        <h5 className="font-bold text-gray-900 mb-2">One-Time Donation</h5>
                        <p className="text-sm text-gray-600 mb-4">Make an immediate impact with a single contribution.</p>
                        <button
                          onClick={() => navigate('/foundation-pro-bono/donate')}
                          className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors text-sm"
                        >
                          Donate Now
                        </button>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <h5 className="font-bold text-gray-900 mb-2">Monthly Giving</h5>
                        <p className="text-sm text-gray-600 mb-4">Become a sustaining partner for long-term change.</p>
                        <button
                          onClick={() => navigate('/foundation-pro-bono/donate')}
                          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors text-sm"
                        >
                          Monthly Support
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="text-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Join Our Mission</h4>
                    <p className="text-gray-600 mb-6">Together, we can create lasting change in communities across Africa.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={() => navigate('/foundation-pro-bono/donate')}
                        className="px-6 py-3 rounded-lg font-semibold text-white transition-colors"
                        style={{ backgroundColor: entity.color }}
                      >
                        Donate Today
                      </button>
                      <button
                        onClick={() => navigate('/foundation-pro-bono/contact')}
                        className="px-6 py-3 rounded-lg font-semibold border-2 transition-colors"
                        style={{ borderColor: entity.color, color: entity.color }}
                      >
                        Get Involved
                      </button>
                    </div>
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
                          <img src={meetingImage} alt={entity.name} className="w-full h-96 object-cover" />
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
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Our Dedicated Team</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    {FOUNDATION_TEAM.map((member, i) => (
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
                            onClick={() => navigate('/foundation-pro-bono/contact')}
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
                  <p className="text-gray-600 mb-6">Get in touch with our foundation team through our main contact page.</p>
                  <button
                    onClick={() => navigate('/contact')}
                    className="px-6 py-3 rounded-lg font-semibold text-white transition-colors"
                    style={{ backgroundColor: entity.color }}
                  >
                    Go to Contact Page
                  </button>
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
