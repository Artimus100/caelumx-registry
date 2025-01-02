import Forest from '../../public/images/RegisterBackground.jpeg'
import Sol from '../../public/icons/Solana.svg'
import Credit from '../../public/icons/CreditIcon.svg'
import { easeOut, motion } from 'framer-motion'
import { ComponentPropsWithoutRef } from 'react'



export const Card   = (props : ComponentPropsWithoutRef<'div'> & {
    p_name ?: string,
    p_type ?: string,
    p_country ?: string,
    p_cost ?: number,
    p_sdg_goals ?: number,
    p_credits ?: number,
    p_vintage_year ?: number
}  ) => {

    const { p_name, p_type, p_country, p_cost, p_sdg_goals, p_credits, p_vintage_year } = props
    return (
        <motion.div
        initial={{
            color:'#d4d4d8',
            background:'',
            boxShadow: '0px 0px 0px 0px #3D3D41'
        }}
        whileHover={{
            color:'#09090b',
            background:'white',
            boxShadow: '0px 2px 20px 0px #3D3D41'
                    }}
        transition={{
            duration: .6,
            ease: easeOut,
        }}
        className='p-1 h-64 w-60 border-zinc-600/60 border inline-flex flex-col  text-zinc-300  rounded-xl'>
            <div className='relative  h-2/3'>
                <div className=' overflow-hidden  h-full  '>
                    <img className='object-cover h-full  rounded-lg' src={Forest.src} alt="Forest" />
                </div>
                <div className='absolute border-[1px] border-white/10 top-1 right-1 h-7 g-24 gap-1 pr-[10px] inline-flex p-1 items-center justify-center bg-black/10 backdrop-blur-sm rounded-full'>
                    <div className='inline-flex size-5 rounded-full p-1 items-center justify-center bg-zinc-100'>
                        <img src={Sol.src} alt="Solana Icon" />
                    </div>
                    <h5 className='text-zinc-300 font-medium text-[12px] '>{p_cost}</h5>
                </div>
            </div>
            <div className=' border-b-[1px] m-2 mb-0 pb-2 border-zinc-700/30 flex  items-end  justify-between'>
                <div className='inline-flex items-start flex-col  justify-center '>
                    <h3 className='text-lg leading-tight  font-medium '>{p_name}</h3>
                    <p className='text-[10px] -mt-[2px] opacity-60 '>{p_type}, <span className='country'>{p_country}</span></p>
                </div>
                <div>
                    <div className=' bg-teal-500/20 inline-flex gap-[2px] pb-0.5  items-center justify-center  px-1  py-0.5 rounded-full outline outline-[1px] outline-teal-800/40'>

                            <div className='size-[10px] inline-flex items-center justify-center rounded-full  bg-teal-800'>
                                <h5 className='numeber text-[5px] font-medium text-zinc-200'>{p_sdg_goals}</h5>
                            </div>
                            <h3 className='text-[8px] '>SDGs</h3>

                    </div>
                </div>
            </div>
            <div className='w-full flex items-center justify-between px-2 py-2 '>
                <div className='inline-flex gap-1 items-center justify-start '>
                    <div className='inline-flex g-1 gap-1 items-center justify-center'>
                        <img src={Credit.src} className='size-3' alt="credit" />
                        <h2 className='text-[10px] font-semibold tracking-tighter  opacity-90'>{p_credits}</h2>
                    </div>
                    <h3 className='text-[8px] opacity-60'>Carbon Credit</h3>
                </div>
                <div className='inline-flex  gap-1 items-center justify-start '>
                        <h2 className='text-[10px] font-semibold tracking-tighter  opacity-90 '>{p_vintage_year}</h2>
                    <h3 className='text-[8px] opacity-60'>Vintage</h3>
                </div>
            </div>
        </motion.div>
    )
}
