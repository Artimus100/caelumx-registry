import { StateCreator } from 'zustand';
import { Transaction } from '../../types/ledger';

export interface TransactionSlice {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  updateTransactionStatus: (id: string, status: Transaction['status']) => void;
  getTransactionsByWallet: (address: string) => Transaction[];
}

export const createTransactionSlice: StateCreator<TransactionSlice> = (set, get) => ({
  transactions: [],
  
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions],
    })),
    
  updateTransactionStatus: (id, status) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, status } : t
      ),
    })),
    
  getTransactionsByWallet: (address) =>
    get().transactions.filter((t) => t.walletAddress === address),
});