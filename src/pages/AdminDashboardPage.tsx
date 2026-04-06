import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { ENTITIES, ENTITY_LIST, EntityKey } from '@/data/constants';
import { 
  LayoutDashboard, Scale, Building2, Heart, Landmark, Mail, Calendar, 
  Settings, LogOut, Plus, Trash2, Edit, Eye, EyeOff, Check, X, 
  Loader2, ChevronDown, Users, Briefcase, FolderOpen, ArrowLeft
} from 'lucide-react';

type AdminTab = 'overview' | 'services' | 'portfolio' | 'contacts' | 'bookings';

const ENTITY_ICONS: Record<EntityKey, React.FC<any>> = { 
  law: Scale, 
  realestate: Building2, 
  foundation: Heart, 
  credit: Landmark 
};

const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { logoutAdmin, adminEmail } = useApp();
  const [tab, setTab] = useState<AdminTab>('overview');
  const [entityFilter, setEntityFilter] = useState<EntityKey | 'all'>('all');
  const [services, setServices] = useState<any[]>([]);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load mock data
    const loadData = () => {
      setServices([
        { id: 1, name: 'Legal Consultation', entity: 'law', status: 'active', date: '2024-01-15' },
        { id: 2, name: 'Property Management', entity: 'realestate', status: 'active', date: '2024-01-16' },
      ]);
      setPortfolio([
        { id: 1, title: 'Corporate Law Case', entity: 'law', status: 'completed', date: '2024-01-10' },
        { id: 2, title: 'Real Estate Development', entity: 'realestate', status: 'ongoing', date: '2024-01-12' },
      ]);
      setContacts([
        { id: 1, name: 'John Doe', email: 'john@example.com', entity: 'law', date: '2024-01-15' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', entity: 'realestate', date: '2024-01-16' },
      ]);
      setBookings([
        { id: 1, service: 'Legal Consultation', client: 'John Doe', date: '2024-01-20', status: 'confirmed' },
        { id: 2, service: 'Property Management', client: 'Jane Smith', date: '2024-01-21', status: 'pending' },
      ]);
      setLoading(false);
    };

    loadData();
  }, []);

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      );
    }

    switch (tab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Services</p>
                  <p className="text-2xl font-bold text-gray-900">{services.length}</p>
                </div>
                <Briefcase className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Portfolio Items</p>
                  <p className="text-2xl font-bold text-gray-900">{portfolio.length}</p>
                </div>
                <FolderOpen className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Contacts</p>
                  <p className="text-2xl font-bold text-gray-900">{contacts.length}</p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </div>
        );

      case 'services':
        return (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Services</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Entity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {services.map((service) => (
                    <tr key={service.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {service.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {service.entity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          {service.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {service.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600">This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="mr-4 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{adminEmail}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'services', label: 'Services', icon: Briefcase },
              { id: 'portfolio', label: 'Portfolio', icon: FolderOpen },
              { id: 'contacts', label: 'Contacts', icon: Users },
              { id: 'bookings', label: 'Bookings', icon: Calendar },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id as AdminTab)}
                className={`flex items-center gap-2 px-3 py-4 border-b-2 text-sm font-medium ${
                  tab === item.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
