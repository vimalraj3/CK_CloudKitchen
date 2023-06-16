import React, { useEffect, useState } from 'react'
import { Btn } from '../Btn'
import { Button, Divider } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { setSortedBy } from '../../../state/slices/FilterAndSearch.slice'
import ArrowIcon from '@mui/icons-material/KeyboardArrowDown';

export const SortedBy = () => {

    const [open, setOpen] = useState(false)
    const defaultSortedByTitle = "sorted by"
    const [sortedByTitle, setSortedBytitle] = useState(defaultSortedByTitle)

    const dispatch = useAppDispatch()
    const { sortedBy } = useAppSelector(state => state.filterAndSearchState)

    const handleSortedBySubmit = (sortedByName: string) => {
        switch (sortedByName) {
            case 'rating':
                dispatch(
                    setSortedBy({
                        rating: true,
                        price: { lowToHigh: false, highToLow: false },
                    })
                )
                break
            case 'low to high':
                dispatch(
                    setSortedBy({
                        rating: false,
                        price: { lowToHigh: true, highToLow: false },
                    })
                )
                break
            case 'high to low':
                dispatch(
                    setSortedBy({
                        rating: false,
                        price: { lowToHigh: false, highToLow: true },
                    })
                )
                break
        }
        setOpen(false)
    }


    useEffect(() => {
        let title: string = sortedBy.rating ? 'rating' : sortedBy.price.highToLow ? "High to low" : sortedBy.price.lowToHigh ? "low to high" : ''
        setSortedBytitle(`${defaultSortedByTitle} ${title}`)
    }, [sortedBy])

    return (
        <div className='relative'>
            <Button variant='outlined' size={'large'} onClick={() => setOpen(!open)} sx={{
                color: '#ff7e8b',
                borderColor: '#ff7e8b',
                ":hover": {
                    borderColor: '#ff7e8b',
                }
            }} >
                <div className="flex items-center gap-3">
                    {`${sortedByTitle}`}
                    <ArrowIcon className={`fa-solid fa-chevron-down ${open ? 'rotate' : "reverse-rotate"}`} />
                </div>
            </Button>
            {
                open && (
                    <div className='rounded-md bg-white border-primary absolute top-[100%] mt-4 z-50 py-3 px-5 w-[100%] slider border-1' key={"BtnShow"}>
                        <div className="flex flex-col gap-2" key={"BtnContainer"}>
                            {['rating', 'low to high', 'high to low'].map((v, i) => (
                                <>
                                    <Button fullWidth key={`${v}:${i}`} onClick={() => handleSortedBySubmit(v)}
                                        sx={{
                                            color: '#ff7e8b',
                                            borderColor: '#ff7e8b',
                                            ":hover": {
                                                bgColor: '#ff7e8b',
                                            }
                                        }}
                                    >
                                        {v}
                                    </Button>
                                </>
                            ))}
                        </div>
                    </div>
                )
            }
        </div>
    )
}