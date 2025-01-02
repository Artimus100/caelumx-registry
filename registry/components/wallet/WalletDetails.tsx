import React from 'react';
import { useWallet } from '../../hooks/useWallet';
import { Coins, CreditCard } from 'lucide-react';

export function WalletDetails() {
  const { connected, publicKey, balance } = useWallet();

  if (!connected || !publicKey) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Wallet Details</h3>
        <span className="text-sm text-gray-500">
          {publicKey.slice(0, 4)}...{publicKey.slice(-4)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
          <Coins className="text-green-600" />
          <div>
            <p className="text-sm text-gray-600">Carbon Credits</p>
            <p className="text-xl font-semibold">{balance.credits}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
          <CreditCard className="text-blue-600" />
          <div>
            <p className="text-sm text-gray-600">Tokens</p>
            <p className="text-xl font-semibold">{balance.tokens}</p>
          </div>
        </div>
      </div>
    </div>
  );
}