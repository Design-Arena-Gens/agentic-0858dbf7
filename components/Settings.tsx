'use client';

import { useState } from 'react';
import { Key, Mail, MapPin, Clock, Shield, Bell, Save, AlertTriangle } from 'lucide-react';

export default function Settings() {
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    googleMapsApiKey: '',
    emailService: 'sendgrid',
    emailApiKey: '',
    smtpHost: '',
    smtpPort: '',
    smtpUsername: '',
    smtpPassword: '',
    searchRadius: '10',
    targetCategories: 'restaurant,retail,services',
    emailFrequency: '50',
    dailyLimit: '200',
    enableNotifications: true,
    notifyOnReply: true,
    notifyOnError: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Configure your application settings and API keys</p>
      </div>

      <div className="space-y-6">
        {/* API Keys Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            <Key size={24} className="text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">API Keys</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Google Maps API Key
              </label>
              <input
                type="password"
                value={formData.googleMapsApiKey}
                onChange={(e) => handleChange('googleMapsApiKey', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Enter your Google Maps API key"
              />
              <p className="text-xs text-gray-500 mt-1">
                Required for Google Maps integration and business search
              </p>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Email Service Provider
              </label>
              <select
                value={formData.emailService}
                onChange={(e) => handleChange('emailService', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none mb-4"
              >
                <option value="sendgrid">SendGrid</option>
                <option value="mailgun">Mailgun</option>
                <option value="smtp">Custom SMTP</option>
              </select>

              {formData.emailService === 'smtp' ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SMTP Host
                      </label>
                      <input
                        type="text"
                        value={formData.smtpHost}
                        onChange={(e) => handleChange('smtpHost', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="smtp.example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SMTP Port
                      </label>
                      <input
                        type="text"
                        value={formData.smtpPort}
                        onChange={(e) => handleChange('smtpPort', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="587"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      value={formData.smtpUsername}
                      onChange={(e) => handleChange('smtpUsername', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="username@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      value={formData.smtpPassword}
                      onChange={(e) => handleChange('smtpPassword', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    API Key
                  </label>
                  <input
                    type="password"
                    value={formData.emailApiKey}
                    onChange={(e) => handleChange('emailApiKey', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder={`Enter your ${formData.emailService} API key`}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            <MapPin size={24} className="text-green-600" />
            <h2 className="text-xl font-bold text-gray-900">Search Settings</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Search Radius (miles)
              </label>
              <input
                type="number"
                value={formData.searchRadius}
                onChange={(e) => handleChange('searchRadius', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                min="1"
                max="50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Categories (comma-separated)
              </label>
              <input
                type="text"
                value={formData.targetCategories}
                onChange={(e) => handleChange('targetCategories', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="restaurant,retail,services"
              />
              <p className="text-xs text-gray-500 mt-1">
                Focus your search on specific business categories
              </p>
            </div>
          </div>
        </div>

        {/* Email Sending Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            <Clock size={24} className="text-orange-600" />
            <h2 className="text-xl font-bold text-gray-900">Email Sending</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emails per Hour
              </label>
              <input
                type="number"
                value={formData.emailFrequency}
                onChange={(e) => handleChange('emailFrequency', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                min="1"
                max="100"
              />
              <p className="text-xs text-gray-500 mt-1">
                Control sending rate to avoid spam filters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Email Limit
              </label>
              <input
                type="number"
                value={formData.dailyLimit}
                onChange={(e) => handleChange('dailyLimit', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                min="1"
                max="1000"
              />
              <p className="text-xs text-gray-500 mt-1">
                Maximum emails to send per day
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3">
              <AlertTriangle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-900">
                  Important: Email Best Practices
                </p>
                <p className="text-xs text-yellow-800 mt-1">
                  Always comply with anti-spam laws (CAN-SPAM, GDPR). Include an unsubscribe
                  link and your physical address in all emails.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell size={24} className="text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Enable Notifications</p>
                <p className="text-sm text-gray-600">
                  Receive notifications about system activity
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.enableNotifications}
                  onChange={(e) => handleChange('enableNotifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {formData.enableNotifications && (
              <>
                <div className="flex items-center justify-between pl-6">
                  <div>
                    <p className="font-medium text-gray-900">Notify on Reply</p>
                    <p className="text-sm text-gray-600">
                      When a business responds to your email
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.notifyOnReply}
                      onChange={(e) => handleChange('notifyOnReply', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between pl-6">
                  <div>
                    <p className="font-medium text-gray-900">Notify on Errors</p>
                    <p className="text-sm text-gray-600">
                      When API errors or failures occur
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.notifyOnError}
                      onChange={(e) => handleChange('notifyOnError', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Save size={20} />
            {saved ? 'Settings Saved!' : 'Save Settings'}
          </button>
        </div>

        {saved && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <Shield size={20} className="text-green-600" />
            <p className="text-sm text-green-800">
              Your settings have been saved successfully.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
