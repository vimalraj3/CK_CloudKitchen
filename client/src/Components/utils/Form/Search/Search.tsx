import { Button } from '@mui/material'
import React from 'react'
import { forwardRef, memo } from 'react'
import { SearchIconBtn } from '../../IconBtn/SearchIconBtn'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { getAllRestaurants, setSearch } from '../../../../state/slices/restaurants.slice'

interface Props {
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSearchSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const Search: React.FC = memo(
    () => {
        const { search } = useAppSelector(state => state.restaurantsState)

        const dispatch = useAppDispatch()
        const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setSearch(e.target.value))
        }

        const handleSubmit = () => {
            dispatch(getAllRestaurants())
        }

        return (
            <div className='flex items-center w-[100%] px-1 justify-center bg-transparent border-1 border-primary  rounded-md'>
                <input
                    id={"search"}
                    placeholder={`Search`}
                    value={search}
                    name={"search"}
                    onChange={handleSearch}
                    className="py-[.54em] px-2 w-[100%] rounded-md focus:outline-none text-md font-para bg-transparent placeholder:text-black"
                />
                <SearchIconBtn handleClick={() => handleSubmit()} className='text-primary' />
            </div>
        )
    }
)

