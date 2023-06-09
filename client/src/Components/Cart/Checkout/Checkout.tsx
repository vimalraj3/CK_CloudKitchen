import React, { memo } from 'react'
import { AddressSelector } from '../Address/AddressSelector'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



export const Checkout: React.FC<{
    handleBack: (data: boolean) => void
}> = memo(
    ({ handleBack }) => {
        return (
            <div>
                <div className="cursor-pointer my-4 px-1 py-1 rounded-full border-2 border-gray-400 inline-flex mx-0" onClick={() => { handleBack(false) }}>
                    <ArrowBackIcon />
                </div>
                <AddressSelector />
            </div>
        )
    }
)
