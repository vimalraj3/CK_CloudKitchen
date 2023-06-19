import React, { useEffect, useState } from 'react'
import { Btn } from '../Btn'
import { Button, Divider } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { setSortedBy } from '../../../state/slices/FilterAndSearch.slice'

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
        let title: string = sortedBy.rating ? 'rating' : sortedBy.price.highToLow ? "High to low" : sortedBy.price.lowToHigh ? "low to high" : defaultSortedByTitle
        setSortedBytitle(`${title}`)
    }, [sortedBy])

    return (
        <div className='relative w-[100%]'>
            <Button variant='outlined' size={'large'} onClick={() => setOpen(!open)} sx={{
                color: { xs: '#000', sm: '#ff7e8b' },
                borderColor: { xs: 'gray', sm: '#ff7e8b' },
                ":hover": {
                    bgColor: { xs: 'gray', sm: '#ff7e8b' },
                },
                ":focus": {
                    bgColor: { xs: 'gray', sm: '#ff7e8b' },
                    borderColor: { xs: 'gray', sm: '#ff7e8b' },
                }
            }} fullWidth >
                <div className="flex items-center gap-2 md:gap-3 capitalize">
                    {`${sortedByTitle}`}
                    <i className={`fa-solid fa-chevron-down ${open ? 'rotate' : "reverse-rotate"}`}></i>
                </div>
            </Button>
            {
                open && (
                    <div className='rounded-md bg-white border-gray-400 md:border-primary absolute top-[100%] mt-4 z-50 py-3 px-5 w-[100%] slider border-1' key={"BtnShow"}>
                        <div className="flex flex-col gap-2" key={"BtnContainer"}>
                            {['rating', 'low to high', 'high to low'].map((v, i) => (
                                <>
                                    <Button fullWidth key={`${v}:${i}`} onClick={() => handleSortedBySubmit(v)}
                                        sx={{
                                            color: { xs: '#ff7e8b', md: '#ff7e8b' },
                                            borderColor: { xs: 'gray', md: '#ff7e8b' },
                                            ":hover": {
                                                bgColor: { xs: 'gray', md: '#ff7e8b' },
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