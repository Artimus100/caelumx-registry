import { Anton } from 'next/font/google'
import PhantomIcon from '../../public/icons/PhantomIcon.svg'
import { motion } from 'framer-motion';
import TransactionDropDown from './TransactionDropDown';
import TransactionTable from './Table';
import { Transactions } from '../app/data/Transactions';

const anton = Anton({
    subsets: ['latin'], // Include the appropriate subsets
    weight: '400', // Specify the font weight if necessary
    display: 'swap',
  });

export const Transaction = () => {
    const walletId = '****32Be34'
    return (

        <div className="w-full flex flex-col justify-start items-start rounded-2xl pb-4 px-6 bg-[#232228] h-full mt-4 outline outline-[1.5px] outline-white/20">
            <div className='  flex w-full flex-col '>
                <h3 className={`tracking-tight mt-2 p-1 ${anton.className} pt-4  uppercase font-extrabold   text-4xl text-[#CDCDCD]`}>Transaction History</h3>
                <div className='text-zinc-500  font-medium text-sm'>
                    <p>Explore a transparent and decentralized ledger of carbon credit trades and offsets. This page empowers you to track every transaction in the carbon market, ensuring accountability and fostering trust in blockchain-powered sustainability. Dive into the details of each trade and offset, paving the way for a greener future through innovation.</p>
                </div>
            </div>
            <div className="mt-3 w-full">
                    <TransactionDropDown />
            </div>

            <div className='w-full '>
      <TransactionTable data={Transactions} />
    </div>
        </div>
    )
}
