import Profile from '../../public/images/Profile.png'
import SeachIcon from '../../public/icons/Search.svg'
import QuestionIcon from '../../public/icons/QuestionIcon.svg'
import ReportIcon from '../../public/icons/ReportIcon.svg'

export  const SecoundaryNavBar = () => {
    return (
        <div className='flex w-full justify-between items-center'>
        <div className='inline-flex gap-2 bg-[#232228] rounded-full outline outline-[1.5px] outline-white/20 px-2  items-center justify-between '>
            <div className='size-10 p-2 opacity-75 inline-flex items-center justify-center'>
                <img src={SeachIcon.src} alt="Search Icon" />
            </div>
            <input type="text" name="search" id="search" className='w-40' placeholder='Search'/>
        </div>
        <div className='flex gap-4'>
            <div className='size-12 bg-[#232228]  border-[1px] border-zinc-600 rounded-full p-3'>
                <img className='opacity-80' src={QuestionIcon.src} alt="Question Icon" />
            </div>
            <div className='size-12 bg-[#232228]  border-[1px] border-zinc-600 rounded-full p-3'>
                <img className='opacity-80' src={ReportIcon.src} alt="Report Icon" />
            </div>
            <div className='size-12 bg-[#232228]  border-[1px] border-zinc-600 rounded-full '>
                <img className='opacity-80' src={Profile.src} alt="Report Icon" />
            </div>
        </div>
    </div>
    )
}
