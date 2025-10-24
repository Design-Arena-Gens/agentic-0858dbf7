import { Business } from '@/app/page';
import { Building2, Phone, MapPin, Star, Globe, Filter } from 'lucide-react';
import { useState } from 'react';

interface BusinessListProps {
  businesses: Business[];
  onBusinessSelect: (business: Business) => void;
}

export default function BusinessList({ businesses, onBusinessSelect }: BusinessListProps) {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'status'>('name');

  const filteredBusinesses = businesses.filter((b) => {
    if (filterStatus === 'all') return true;
    return b.status === filterStatus;
  });

  const sortedBusinesses = [...filteredBusinesses].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'rating') return b.rating - a.rating;
    return a.status.localeCompare(b.status);
  });

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
    <div className="p-6">
      {/* Filters and Controls */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-600" />
            <span className="font-medium text-gray-700">Filter:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              aria-label="Filter by status"
            >
              <option value="all">All Businesses</option>
              <option value="not_contacted">Not Contacted</option>
              <option value="email_sent">Email Sent</option>
              <option value="opened">Opened</option>
              <option value="replied">Replied</option>
              <option value="interested">Interested</option>
              <option value="not_interested">Not Interested</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-700">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              aria-label="Sort businesses"
            >
              <option value="name">Name</option>
              <option value="rating">Rating</option>
              <option value="status">Status</option>
            </select>
          </div>

          <div className="ml-auto text-sm text-gray-600">
            Showing {sortedBusinesses.length} of {businesses.length} businesses
          </div>
        </div>
      </div>

      {/* Business Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedBusinesses.map((business) => (
          <div
            key={business.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {business.name}
                  </h3>
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                    {business.category}
                  </span>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Building2 size={20} className="text-blue-600" />
                </div>
              </div>

              {/* Info */}
              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <MapPin size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="line-clamp-2">{business.address}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={16} className="text-gray-400" />
                  <span>{business.phone}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Star size={16} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium text-gray-900">
                    {business.rating}
                  </span>
                  <span className="text-sm text-gray-500">/ 5.0</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Globe size={16} className="text-red-500" />
                  <span className="text-red-600 font-medium">No Website</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mb-4">
                <span
                  className={`inline-block px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(
                    business.status
                  )}`}
                >
                  {getStatusLabel(business.status)}
                </span>
                {business.emailSentDate && (
                  <p className="text-xs text-gray-500 mt-2">
                    Email sent: {new Date(business.emailSentDate).toLocaleDateString()}
                  </p>
                )}
              </div>

              {/* Action Button */}
              <button
                onClick={() => onBusinessSelect(business)}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {sortedBusinesses.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Building2 size={48} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No businesses found
          </h3>
          <p className="text-gray-600">
            Try adjusting your filters or search criteria
          </p>
        </div>
      )}
    </div>
  );
}
