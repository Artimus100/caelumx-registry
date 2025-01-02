import React from 'react';
import { Wallet } from '../../types/ledger';
import { Coins, Archive, Clock } from 'lucide-react';

interface WalletBalanceProps {
  wallet: Wallet;
}

export function WalletBalance({ wallet }: WalletBalanceProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
        <Coins className="text-blue-600" />
        <div>
          <p className="text-sm text-gray-600">Available</p>
          <p className="text-xl font-semibold">{wallet.balance.available}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
        <Archive className="text-purple-600" />
        <div>
          <p className="text-sm text-gray-600">Retired</p>
          <p className="text-xl font-semibold">{wallet.balance.retired}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg">
        <Clock className="text-yellow-600" />
        <div>
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-xl font-semibold">{wallet.balance.pending}</p>
        </div>
      </div>
    </div>
  );
}