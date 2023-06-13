import { Button } from '@mui/material'
import React from 'react'
import { forwardRef, memo } from 'react'
import { SearchIconBtn } from '../../IconBtn/SearchIconBtn'

interface Props {
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSearchSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const Search: React.FC<Props> = memo(
    (props) => {
        return (
            <div className='flex items-center w-[100%] px-1 justify-center bg-[#f8f8f8] border-[#9c9c9c] border-2 rounded-md'>
                <input
                    id={"search"}
                    placeholder={`Search`}
                    name={"search"}
                    onChange={props.handleSearch}
                    className="py-2 px-2 w-[100%] rounded-md focus:outline-none text-sm font-para"
                />
                <SearchIconBtn handleClick={props.handleSearchSubmit} />
            </div>
        )
    }
)

