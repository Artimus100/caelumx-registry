import { ReactNode } from "react";

// Core types for the ledger system
export type TransactionType = 'purchase' | 'sale' | 'offset' | 'verification' |'purchase' | 'transfer';
export type CreditStatus = 'pending' | 'verified' | 'available' | 'retired';
export type UserRole = 'user' | 'verifier' | 'admin';

export interface Transaction {
  id: string;
  type: TransactionType;
  userId: string;
  walletAddress: string;
  amount: number;
  timestamp: Date;
  status: 'pending' | 'completed' | 'failed';
  projectId?: string;
  verifierId?: string;
  blockchainHash?: string;
  ipfsHash?: string;
  metadata?: Record<string, unknown>;
}

export interface CreditProject {
  id: string;
  name: string;
  description: string;
  location: string;
  totalCredits: number;
  availableCredits: number;
  retiredCredits: number;
  status: CreditStatus;
  verifierId?: string;
  lastVerified?: Date;
  ipfsHash?: string;
}

export interface Wallet {
  address: string;
  userId: string;
  balance: {
    [x: string]: ReactNode;
    available: number;
    retired: number;
    pending: number;
  };
  lastSynced: Date;
}