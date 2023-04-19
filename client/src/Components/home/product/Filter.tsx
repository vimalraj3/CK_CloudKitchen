import { useState, useEffect } from 'react'
import FilterIcon from '../../../assets/icons/filterIcon.svg'
import DialogBox from '../../DialogBox/Dialog'
import FilterDialog from './FilterDialog'

const Filter: React.FC<any> = () => {
    const [open, setOpen] = useState<boolean>(false)

    const [bg, setBg] = useState<string>("#c1c1c1")

    console.log(bg);


    return (
        <div className="">
            <button
                onClick={() => {
                    setOpen(true);
                    document.body.style.overflow = "hidden"
                }}
                className={`px-4 py-2 rounded-md font-moutserrat mr-3 hover:border-[#ff7e8b] text-[#9c9c9c] border-[${bg}] border-2 cursor-pointer flex  items-center  `}

            >
                <img src={FilterIcon} alt="FIlter" className="w-[16px]" />
                <p className="ml-1.5">Filter</p>
            </button >
            <FilterDialog open={open} setOpen={setOpen} setBg={setBg} />
        </div>
    )
}

export default Filter