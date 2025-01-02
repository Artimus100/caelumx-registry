import { create } from 'zustand';
import { PublicKey } from '@solana/web3.js';


interface TradingState {
  listings: CreditListing[];
  addListing: (listing: CreditListing) => void;
  removeListing: (id: string) => void;
  updateListing: (id: string, updates: Partial<CreditListing>) => void;
}

export interface CreditListing {
  id: string;
  projectId: string;
  sellerAddress: string;
  pricePerCredit: number;
  quantity: number;
  timestamp: Date;
  status: 'active' | 'sold' | 'cancelled';
}

export const useTrading = create<TradingState>((set) => ({
  listings: [],
  addListing: (listing) =>
    set((state) => ({
      listings: [listing, ...state.listings],
    })),
  removeListing: (id) =>
    set((state) => ({
      listings: state.listings.filter((l) => l.id !== id),
    })),
  updateListing: (id, updates) =>
    set((state) => ({
      listings: state.listings.map((l) =>
        l.id === id ? { ...l, ...updates } : l
      ),
    })),
}));