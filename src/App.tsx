
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AppProvider } from "@/contexts/AppContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import TeamPage from "./pages/TeamPage";
import ContactPage from "./pages/ContactPage";
import EagleCompanyPage from './pages/EagleCompanyPage';
import FoundationProBonoPage from './pages/FoundationProBonoPage';
import LawFirmPage from './pages/LawFirmPage';
import CreditImmobilierPage from './pages/CreditImmobilierPage';
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from "./components/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppProvider>
          <LanguageProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter future={{ v7_relativeSplatPath: true }}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/team" element={<TeamPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/law-firm" element={<LawFirmPage />} />
                <Route path="/law-firm/:tab" element={<LawFirmPage />} />
                <Route path="/eagle-company" element={<EagleCompanyPage />} />
                <Route path="/eagle-company/:tab" element={<EagleCompanyPage />} />
                <Route path="/foundation-pro-bono" element={<FoundationProBonoPage />} />
                <Route path="/foundation-pro-bono/:tab" element={<FoundationProBonoPage />} />
                <Route path="/credit-immobilier" element={<CreditImmobilierPage />} />
                <Route path="/credit-immobilier/:tab" element={<CreditImmobilierPage />} />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/services" element={<AdminDashboard />} />
                <Route path="/admin/portfolio" element={<AdminDashboard />} />
                <Route path="/admin/contacts" element={<AdminDashboard />} />
                <Route path="/admin/bookings" element={<AdminDashboard />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </LanguageProvider>
        </AppProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
