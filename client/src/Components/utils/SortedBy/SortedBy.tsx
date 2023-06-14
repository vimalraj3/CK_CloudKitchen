import React, { useState } from 'react'
import { Btn } from '../Btn'
import { Button } from '@mui/material'

export const SortedBy = () => {

    const [open, setOpen] = useState(false)

    return (
        <div className='relative'>
            <button className="py-2 px-2 bg-secondary border-[#9c9c9c] border-2 rounded-md focus:outline-none text-md font-para font-medium"
                onClick={() => setOpen(!open)}
            >{"Sorted by"}
                <i className={`fa-solid fa-chevron-down ml-2.5 ${open ? 'rotate' : "reverse-rotate"}`} style={{ color: "#000" }}></i>
            </button>
            {
                open && (
                    <div className='bg-secondary rounded-md absolute top-[100%] mt-4 z-50 py-3 px-5'>
                        Hlleo
                    </div>
                )
            }
        </div>
    )
}