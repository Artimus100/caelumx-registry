import { StateCreator } from 'zustand';
import { Wallet } from '../../types/ledger';

export interface WalletSlice {
  wallets: Wallet[];
  currentWallet: Wallet | null;
  setCurrentWallet: (wallet: Wallet) => void;
  updateWalletBalance: (address: string, balance: Wallet['balance']) => void;
  syncWalletWithBlockchain: (address: string) => Promise<void>;
}

export const createWalletSlice: StateCreator<WalletSlice> = (set) => ({
  wallets: [],
  currentWallet: null,
  
  setCurrentWallet: (wallet) => set({ currentWallet: wallet }),
  
  updateWalletBalance: (address, balance) =>
    set((state) => ({
      wallets: state.wallets.map((w) =>
        w.address === address ? { ...w, balance, lastSynced: new Date() } : w
      ),
    })),
    
  syncWalletWithBlockchain: async (address) => {
    try {
      // Implement blockchain sync logic here
      console.log('Syncing wallet:', address);
    } catch (error) {
      console.error('Wallet sync failed:', error);
    }
  },
});