import React, { useEffect, useState } from 'react'
import { Btn } from '../../../utils/Btn'
import { Button, Divider } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { SortedBy, getAllRestaurants, setSortedBy } from '../../../../state/slices/restaurants.slice'

export const SortedByBtn = () => {

    const [open, setOpen] = useState(false)
    const defaultSortedByTitle = "sorted by" as const
    const [sortedByTitle, setSortedBytitle] = useState<string>(defaultSortedByTitle)

    const buttonValues = [{
        name: 'rating',
        value: SortedBy.rating
    }, {
        name: 'low to high',
        value: SortedBy.lowToHigh
    }, {
        name: 'high to low',
        value: SortedBy.highToLow
    }] as const

    const dispatch = useAppDispatch()
    const { sortedBy } = useAppSelector(state => state.restaurantsState)

    const handleSortedBySubmit = async (sortedByValue: SortedBy) => {
        await dispatch(setSortedBy(sortedByValue))
        dispatch(getAllRestaurants())
        setOpen(false)
    }

    useEffect(() => {
        const sortedByName = !(sortedBy === SortedBy.empty) ? buttonValues.find(({ name, value }) => value === sortedBy)?.name : ""
        setSortedBytitle(`${defaultSortedByTitle} ${sortedByName}`)
    }, [sortedBy])

    return (
        <div className='relative w-[100%]' key={"sorted by btn component"}>
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
            }} fullWidth key={"sorted by btn"} >
                <div className="flex items-center gap-2 md:gap-3 capitalize">
                    {`${sortedByTitle}`}
                    <i className={`fa-solid fa-chevron-down ${open ? 'rotate' : "reverse-rotate"}`}></i>
                </div>
            </Button>
            {
                open && (
                    <div className='rounded-md bg-white border-gray-400 md:border-primary absolute top-[100%] mt-4 z-50 py-3 px-5 w-[100%] slider border-1' key={"BtnShow"}>
                        <div className="flex flex-col gap-2" key={"BtnContainer"}>
                            {buttonValues.map(({ name, value }, i) => (
                                <>
                                    <Button fullWidth key={`${name}:${i}`} onClick={() => handleSortedBySubmit(value)}
                                        sx={{
                                            color: { xs: '#ff7e8b', md: '#ff7e8b' },
                                            borderColor: { xs: 'gray', md: '#ff7e8b' },
                                            ":hover": {
                                                bgColor: { xs: 'gray', md: '#ff7e8b' },
                                            }
                                        }}
                                    >
                                        {name}
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