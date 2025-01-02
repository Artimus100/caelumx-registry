import { create } from 'zustand';
import { WalletSlice, createWalletSlice } from './slices/walletSlice';
import { TransactionSlice, createTransactionSlice } from './slices/transactionSlice';
import { ProjectSlice, createProjectSlice } from './slices/projectSlice';

type LedgerStore = WalletSlice & TransactionSlice & ProjectSlice;

export const useLedgerStore = create<LedgerStore>()((...args) => ({
  ...createWalletSlice(...args),
  ...createTransactionSlice(...args),
  ...createProjectSlice(...args),
}));