'use-client';
import React, { useState } from 'react';
import { useTrading } from '../../hooks/useTrading';
import { ListingCard } from './ListingCard';
import { CreateListingForm } from './CreateListingForm';
import { Plus, Search } from 'lucide-react';

export function MarketplacePage() {
  const { listings } = useTrading();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredListings = listings.filter((listing) =>
    listing.status === 'active'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Carbon Credit Marketplace</h1>
        
        <button
          onClick={() => setShowCreateForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-caelum-600 text-white rounded-lg hover:bg-caelum-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>List Credits</span>
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-caelum-500 focus:border-caelum-500 sm:text-sm"
            placeholder="Search listings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            project={{} as any} // Replace with actual project data
            onBuy={() => {
              // Implement buy flow
            }}
          />
        ))}
      </div>

      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Create New Listing</h2>
            <CreateListingForm
              project={{} as any} // Replace with actual project data
              onSuccess={() => setShowCreateForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}