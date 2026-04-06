import React, { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { ENTITIES, ENTITY_LIST, EntityKey } from '@/data/constants';
import { Menu, X, ChevronDown, Shield } from 'lucide-react';

const Navbar: React.FC = () => {
  const { view, activeEntity, entityTab, goHome, openEntity, setEntityTab, openAdminLogin, isAdminLoggedIn, goToAdmin } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const entityTabs = ['home', 'about', 'services', 'portfolio', 'contact'] as const;

  const entityConfig = activeEntity ? ENTITIES[activeEntity] : null;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button onClick={goHome} className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-105 transition-transform">
              N
            </div>
            <div className="hidden sm:block">
              <h1 className={`font-bold text-lg leading-tight transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                Ngonji's Holding
              </h1>
              <p className={`text-xs leading-tight transition-colors ${scrolled ? 'text-gray-500' : 'text-blue-200'}`}>
                Firm
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {view === 'entity' && entityConfig ? (
              // Entity sub-navigation
              <>
                <button onClick={goHome} className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${scrolled ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>
                  All Services
                </button>
                <span className={`mx-1 ${scrolled ? 'text-gray-300' : 'text-white/30'}`}>/</span>
                <span className={`px-2 py-1 rounded text-xs font-semibold`} style={{ backgroundColor: entityConfig.colorLight, color: entityConfig.colorDark }}>
                  {entityConfig.name}
                </span>
                <span className={`mx-1 ${scrolled ? 'text-gray-300' : 'text-white/30'}`}>/</span>
                {entityTabs.map(tab => (
                  <button
                    key={tab}
                    onClick={() => setEntityTab(tab)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                      entityTab === tab
                        ? 'text-white shadow-md'
                        : scrolled ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                    style={entityTab === tab ? { backgroundColor: entityConfig.color } : {}}
                  >
                    {tab}
                  </button>
                ))}
              </>
            ) : view === 'home' ? (
              // Main navigation
              <>
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${scrolled ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' : 'text-white/90 hover:text-white hover:bg-white/10'}`}
                  >
                    Our Services <ChevronDown className="w-4 h-4" />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      {ENTITY_LIST.map(key => {
                        const e = ENTITIES[key];
                        return (
                          <button
                            key={key}
                            onClick={() => { openEntity(key); setDropdownOpen(false); }}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                          >
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: e.color }} />
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{e.name}</p>
                              <p className="text-xs text-gray-500">{e.tagline}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
                {['About', 'Team', 'Contact'].map(item => (
                  <button
                    key={item}
                    onClick={() => {
                      const el = document.getElementById(item.toLowerCase());
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${scrolled ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' : 'text-white/90 hover:text-white hover:bg-white/10'}`}
                  >
                    {item}
                  </button>
                ))}
              </>
            ) : null}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button
              onClick={isAdminLoggedIn ? goToAdmin : openAdminLogin}
              className={`hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                scrolled ? 'bg-blue-900 text-white hover:bg-blue-800' : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
              }`}
            >
              <Shield className="w-4 h-4" />
              {isAdminLoggedIn ? 'Dashboard' : 'Admin'}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t shadow-xl animate-in slide-in-from-top-2 duration-300">
          <div className="px-4 py-4 space-y-2">
            {view === 'entity' && entityConfig ? (
              <>
                <button onClick={() => { goHome(); setMobileOpen(false); }} className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
                  All Services
                </button>
                <div className="border-t my-2" />
                {entityTabs.map(tab => (
                  <button
                    key={tab}
                    onClick={() => { setEntityTab(tab); setMobileOpen(false); }}
                    className={`w-full text-left px-4 py-3 rounded-lg capitalize font-medium transition-all ${
                      entityTab === tab ? 'text-white' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    style={entityTab === tab ? { backgroundColor: entityConfig.color } : {}}
                  >
                    {tab}
                  </button>
                ))}
              </>
            ) : (
              <>
                {ENTITY_LIST.map(key => {
                  const e = ENTITIES[key];
                  return (
                    <button
                      key={key}
                      onClick={() => { openEntity(key); setMobileOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: e.color }} />
                      <span className="text-sm font-medium text-gray-700">{e.name}</span>
                    </button>
                  );
                })}
              </>
            )}
            <div className="border-t my-2" />
            <button
              onClick={() => { isAdminLoggedIn ? goToAdmin() : openAdminLogin(); setMobileOpen(false); }}
              className="w-full flex items-center gap-2 px-4 py-3 rounded-lg bg-blue-900 text-white font-medium"
            >
              <Shield className="w-4 h-4" />
              {isAdminLoggedIn ? 'Dashboard' : 'Admin Login'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
