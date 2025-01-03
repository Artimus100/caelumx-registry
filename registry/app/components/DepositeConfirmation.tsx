import TickIcon from '../../public/icons/TickIcon.svg'
import { motion } from 'framer-motion';

interface ProjectProps {
    id: string;
    project_name: string;
    project_type: string;
    region: string;
    vintage_year: number;
    certification_body: string;
    credit_amount: number;
    created_at: Date;
    step: number
  }

  export const DeployConfirmation: React.FC<ProjectProps> = ({
    id,
    project_name,
    project_type,
    region,
    vintage_year,
    certification_body,
    credit_amount,
    created_at,
    step
  }) => {
    const project = {
      id,
      project_name,
      project_type,
      region,
      vintage_year,
      certification_body,
      credit_amount,
      created_at,
    };


    return (
      <div className="px-12 mt-4">
        <h2 className="text-zinc-400 my-2  text-xl font-semibold pb-2">
          Project Deployment Details
        </h2>
        <motion.div

className={`flex border-[1px] p-5 pt-3 ${
    step === 2
      ? 'border-teal-700 bg-black/30 shadow-md shadow-teal-500/10'
      : 'border-zinc-500/30'
  } rounded-lg flex-col gap-2`}
  layout
  transition={{ duration: 0.5, ease: 'easeInOut' }}>

            <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={step === 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{ display: step === 2 ? 'flex' : 'none' }} // Hide completely when step !== 2
             className='inline-flex w-fit px-2 pr-4 m-auto mb-2 p-1 gap-2 items-center justify-center bg-teal-700/10 rounded-full'>
                <img className='size-5' src={TickIcon.src} alt="Tick Symbol" />
                <h5 className="text-[10px] text-teal-600">The Project ahs been successfully deployed on the solana devNet</h5>
            </motion.div>
          {Object.entries(project).map(([key, value]) => (
            <div key={key} className="flex text-sm justify-between">
              <h3 className="text-zinc-400 capitalize">
                {key.replace(/_/g, " ")}:
              </h3>
              <h3 className="text-zinc-300">
                {value instanceof Date ? value.toLocaleString() : value}
              </h3>
            </div>
          ))}
        </motion.div>
      </div>
    );
  };
