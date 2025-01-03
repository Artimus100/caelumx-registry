import React from 'react';
import { Transaction } from '../../types/ledger';
import { format } from 'date-fns';
import { ArrowUpRight, ArrowDownRight, RefreshCw, Shield } from 'lucide-react';

interface TransactionCardProps {
  transaction: Transaction;
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  const getIcon = () => {
    switch (transaction.type) {
      case 'purchase':
        return <ArrowDownRight className="text-green-500" />;
      case 'sale':
        return <ArrowUpRight className="text-blue-500" />;
      case 'offset':
        return <RefreshCw className="text-orange-500" />;
      case 'verification':
        return <Shield className="text-purple-500" />;
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {getIcon()}
          <span className="font-medium capitalize">{transaction.type}</span>
        </div>
        <span className="text-sm text-gray-500">
          {format(transaction.timestamp, 'PPp')}
        </span>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Amount</span>
          <span className="font-mono">{transaction.amount} Credits</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Status</span>
          <span className={`
            px-2 py-0.5 rounded-full text-xs font-medium
            ${
              transaction.status === 'completed'
                ? 'bg-green-100 text-green-800'
                : transaction.status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }
          `}>
            {transaction.status}
          </span>
        </div>

        {transaction.blockchainHash && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">TX Hash</span>
            <a
              href={`https://explorer.solana.com/tx/${transaction.blockchainHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              {transaction.blockchainHash.slice(0, 8)}...
              {transaction.blockchainHash.slice(-8)}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
