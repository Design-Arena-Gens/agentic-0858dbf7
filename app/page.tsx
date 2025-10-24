'use client';

import { useState } from 'react';
import Dashboard from '@/components/Dashboard';
import MapView from '@/components/MapView';
import BusinessList from '@/components/BusinessList';
import BusinessProfile from '@/components/BusinessProfile';
import EmailTemplateEditor from '@/components/EmailTemplateEditor';
import Settings from '@/components/Settings';
import { Menu, X, Home, Map, Mail, Settings as SettingsIcon, FileText } from 'lucide-react';

export type Business = {
  id: string;
  name: string;
  address: string;
  phone: string;
  rating: number;
  category: string;
  lat: number;
  lng: number;
  hasWebsite: boolean;
  status: 'not_contacted' | 'email_sent' | 'opened' | 'replied' | 'interested' | 'not_interested';
  emailSentDate?: string;
  lastActivity?: string;
};

export default function HomePage() {
  const [activeView, setActiveView] = useState<'dashboard' | 'map' | 'businesses' | 'email' | 'settings'>('dashboard');
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [businesses, setBusinesses] = useState<Business[]>([
    {
      id: '1',
      name: 'Joe\'s Pizza Parlor',
      address: '123 Main St, New York, NY 10001',
      phone: '(555) 123-4567',
      rating: 4.5,
      category: 'Restaurant',
      lat: 40.7128,
      lng: -74.0060,
      hasWebsite: false,
      status: 'not_contacted',
    },
    {
      id: '2',
      name: 'Green Valley Auto Repair',
      address: '456 Oak Ave, Brooklyn, NY 11201',
      phone: '(555) 234-5678',
      rating: 4.8,
      category: 'Auto Repair',
      lat: 40.6782,
      lng: -73.9442,
      hasWebsite: false,
      status: 'email_sent',
      emailSentDate: '2025-10-20',
    },
    {
      id: '3',
      name: 'Sunrise Bakery',
      address: '789 Park Pl, Queens, NY 11385',
      phone: '(555) 345-6789',
      rating: 4.3,
      category: 'Bakery',
      lat: 40.7282,
      lng: -73.9178,
      hasWebsite: false,
      status: 'opened',
      emailSentDate: '2025-10-18',
      lastActivity: '2025-10-21',
    },
  ]);

  const handleBusinessUpdate = (updatedBusiness: Business) => {
    setBusinesses(prev =>
      prev.map(b => b.id === updatedBusiness.id ? updatedBusiness : b)
    );
    setSelectedBusiness(updatedBusiness);
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'map', label: 'Map View', icon: Map },
    { id: 'businesses', label: 'Businesses', icon: FileText },
    { id: 'email', label: 'Email Templates', icon: Mail },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gradient-to-b from-blue-900 to-blue-800 text-white transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between border-b border-blue-700">
          {sidebarOpen && <h1 className="text-xl font-bold">BizDev AI</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
            aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveView(item.id as any);
                    setSelectedBusiness(null);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    activeView === item.id
                      ? 'bg-blue-700 text-white'
                      : 'text-blue-100 hover:bg-blue-800'
                  }`}
                  title={!sidebarOpen ? item.label : undefined}
                >
                  <item.icon size={20} />
                  {sidebarOpen && <span>{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {sidebarOpen && (
          <div className="p-4 border-t border-blue-700">
            <div className="text-xs text-blue-200">
              <p>Version 1.0.0</p>
              <p className="mt-1">© 2025 BizDev AI</p>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {navigationItems.find(item => item.id === activeView)?.label}
              </h2>
              {selectedBusiness && (
                <p className="text-sm text-gray-600 mt-1">
                  Viewing: {selectedBusiness.name}
                </p>
              )}
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto">
          {selectedBusiness ? (
            <BusinessProfile
              business={selectedBusiness}
              onClose={() => setSelectedBusiness(null)}
              onUpdate={handleBusinessUpdate}
            />
          ) : (
            <>
              {activeView === 'dashboard' && (
                <Dashboard businesses={businesses} />
              )}
              {activeView === 'map' && (
                <MapView
                  businesses={businesses}
                  onBusinessSelect={setSelectedBusiness}
                />
              )}
              {activeView === 'businesses' && (
                <BusinessList
                  businesses={businesses}
                  onBusinessSelect={setSelectedBusiness}
                />
              )}
              {activeView === 'email' && <EmailTemplateEditor />}
              {activeView === 'settings' && <Settings />}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
