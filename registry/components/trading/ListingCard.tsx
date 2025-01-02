'use-client';
import React from 'react';
import { format } from 'date-fns';
import { Tag, Clock, CreditCard } from 'lucide-react';
import type { CreditListing } from '../../hooks/useTrading';
import { useWallet } from '../../hooks/usewallet';

interface ListingCardProps {
  listing: CreditListing;
  project: CreditProject;
  onBuy: () => void;
}

export function ListingCard({ listing, project, onBuy }: ListingCardProps) {
  const { connected, publicKey } = useWallet();
  const isOwner = publicKey === listing.sellerAddress;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{project.name}</h3>
        <span className="text-sm text-gray-500">
          Listed {format(listing.timestamp, 'PP')}
        </span>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <Tag className="text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Price per Credit</p>
              <p className="text-lg font-semibold">
                ◎ {listing.pricePerCredit.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <CreditCard className="text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Quantity</p>
              <p className="text-lg font-semibold">{listing.quantity}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>Total Value: ◎ {(listing.pricePerCredit * listing.quantity).toFixed(2)}</span>
        </div>

        {connected && !isOwner && (
          <button
            onClick={onBuy}
            className="w-full py-2 bg-caelum-600 text-white rounded-lg hover:bg-caelum-700 transition-colors"
          >
            Buy Credits
          </button>
        )}
      </div>
    </div>
  );
}