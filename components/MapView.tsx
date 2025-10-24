'use client';

import { useState, useCallback } from 'react';
import { Business } from '@/app/page';
import { MapPin, Search, Navigation, Loader } from 'lucide-react';

interface MapViewProps {
  businesses: Business[];
  onBusinessSelect: (business: Business) => void;
}

export default function MapView({ businesses, onBusinessSelect }: MapViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [radius, setRadius] = useState(5);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  const handleSearch = useCallback(() => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 2000);
  }, []);

  const handleMarkerClick = (business: Business) => {
    setSelectedMarker(business.id);
  };

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Search Area</h3>

          {/* Search Input */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                aria-label="Search location"
              />
            </div>

            {/* Radius Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Radius: {radius} miles
              </label>
              <input
                type="range"
                min="1"
                max="25"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="w-full"
                aria-label="Search radius"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 mi</span>
                <span>25 mi</span>
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSearching ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Navigation size={20} />
                  Search Area
                </>
              )}
            </button>
          </div>
        </div>

        {/* Business List */}
        <div className="flex-1 overflow-auto p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Found {businesses.length} businesses without websites
          </h3>
          <div className="space-y-2">
            {businesses.map((business) => (
              <button
                key={business.id}
                onClick={() => {
                  handleMarkerClick(business);
                  onBusinessSelect(business);
                }}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedMarker === business.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <MapPin size={16} className="text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate">
                      {business.name}
                    </h4>
                    <p className="text-sm text-gray-600 truncate">
                      {business.address}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm text-gray-700">
                        ⭐ {business.rating}
                      </span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-600">
                        {business.category}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative bg-gray-100">
        {/* Simulated Map */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300">
          {/* Map markers */}
          <div className="relative w-full h-full">
            {businesses.map((business, index) => {
              const top = 20 + (index * 15) % 60;
              const left = 20 + (index * 23) % 60;

              return (
                <button
                  key={business.id}
                  onClick={() => {
                    handleMarkerClick(business);
                    onBusinessSelect(business);
                  }}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110 ${
                    selectedMarker === business.id ? 'z-10 scale-125' : 'z-0'
                  }`}
                  style={{ top: `${top}%`, left: `${left}%` }}
                  title={business.name}
                  aria-label={`View ${business.name}`}
                >
                  <div className="relative">
                    <MapPin
                      size={32}
                      className={`${
                        selectedMarker === business.id
                          ? 'text-blue-600 drop-shadow-lg'
                          : 'text-red-600'
                      } fill-current`}
                    />
                    {selectedMarker === business.id && (
                      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-lg shadow-lg whitespace-nowrap border border-gray-200 z-20">
                        <p className="text-sm font-semibold text-gray-900">
                          {business.name}
                        </p>
                        <p className="text-xs text-gray-600">{business.category}</p>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-2 space-y-2">
            <button
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Zoom in"
              aria-label="Zoom in"
            >
              <span className="text-xl font-bold text-gray-700">+</span>
            </button>
            <div className="h-px bg-gray-300" />
            <button
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Zoom out"
              aria-label="Zoom out"
            >
              <span className="text-xl font-bold text-gray-700">−</span>
            </button>
          </div>

          {/* Map Attribution */}
          <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-3 py-2 rounded-lg text-xs text-gray-600">
            Interactive Map View • {businesses.length} locations
          </div>
        </div>
      </div>
    </div>
  );
}
