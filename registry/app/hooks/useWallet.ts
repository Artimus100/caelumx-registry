import { create } from 'zustand';
import { PhantomWalletAdapter } from '../lib/web3/wallet';

interface WalletState {
  adapter: PhantomWalletAdapter | null;
  connected: boolean;
  publicKey: string | null;
  balance: {
    credits: number;
    tokens: number;
  };
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

export const useWallet = create<WalletState>((set: (arg0: { adapter: any; connected: boolean; publicKey: any; balance?: { credits: number; tokens: number; }; }) => void) => ({
  adapter: null,
  connected: false,
  publicKey: null,
  balance: {
    credits: 0,
    tokens: 0,
  },
  connect: async () => {
    try {
      const adapter = new PhantomWalletAdapter('https://api.mainnet-beta.solana.com');
      await adapter.connect();
      
      set({
        adapter,
        connected: true,
        publicKey: adapter.publicKey?.toString() || null,
      });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  },
  disconnect: async () => {
    const { adapter } = useWallet.getState();
    if (adapter) {
      await adapter.disconnect();
      set({
        adapter: null,
        connected: false,
        publicKey: null,
        balance: {
          credits: 0,
          tokens: 0,
        },
      });
    }
  },
}));