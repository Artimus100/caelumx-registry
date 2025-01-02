import React from 'react';
import { Wallet } from '../app/types/ledger';
import { Coins, Banknote, TreePine } from 'lucide-react';

interface WalletCardProps {
  wallet: Wallet;
}

export function WalletCard({ wallet }: WalletCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Wallet Overview</h3>
        <span className="text-sm text-gray-500">{wallet.address}</span>
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
          <TreePine className="text-green-600" />
          <div>
            <p className="text-sm text-gray-600">Carbon Credits</p>
            <p className="text-xl font-semibold">{wallet.balance.credits}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
          <Coins className="text-blue-600" />
          <div>
            <p className="text-sm text-gray-600">Tokens</p>
            <p className="text-xl font-semibold">{wallet.balance.tokens}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
          <Banknote className="text-purple-600" />
          <div>
            <p className="text-sm text-gray-600">Fiat Balance</p>
            <p className="text-xl font-semibold">
              ${wallet.balance.fiat.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}