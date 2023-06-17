import React, { useState } from 'react'
import { IRestaurant } from '../../../types/Restaurant.types'
import { Rating, Skeleton } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../hooks'

const RestaurantOrderCardLoading = () => (
    <div className="flex justify-between items-center md:items-start flex-col md:flex-row gap-3 md:gap-6 w-[100%]">
        <section className="w-[100%] md:w[40vw]">
            <Skeleton variant="rectangular" width='100%' height={'350px'} />
        </section>
        <section className="w-[100%] md:w[40vw]">
            <Skeleton variant="text" sx={{ fontSize: { sm: '1.125rem', md: '1.87rem' }, width: '70%' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
            <div className="flex gap-2 mt-2 w-[50%]">
                <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
            </div>
            <div className="flex gap-2 mt-2 w-[50%]">
                <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
                <div className='w-[100%]'>
                    <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
                </div>
            </div>
        </section>
    </div>
)

export const RestaurantOrderCard: React.FC = () => {

    const { loading, currentRestaurant } = useAppSelector(state => state.foodState)

    return (
        <>
            {
                loading && !currentRestaurant ? (<RestaurantOrderCardLoading />) : currentRestaurant && (
                    <div className="flex flex-col md:flex-row md:justify-between w-[100%] px-3 md:px-5 border-b border-dashed border-primary pt-3 pb-6 md:py-6">
                        <div className='flex flex-col md:flex-row md:gap-6  md:items-center'>
                            <div className='hidden md:block md:w-[100px]'>
                                <img src={currentRestaurant.restaurantImage[0]} alt="image" width={'100%'} className='rounded-md' />
                            </div>
                            <div className='flex gap-2 flex-col'>
                                <div>
                                    <h3 className='font-head font-semibold text-lg md:text-2xl'>{currentRestaurant.restaurantName}</h3>
                                    <div className='flex items-center gap-2'>
                                        <p className={`text-gray-500 text-md`}>{`${currentRestaurant.restaurantCity}`}</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <p className=''>{`₹ ${currentRestaurant.priceRange} for two`}</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <Rating
                                value={currentRestaurant.rating}
                                readOnly
                            />
                            <p>{`(${currentRestaurant.totalNumberOfRating})`}</p>
                        </div>
                    </div>
                )
            }
        </>
    )
}
