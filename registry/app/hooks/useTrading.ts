import { create } from 'zustand';
import { PublicKey } from '@solana/web3.js';
import { CreditProject } from '../types/ledger';

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

export const useTrading = create<TradingState>((set: (arg0: { (state: any): { listings: any[]; }; (state: any): { listings: any; }; (state: any): { listings: any; }; }) => any) => ({
  listings: [],
  addListing: (listing: any) =>
    set((state: { listings: any; }) => ({
      listings: [listing, ...state.listings],
    })),
  removeListing: (id: any) =>
    set((state: { listings: any[]; }) => ({
      listings: state.listings.filter((l: { id: any; }) => l.id !== id),
    })),
  updateListing: (id: any, updates: any) =>
    set((state: { listings: any[]; }) => ({
      listings: state.listings.map((l: { id: any; }) =>
        l.id === id ? { ...l, ...updates } : l
      ),
    })),
}));