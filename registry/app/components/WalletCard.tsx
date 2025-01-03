import React from 'react';
import { Wallet } from '../types/ledger';
import { Coins, Banknote, TreePine } from 'lucide-react';
import PhantomLogo from '../../public/icons/PhantomIcon.svg'
import TreeIcon from '../../public/icons/tree.svg'
import CoinIcon from '../../public/icons/CoinIcon.svg'
import MoneyIcon from '../../public/icons/MoneyIcon.svg'
import Link from 'next/link';

interface WalletCardProps {
  wallet: Wallet;
}

export function WalletCard({ wallet }: WalletCardProps) {
  return (
    <div className="bg-[#232228] rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl text-zinc-300 font-semibold">Wallet Overview</h3>
        <div className="border-2 border-purple-400 inline-flex items-center justify-center gap-3   rounded-full p-2 text-zinc-300">
            <img src={PhantomLogo.src} className='h-8' alt="phantom icon" />
            <h3 className='text-sm '>
            {wallet.address}
            </h3>
        </div>

            <Link
            href='/market'
            className='p-4 rounded-md bg-teal-600 h-12 shadow-md w-36 inline-flex items-center justify-center '>
                <h3 className='text-zinc-300 text-lg font-medium'>Marketplace</h3>
            </Link>

      </div>

      <div className="grid grid-cols-1 gap-4 h-32  sm:grid-cols-3">
        <div className="flex items-center gap-3 p-4 bg-black/30 border-2 border-teal-500/40  rounded-xl">
          <div className='h-12 px-4 items-center justify-center'>
            <img src={TreeIcon.src} alt="Tree Icon" className='h-14' />
          </div>
          <div className='inline-flex gap-1 flex-col'>
            <p className="text-lg text-zinc-400">Carbon Credits</p>
            <p className="text-4xl font-semibold  text-zinc-300">{wallet.balance.credits}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-black/30 border-2 border-teal-500/40 rounded-xl">
        <div className='h-12 px-4 items-center justify-center'>
            <img src={CoinIcon.src} alt="Tree Icon" className='h-14' />
          </div>
          <div>
            <p className="text-lg text-zinc-400">Tokens</p>
            <p className="text-4xl font-semibold  text-zinc-300">{wallet.balance.tokens}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-black/30 border-2 border-teal-500/40 rounded-xl">
        <div className='h-12 px-4 items-center justify-center'>
            <img src={MoneyIcon.src} alt="Tree Icon" className='h-14' />
          </div>
          <div>
            <p className="text-lg text-zinc-400">Fiat Balance</p>
            <p className="text-4xl font-semibold  text-zinc-300">
              ${wallet.balance.fiat ? wallet.balance.fiat.toLocaleString() : '0'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
