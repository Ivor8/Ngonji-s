import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useApp } from '@/contexts/AppContext';
import { ENTITIES, ENTITY_LIST, EntityKey } from '@/data/constants';
import { 
  LayoutDashboard, Scale, Building2, Heart, Landmark, Mail, Calendar, 
  Settings, LogOut, Plus, Trash2, Edit, Eye, EyeOff, Check, X, 
  Loader2, ChevronDown, Users, Briefcase, FolderOpen, ArrowLeft
} from 'lucide-react';

type AdminTab = 'overview' | 'services' | 'portfolio' | 'contacts' | 'bookings';

const ENTITY_ICONS: Record<EntityKey, React.FC<any>> = { law: Scale, realestate: Building2, foundation: Heart, credit: Landmark };

const AdminDashboard: React.FC = () => {
  const { logoutAdmin, goHome, adminEmail } = useApp();
  const [tab, setTab] = useState<AdminTab>('overview');
  const [entityFilter, setEntityFilter] = useState<EntityKey | 'all'>('all');
  const [services, setServices] = useState<any[]>([]);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [s, p, c, b] = await Promise.all([
        api.getServices(),
        api.getPortfolioItems(),
        api.getContacts(),
        api.getBookings(),
      ]);
      setServices(s || []);
      setPortfolio(p || []);
      setContacts(c || []);
      setBookings(b || []);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      // Set empty arrays on error to prevent UI crashes
      setServices([]);
      setPortfolio([]);
      setContacts([]);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const filterByEntity = (items: any[]) => entityFilter === 'all' ? items : items.filter(i => i.entity === entityFilter);

  // CRUD operations
  const handleSaveService = async () => {
    setSaving(true);
    try {
      if (editingItem) {
        await api.updateService(editingItem.id, formData);
      } else {
        await api.createService(formData);
      }
      setShowForm(false);
      setEditingItem(null);
      fetchAll();
    } catch (error) {
      console.error('Error saving service:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleSavePortfolio = async () => {
    setSaving(true);
    try {
      if (editingItem) {
        await api.updatePortfolioItem(editingItem.id, formData, selectedFile || undefined);
      } else {
        await api.createPortfolioItem(formData, selectedFile || undefined);
      }
      setShowForm(false);
      setEditingItem(null);
      setSelectedFile(null);
      setImagePreview('');
      fetchAll();
    } catch (error) {
      console.error('Error saving portfolio item:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = async (type: string, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      switch (type) {
        case 'services':
          await api.deleteService(id);
          break;
        case 'portfolio':
          await api.deletePortfolioItem(id);
          break;
        case 'contacts':
          await api.deleteContact(id);
          break;
        case 'bookings':
          await api.deleteBooking(id);
          break;
      }
      fetchAll();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleToggleRead = async (id: string, currentVal: boolean) => {
    try {
      await api.toggleContactReadStatus(id);
      fetchAll();
    } catch (error) {
      console.error('Error toggling read status:', error);
    }
  };

  const handleUpdateBookingStatus = async (id: string, status: string) => {
    try {
      await api.updateBookingStatus(id, status);
      fetchAll();
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  const sidebarItems: { key: AdminTab; label: string; icon: React.FC<any> }[] = [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'services', label: 'Services', icon: Briefcase },
    { key: 'portfolio', label: 'Portfolio', icon: FolderOpen },
    { key: 'contacts', label: 'Messages', icon: Mail },
    { key: 'bookings', label: 'Bookings', icon: Calendar },
  ];

  const renderOverview = () => {
    const unreadContacts = contacts.filter(c => !c.is_read).length;
    const pendingBookings = bookings.filter(b => b.status === 'pending').length;
    const cards = [
      { label: 'Total Services', value: services.length, color: 'bg-blue-500', icon: Briefcase },
      { label: 'Portfolio Items', value: portfolio.length, color: 'bg-emerald-500', icon: FolderOpen },
      { label: 'Messages', value: contacts.length, badge: unreadContacts, color: 'bg-amber-500', icon: Mail },
      { label: 'Bookings', value: bookings.length, badge: pendingBookings, color: 'bg-teal-500', icon: Calendar },
    ];

    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cards.map((c, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${c.color} flex items-center justify-center`}>
                  <c.icon className="w-6 h-6 text-white" />
                </div>
                {c.badge ? (
                  <span className="px-2.5 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">{c.badge} new</span>
                ) : null}
              </div>
              <p className="text-3xl font-bold text-gray-900">{c.value}</p>
              <p className="text-sm text-gray-500 mt-1">{c.label}</p>
            </div>
          ))}
        </div>

        {/* Entity breakdown */}
        <h3 className="text-lg font-bold text-gray-900 mb-4">By Entity</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ENTITY_LIST.map(key => {
            const config = ENTITIES[key];
            const Icon = ENTITY_ICONS[key];
            const sCount = services.filter(s => s.entity === key).length;
            const pCount = portfolio.filter(p => p.entity === key).length;
            return (
              <div key={key} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: config.colorLight }}>
                    <Icon className="w-5 h-5" style={{ color: config.colorDark }} />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm">{config.name}</h4>
                </div>
                <div className="flex gap-4 text-sm text-gray-500">
                  <span>{sCount} services</span>
                  <span>{pCount} projects</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent activity */}
        <h3 className="text-lg font-bold text-gray-900 mt-8 mb-4">Recent Messages</h3>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {contacts.slice(0, 5).map((c, i) => (
            <div key={c.id} className={`flex items-center gap-4 px-5 py-4 ${i < 4 ? 'border-b border-gray-50' : ''} ${!c.is_read ? 'bg-blue-50/50' : ''}`}>
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-sm">
                {c.full_name?.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm truncate">{c.full_name}</p>
                <p className="text-xs text-gray-500 truncate">{c.subject || c.message}</p>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap">{new Date(c.created_at).toLocaleDateString()}</span>
            </div>
          ))}
          {contacts.length === 0 && <p className="text-center py-8 text-gray-400 text-sm">No messages yet</p>}
        </div>
      </div>
    );
  };

  const renderServices = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Services</h2>
        <button onClick={() => { setEditingItem(null); setFormData({ entity: entityFilter === 'all' ? 'law' : entityFilter, title: '', description: '', icon: '', sort_order: 0, is_active: true }); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <h3 className="font-bold text-gray-900 mb-4">{editingItem ? 'Edit Service' : 'New Service'}</h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Entity</label>
              <select value={formData.entity} onChange={e => setFormData({ ...formData, entity: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm">
                {ENTITY_LIST.map(k => <option key={k} value={k}>{ENTITIES[k].name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" placeholder="Service title" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })}
              rows={3} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm resize-none" placeholder="Service description" />
          </div>
          <div className="flex gap-3">
            <button onClick={handleSaveService} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-800 disabled:opacity-50">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />} Save
            </button>
            <button onClick={() => { setShowForm(false); setEditingItem(null); }} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Service</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Entity</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Status</th>
                <th className="text-right px-5 py-3 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterByEntity(services).map(s => (
                <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <p className="font-medium text-gray-900">{s.title}</p>
                    <p className="text-xs text-gray-500 truncate max-w-xs">{s.description}</p>
                  </td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: ENTITIES[s.entity as EntityKey]?.colorLight, color: ENTITIES[s.entity as EntityKey]?.colorDark }}>
                      {ENTITIES[s.entity as EntityKey]?.name}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${s.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {s.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => { setEditingItem(s); setFormData(s); setShowForm(true); }}
                        className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete('services', s.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-red-600"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPortfolio = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Portfolio</h2>
        <button onClick={() => { setEditingItem(null); setFormData({ entity: entityFilter === 'all' ? 'law' : entityFilter, title: '', description: '', category: '', client_name: '', image_url: '', is_featured: false }); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-800">
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <h3 className="font-bold text-gray-900 mb-4">{editingItem ? 'Edit Project' : 'New Project'}</h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Entity</label>
              <select value={formData.entity} onChange={e => setFormData({ ...formData, entity: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm">
                {ENTITY_LIST.map(k => <option key={k} value={k}>{ENTITIES[k].name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input value={formData.category || ''} onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
              <input value={formData.client_name || ''} onChange={e => setFormData({ ...formData, client_name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Image</label>
              <div className="space-y-3">
                <input type="file" accept="image/*" onChange={handleFileSelect}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                {(imagePreview || formData.image_url) && (
                  <div className="relative">
                    <img 
                      src={imagePreview || formData.image_url} 
                      alt="Preview" 
                      className="w-full h-48 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        setImagePreview('');
                        setFormData({ ...formData, image_url: '' });
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })}
              rows={3} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm resize-none" />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={formData.is_featured || false} onChange={e => setFormData({ ...formData, is_featured: e.target.checked })} className="rounded" />
              Featured project
            </label>
          </div>
          <div className="flex gap-3">
            <button onClick={handleSavePortfolio} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-800 disabled:opacity-50">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />} Save
            </button>
            <button onClick={() => { setShowForm(false); setEditingItem(null); setSelectedFile(null); setImagePreview(''); }} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filterByEntity(portfolio).map(p => (
          <div key={p.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
            {p.image_url && <img src={p.image_url.startsWith('http') ? p.image_url : `http://localhost:5000${p.image_url}`} alt={p.title} className="w-full h-40 object-cover" />}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ backgroundColor: ENTITIES[p.entity as EntityKey]?.colorLight, color: ENTITIES[p.entity as EntityKey]?.colorDark }}>
                  {p.category || p.entity}
                </span>
                {p.is_featured && <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs font-medium">Featured</span>}
              </div>
              <h4 className="font-bold text-gray-900 text-sm mb-1">{p.title}</h4>
              <p className="text-xs text-gray-500 line-clamp-2">{p.description}</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => { setEditingItem({...p, id: p.id || p._id}); setFormData(p); setShowForm(true); setSelectedFile(null); setImagePreview(''); }}
                  className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600"><Edit className="w-4 h-4" /></button>
                <button onClick={() => handleDelete('portfolio', p.id || p._id)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-red-600"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContacts = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Messages</h2>
      <div className="space-y-4">
        {filterByEntity(contacts).map(c => (
          <div key={c.id} className={`bg-white rounded-xl p-5 shadow-sm border ${!c.is_read ? 'border-blue-200 bg-blue-50/30' : 'border-gray-100'}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-sm text-gray-600">
                  {c.full_name?.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{c.full_name}</p>
                  <p className="text-xs text-gray-500">{c.email} {c.phone && `| ${c.phone}`}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">{new Date(c.created_at).toLocaleString()}</span>
                <button onClick={() => handleToggleRead('contacts', c.id, c.is_read)}
                  className={`p-1.5 rounded-lg ${c.is_read ? 'hover:bg-blue-50 text-blue-600' : 'hover:bg-gray-100 text-gray-400'}`}
                  title={c.is_read ? 'Mark unread' : 'Mark read'}>
                  {c.is_read ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button onClick={() => handleDelete('contacts', c.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            {c.subject && <p className="font-medium text-gray-800 text-sm mb-1">{c.subject}</p>}
            <p className="text-sm text-gray-600">{c.message}</p>
            <div className="mt-2">
              <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ backgroundColor: ENTITIES[c.entity as EntityKey]?.colorLight || '#f3f4f6', color: ENTITIES[c.entity as EntityKey]?.colorDark || '#6b7280' }}>
                {ENTITIES[c.entity as EntityKey]?.name || c.entity}
              </span>
            </div>
          </div>
        ))}
        {contacts.length === 0 && <p className="text-center py-12 text-gray-400">No messages yet</p>}
      </div>
    </div>
  );

  const renderBookings = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Requests</h2>
      <div className="space-y-4">
        {filterByEntity(bookings).map(b => (
          <div key={b.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-gray-900">{b.full_name}</p>
                <p className="text-xs text-gray-500">{b.email} | {b.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <select value={b.status} onChange={e => handleUpdateBookingStatus(b.id, e.target.value)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border-0 ${
                    b.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    b.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                    b.status === 'completed' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button onClick={() => handleDelete('bookings', b.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            {b.preferred_date && <p className="text-sm text-gray-600 mb-1">Date: {b.preferred_date} {b.preferred_time && `at ${b.preferred_time}`}</p>}
            {b.details && <p className="text-sm text-gray-600">{b.details}</p>}
            <div className="mt-2 flex gap-2">
              <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ backgroundColor: ENTITIES[b.entity as EntityKey]?.colorLight || '#f3f4f6', color: ENTITIES[b.entity as EntityKey]?.colorDark || '#6b7280' }}>
                {ENTITIES[b.entity as EntityKey]?.name || b.entity}
              </span>
              <span className="text-xs text-gray-400">{new Date(b.created_at).toLocaleString()}</span>
            </div>
          </div>
        ))}
        {bookings.length === 0 && <p className="text-center py-12 text-gray-400">No bookings yet</p>}
      </div>
    </div>
  );

  const tabs: Record<AdminTab, () => JSX.Element> = { overview: renderOverview, services: renderServices, portfolio: renderPortfolio, contacts: renderContacts, bookings: renderBookings };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0 hidden lg:flex flex-col">
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center text-white font-bold">N</div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Admin Panel</p>
              <p className="text-xs text-gray-500">{adminEmail}</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {sidebarItems.map(item => (
            <button key={item.key} onClick={() => { setTab(item.key); setShowForm(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                tab === item.key ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
              }`}>
              <item.icon className="w-5 h-5" /> {item.label}
              {item.key === 'contacts' && contacts.filter(c => !c.is_read).length > 0 && (
                <span className="ml-auto px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-bold">{contacts.filter(c => !c.is_read).length}</span>
              )}
              {item.key === 'bookings' && bookings.filter(b => b.status === 'pending').length > 0 && (
                <span className="ml-auto px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">{bookings.filter(b => b.status === 'pending').length}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-gray-100 space-y-1">
          <button onClick={goHome} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
            <ArrowLeft className="w-5 h-5" /> Back to Site
          </button>
          <button onClick={logoutAdmin} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile nav */}
            <div className="lg:hidden flex gap-2 overflow-x-auto">
              {sidebarItems.map(item => (
                <button key={item.key} onClick={() => { setTab(item.key); setShowForm(false); }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
                    tab === item.key ? 'bg-blue-50 text-blue-700' : 'text-gray-500'
                  }`}>
                  <item.icon className="w-4 h-4" /> {item.label}
                </button>
              ))}
            </div>
            <h1 className="text-lg font-bold text-gray-900 hidden lg:block capitalize">{tab}</h1>
          </div>
          <div className="flex items-center gap-3">
            {/* Entity filter */}
            <select value={entityFilter} onChange={e => setEntityFilter(e.target.value as any)}
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white">
              <option value="all">All Entities</option>
              {ENTITY_LIST.map(k => <option key={k} value={k}>{ENTITIES[k].name}</option>)}
            </select>
            <button onClick={logoutAdmin} className="lg:hidden p-2 rounded-lg hover:bg-red-50 text-red-600">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : (
            tabs[tab]?.()
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
