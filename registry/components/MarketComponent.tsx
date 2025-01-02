'use client'
import FatCactus from '../public/images/FatCactus.png'

import { Anton } from 'next/font/google'
import { useState } from 'react';
import DropDown from "./DropDown";
import { Card } from './Cards'
import { projects } from '../app/data/projects';
import { motion } from 'framer-motion'

const anton = Anton({
    subsets: ['latin'], // Include the appropriate subsets
    weight: '400', // Specify the font weight if necessary
    display: 'swap',
  });


 const  Market= () => {
    const [token, setToken] = useState('All')
    const [country, setCountry] = useState('India')
    const [vintage, setVintage] = useState('2025')



    return (
        <div>

        <div className="w-full flex flex-col justify-between items-start rounded-2xl pb-4 px-6 bg-[#232228] h-f mt-4 outline outline-[1.5px] outline-white/20">
            <div className='  flex w-full flex-col '>
                <h3 className={`tracking-tight mt-2 p-1 ${anton.className}  uppercase font-extrabold   text-4xl text-[#CDCDCD]`}>Manage Carbon Credit</h3>
                <div className='text-zinc-500 font-medium text-sm'>
                    <p>The world’s first and <span className='uppercase text-sm text-zinc-300 font-medium'>LARGEST CARBON CREDIT MARKETPLACE</span> for crypto collectibles and non-fungible token (NFTs). Trade, Trust, and Transform Our Planet</p>
                </div>
            </div>
            <div className="mt-3">
                    <DropDown />
            </div>

            <motion.div
            className="w-full h-[420px] mt-5 outline  outline-[1.5px] outline-white/10 flex items-center justify-start bg-zinc-950 rounded-lg  flex-col overflow-y-scroll">
            { false ?   <div>
                    <div className='w-80 h-72   inline-flex items-center'>
                            <img src={FatCactus.src} alt="Fat Cactus" />
                        </div>
                        <div className='inline-flex flex-col items-center justify-center'>
                            <h3 className='text-zinc-400 text-lg font-medium'>No Projects Found</h3>
                            <p className='text-[10px] text-zinc-700 '>There are no project for the selected category or filter</p>
                        </div>
                    </div> :
                    <div className='grid grid-cols-4 gap-2 py-3 '>
                    {projects.map((project, index) => (
                        <Card key={index} {...project} />
                    ))}
                    </div>
                    }
            </motion.div>
        </div>
        </div>
    )
}
export default Market;
