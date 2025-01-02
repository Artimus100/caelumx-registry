'use-client';
import React, { useState } from 'react';
import { useWallet } from '../../hooks/';
import { useTrading } from '../../hooks/useTrading';
import type { CreditProject } from '../../types/ledger';

interface CreateListingFormProps {
  project: CreditProject;
  onSuccess: () => void;
}

export function CreateListingForm({ project, onSuccess }: CreateListingFormProps) {
  const { publicKey } = useWallet();
  const { addListing } = useTrading();
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!publicKey) return;

    const listing = {
      id: crypto.randomUUID(),
      projectId: project.id,
      sellerAddress: publicKey,
      pricePerCredit: parseFloat(price),
      quantity: parseInt(quantity, 10),
      timestamp: new Date(),
      status: 'active' as const,
    };

    addListing(listing);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
          max={project.availableCredits}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-caelum-500 focus:ring-caelum-500"
          required
        />
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price per Credit (SOL)
        </label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0.000001"
          step="0.000001"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-caelum-500 focus:ring-caelum-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-caelum-600 text-white rounded-lg hover:bg-caelum-700 transition-colors"
      >
        Create Listing
      </button>
    </form>
  );
}