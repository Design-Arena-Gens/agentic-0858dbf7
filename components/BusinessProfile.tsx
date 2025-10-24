import { Business } from '@/app/page';
import { X, Building2, MapPin, Phone, Star, Globe, Mail, Calendar, Activity, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface BusinessProfileProps {
  business: Business;
  onClose: () => void;
  onUpdate: (business: Business) => void;
}

export default function BusinessProfile({ business, onClose, onUpdate }: BusinessProfileProps) {
  const [showEmailConfirm, setShowEmailConfirm] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSendEmail = () => {
    setSending(true);
    setTimeout(() => {
      onUpdate({
        ...business,
        status: 'email_sent',
        emailSentDate: new Date().toISOString().split('T')[0],
      });
      setSending(false);
      setShowEmailConfirm(false);
    }, 1500);
  };

  const getStatusColor = (status: Business['status']) => {
    const colors = {
      not_contacted: 'bg-gray-100 text-gray-700 border-gray-300',
      email_sent: 'bg-blue-100 text-blue-700 border-blue-300',
      opened: 'bg-purple-100 text-purple-700 border-purple-300',
      replied: 'bg-green-100 text-green-700 border-green-300',
      interested: 'bg-emerald-100 text-emerald-700 border-emerald-300',
      not_interested: 'bg-red-100 text-red-700 border-red-300',
    };
    return colors[status];
  };

  const getStatusLabel = (status: Business['status']) => {
    return status.split('_').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="p-4 bg-blue-100 rounded-lg">
              <Building2 size={32} className="text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {business.name}
              </h1>
              <div className="flex items-center gap-2">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-gray-100 text-gray-700 rounded">
                  {business.category}
                </span>
                <span
                  className={`inline-block px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(
                    business.status
                  )}`}
                >
                  {getStatusLabel(business.status)}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close profile"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Contact Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-600 font-medium">Address</p>
                  <p className="text-gray-900">{business.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={20} className="text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-600 font-medium">Phone</p>
                  <a
                    href={`tel:${business.phone}`}
                    className="text-blue-600 hover:underline"
                  >
                    {business.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Star size={20} className="text-yellow-500 fill-yellow-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-600 font-medium">Rating</p>
                  <p className="text-gray-900">{business.rating} / 5.0</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe size={20} className="text-red-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-600 font-medium">Website</p>
                  <div className="flex items-center gap-2">
                    <AlertCircle size={16} className="text-red-500" />
                    <span className="text-red-600 font-medium">No website found</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Activity Timeline
            </h2>
            <div className="space-y-4">
              {business.emailSentDate && (
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Mail size={16} className="text-blue-600" />
                    </div>
                    <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                  </div>
                  <div className="pb-4">
                    <p className="font-medium text-gray-900">Email Sent</p>
                    <p className="text-sm text-gray-600">
                      {new Date(business.emailSentDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              )}

              {business.lastActivity && (
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="p-2 bg-green-100 rounded-full">
                      <Activity size={16} className="text-green-600" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Last Activity</p>
                    <p className="text-sm text-gray-600">
                      {new Date(business.lastActivity).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              )}

              {!business.emailSentDate && !business.lastActivity && (
                <div className="text-center py-8 text-gray-500">
                  <Calendar size={48} className="mx-auto mb-2 text-gray-300" />
                  <p>No activity yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button
                onClick={() => setShowEmailConfirm(true)}
                disabled={business.status !== 'not_contacted'}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Mail size={20} />
                Send Cold Email
              </button>

              <button className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                <Phone size={20} />
                Call Business
              </button>

              <button className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                <MapPin size={20} />
                View on Map
              </button>
            </div>
          </div>

          {/* Status Update */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Update Status</h2>
            <select
              value={business.status}
              onChange={(e) =>
                onUpdate({ ...business, status: e.target.value as Business['status'] })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              aria-label="Update business status"
            >
              <option value="not_contacted">Not Contacted</option>
              <option value="email_sent">Email Sent</option>
              <option value="opened">Opened</option>
              <option value="replied">Replied</option>
              <option value="interested">Interested</option>
              <option value="not_interested">Not Interested</option>
            </select>
          </div>

          {/* Statistics */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Statistics</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Google Rating</span>
                <span className="font-semibold text-gray-900">{business.rating}/5.0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Category</span>
                <span className="font-semibold text-gray-900">{business.category}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Has Website</span>
                <span className="font-semibold text-red-600">No</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Confirmation Modal */}
      {showEmailConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Mail size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Send Cold Email</h3>
            </div>

            <p className="text-gray-600 mb-6">
              Are you sure you want to send a cold email to <strong>{business.name}</strong>?
              This will use your default email template.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowEmailConfirm(false)}
                disabled={sending}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSendEmail}
                disabled={sending}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {sending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} />
                    Confirm & Send
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
