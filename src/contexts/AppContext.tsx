import React, { createContext, useContext, useState, useCallback } from 'react';
import { EntityKey } from '@/data/constants';

type View = 'home' | 'entity' | 'admin-login' | 'admin';
type EntityTab = 'home' | 'about' | 'services' | 'portfolio' | 'contact' | 'team' | 'donate';

interface AppState {
  view: View;
  activeEntity: EntityKey | null;
  entityTab: EntityTab;
  isAdminLoggedIn: boolean;
  adminEmail: string;
}

interface AppContextType extends AppState {
  goHome: () => void;
  openEntity: (key: EntityKey) => void;
  setEntityTab: (tab: EntityTab) => void;
  setActiveEntity: (key: EntityKey | null) => void;
  openAdminLogin: () => void;
  loginAdmin: (email: string) => void;
  logoutAdmin: () => void;
  goToAdmin: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    view: 'home',
    activeEntity: null,
    entityTab: 'home',
    isAdminLoggedIn: false,
    adminEmail: '',
  });

  const goHome = useCallback(() => {
    setState(s => ({ ...s, view: 'home', activeEntity: null, entityTab: 'home' }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openEntity = useCallback((key: EntityKey) => {
    setState(s => ({ ...s, view: 'entity', activeEntity: key, entityTab: 'home' }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const setEntityTab = useCallback((tab: EntityTab) => {
    setState(s => ({ ...s, entityTab: tab }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const setActiveEntity = useCallback((key: EntityKey | null) => {
    setState(s => ({ ...s, activeEntity: key }));
  }, []);

  const openAdminLogin = useCallback(() => {
    setState(s => ({ ...s, view: 'admin-login' }));
  }, []);

  const loginAdmin = useCallback((email: string) => {
    setState(s => ({ ...s, view: 'admin', isAdminLoggedIn: true, adminEmail: email }));
  }, []);

  const logoutAdmin = useCallback(() => {
    setState(s => ({ ...s, view: 'home', isAdminLoggedIn: false, adminEmail: '' }));
  }, []);

  const goToAdmin = useCallback(() => {
    setState(s => ({ ...s, view: 'admin' }));
  }, []);

  return (
    <AppContext.Provider value={{ ...state, goHome, openEntity, setEntityTab, setActiveEntity, openAdminLogin, loginAdmin, logoutAdmin, goToAdmin }}>
      {children}
    </AppContext.Provider>
  );
};
