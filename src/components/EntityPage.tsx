import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useApp } from '@/contexts/AppContext';
import { ENTITIES, IMAGES, EntityKey, TEAM_MEMBERS, ENTITY_HERO_IMAGES } from '@/data/constants';
import ContactForm from './ContactForm';
import BookingForm from './BookingForm';
import { Scale, Building2, Heart, Landmark, ArrowRight, MapPin, Phone, Mail, Clock, MessageCircle, Briefcase, Star, Users, Globe, ChevronRight } from 'lucide-react';

const ENTITY_ICONS: Record<EntityKey, React.FC<any>> = {
  law: Scale,
  realestate: Building2,
  foundation: Heart,
  credit: Landmark,
};

const EntityPage: React.FC = () => {
  const { activeEntity, entityTab, setEntityTab } = useApp();
  const [services, setServices] = useState<any[]>([]);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const entity = activeEntity!;
  const config = ENTITIES[entity];
  const Icon = ENTITY_ICONS[entity];
  const teamMembers = TEAM_MEMBERS.filter(m => m.entity === entity);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [sRes, pRes, tRes] = await Promise.all([
        supabase.from('services').select('*').eq('entity', entity).eq('is_active', true).order('sort_order'),
        supabase.from('portfolio').select('*').eq('entity', entity).order('created_at', { ascending: false }),
        supabase.from('testimonials').select('*').eq('entity', entity).eq('is_active', true),
      ]);
      setServices(sRes.data || []);
      setPortfolio(pRes.data || []);
      setTestimonials(tRes.data || []);
      setLoading(false);
    };
    fetchData();
  }, [entity]);

  // Entity Home Tab
  const renderHome = () => (
    <>
      {/* Hero */}
      <div className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <img src={ENTITY_HERO_IMAGES[entity]} alt={config.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${config.colorDark}ee 0%, ${config.color}aa 50%, transparent 100%)` }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 mb-6">
              <Icon className="w-4 h-4 text-white" />
              <span className="text-sm text-white font-medium">{config.name}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {config.tagline}
            </h1>
            <p className="text-lg text-white/85 mb-8 leading-relaxed">{config.description}</p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => setEntityTab('services')} className="flex items-center gap-2 px-7 py-3.5 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-xl">
                Our Services <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => setEntityTab('contact')} className="flex items-center gap-2 px-7 py-3.5 bg-white/15 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/25 hover:bg-white/25 transition-all">
                <MessageCircle className="w-4 h-4" /> Get in Touch
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Services Preview */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">What We Offer</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Comprehensive solutions tailored to your needs.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((s, i) => (
              <div key={s.id} className="group p-6 rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => setEntityTab('services')}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: config.colorLight }}>
                  <Briefcase className="w-5 h-5" style={{ color: config.colorDark }} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <div className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What Our Clients Say</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <div key={t.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">"{t.content}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: config.color }}>
                      {t.client_name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{t.client_name}</p>
                      <p className="text-xs text-gray-500">{t.client_title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );

  // About Tab
  const renderAbout = () => (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4" style={{ backgroundColor: config.colorLight, color: config.colorDark }}>
            <Icon className="w-4 h-4" /> About {config.name}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{config.tagline}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{config.description}</p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To deliver exceptional {entity === 'law' ? 'legal' : entity === 'realestate' ? 'real estate' : entity === 'foundation' ? 'humanitarian' : 'financial'} services 
              that empower our clients and contribute to the sustainable development of African communities.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To be the most trusted and respected {entity === 'law' ? 'law firm' : entity === 'realestate' ? 'real estate company' : entity === 'foundation' ? 'charitable organization' : 'financial institution'} in 
              Africa, setting the standard for excellence, integrity, and innovation.
            </p>
          </div>
        </div>

        {/* Team */}
        {teamMembers.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Team</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((m, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                  <img src={m.image} alt={m.name} className="w-full h-64 object-cover" />
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900">{m.name}</h3>
                    <p className="text-sm text-gray-500">{m.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Values */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Star, title: 'Excellence', desc: 'Highest standards in everything we do' },
            { icon: Users, title: 'Integrity', desc: 'Transparent and ethical practices' },
            { icon: Globe, title: 'Innovation', desc: 'Forward-thinking solutions' },
            { icon: Heart, title: 'Commitment', desc: 'Dedicated to client success' },
          ].map((v, i) => (
            <div key={i} className="text-center p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: config.colorLight }}>
                <v.icon className="w-6 h-6" style={{ color: config.colorDark }} />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">{v.title}</h4>
              <p className="text-sm text-gray-500">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Services Tab
  const renderServices = () => (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4" style={{ backgroundColor: config.colorLight, color: config.colorDark }}>
            Our Services
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">What We Offer</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Comprehensive solutions designed to meet your specific needs.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-gray-200 rounded-full animate-spin" style={{ borderTopColor: config.color }} />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <div key={s.id} className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: config.colorLight }}>
                  <Briefcase className="w-6 h-6" style={{ color: config.colorDark }} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{s.description}</p>
                {s.price_range && (
                  <p className="text-sm font-semibold" style={{ color: config.color }}>{s.price_range}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Booking Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Book a Consultation</h2>
              <p className="text-gray-600 mb-6">Schedule a meeting with our experts to discuss your specific needs and how we can help.</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: config.colorLight }}>
                    <Phone className="w-4 h-4" style={{ color: config.colorDark }} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">{config.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: config.colorLight }}>
                    <Mail className="w-4 h-4" style={{ color: config.colorDark }} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{config.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: config.colorLight }}>
                    <MapPin className="w-4 h-4" style={{ color: config.colorDark }} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium text-gray-900">{config.address}</p>
                  </div>
                </div>
              </div>
            </div>
            <BookingForm entity={entity} services={services} />
          </div>
        </div>
      </div>
    </div>
  );

  // Portfolio Tab
  const renderPortfolio = () => (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4" style={{ backgroundColor: config.colorLight, color: config.colorDark }}>
            Portfolio
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Projects & Achievements</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Explore our track record of successful projects and satisfied clients.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-gray-200 rounded-full animate-spin" style={{ borderTopColor: config.color }} />
          </div>
        ) : portfolio.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
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
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: config.color }}>
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
                    <p className="text-xs font-medium" style={{ color: config.color }}>Client: {p.client_name}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Contact Tab
  const renderContact = () => (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4" style={{ backgroundColor: config.colorLight, color: config.colorDark }}>
            Contact Us
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">We'd love to hear from you. Send us a message and we'll respond promptly.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="space-y-6">
            {[
              { icon: MapPin, label: 'Address', value: config.address },
              { icon: Phone, label: 'Phone', value: config.phone },
              { icon: Mail, label: 'Email', value: config.email },
              { icon: Clock, label: 'Hours', value: 'Mon - Fri: 8:00 - 18:00' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: config.colorLight }}>
                  <item.icon className="w-5 h-5" style={{ color: config.colorDark }} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{item.label}</h4>
                  <p className="text-gray-600 text-sm">{item.value}</p>
                </div>
              </div>
            ))}

            {/* Telegram */}
            <a
              href={`https://t.me/+${config.whatsapp.replace(/[^0-9+]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200 hover:bg-blue-100 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Telegram</h4>
                <p className="text-blue-700 text-sm font-medium">Chat with us directly</p>
              </div>
            </a>
          </div>

          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Send a Message</h3>
            <ContactForm entity={entity} />
          </div>
        </div>
      </div>
    </div>
  );

  // Donate Tab (Foundation only)
  const renderDonate = () => (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4" style={{ backgroundColor: config.colorLight, color: config.colorDark }}>
            <Heart className="w-4 h-4" /> Support Our Mission
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Make a Donation</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Your generosity helps us continue our work in empowering communities and transforming lives across Africa.</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-12">
            <div className="text-center mb-8">
              <Heart className="w-16 h-16 mx-auto mb-4" style={{ color: config.color }} />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Support Foundation Pro Bono</h2>
              <p className="text-gray-600">Every contribution, no matter the size, makes a difference in the lives of those we serve.</p>
            </div>

            <div className="space-y-6">
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { amount: '$25', desc: 'Provides educational materials for one child' },
                  { amount: '$50', desc: 'Supports a family with basic necessities' },
                  { amount: '$100', desc: 'Funds community health initiatives' },
                ].map((option, i) => (
                  <button
                    key={i}
                    className="p-4 border border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-colors text-center"
                  >
                    <div className="font-bold text-gray-900 text-lg">{option.amount}</div>
                    <div className="text-xs text-gray-500 mt-1">{option.desc}</div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => window.open('https://donate.example.com', '_blank')}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
              >
                <Heart className="w-5 h-5" />
                Donate Now
              </button>

              <p className="text-center text-sm text-gray-500">
                Your donation will open our secure donation portal where you can complete your contribution safely.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs: Record<string, () => JSX.Element> = {
    home: renderHome,
    about: renderAbout,
    services: renderServices,
    portfolio: renderPortfolio,
    contact: renderContact,
    donate: renderDonate,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {entity === 'foundation' && (
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center py-4">
              {['home', 'about', 'services', 'portfolio', 'donate', 'contact'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setEntityTab(tab as EntityTab)}
                  className={`px-4 py-2 mx-1 rounded-lg text-sm font-medium capitalize transition-all ${
                    entityTab === tab
                      ? 'text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  style={entityTab === tab ? { backgroundColor: config.color } : {}}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {tabs[entityTab]?.() || renderHome()}
    </div>
  );
};

export default EntityPage;
