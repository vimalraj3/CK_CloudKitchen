import React, { useState } from 'react'
import { IRestaurant } from '../../../types/Restaurant.types'
import { Skeleton } from '@mui/material'
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
                    <div className="flex justify-between items-center md:items-start flex-col md:flex-row gap-3 md:gap-6 w-[100%]">
                        <section className="w-[100%] md:w-[40%]">
                            <img src={currentRestaurant.restaurantImage[0]} alt={currentRestaurant.restaurantName} className='rounded-md' />
                        </section >
                        <section className="w-[100%] md:w[40%]">
                            <h3 className='font-head font-semibold text-lg md:text-3xl mb-2 md:mb-3'>{currentRestaurant.restaurantName}</h3>
                            <div className="flex gap-2 mt-3">
                                <p>Timing:</p>
                                <p className='text-gray-500 font-para'>{new Date(currentRestaurant.restaurantHours.open).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</p>
                                <p className='text-gray-500'>-</p>
                                <p className='text-gray-500 font-para'>{new Date(currentRestaurant.restaurantHours.close).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</p>
                            </div>
                            <div className="flex gap-2 mt-3">
                                <p>Address:</p>
                                <div>
                                    <p className='text-gray-500 font-para'>{`${currentRestaurant.restaurantAddress},`}</p>
                                    <p className='text-gray-500 font-para'>{`${currentRestaurant.restaurantCity},`}</p>
                                    <p className='text-gray-500 font-para'>{`${currentRestaurant.restaurantRegion},`}</p>
                                    <p className='text-gray-500 font-para'>{`${currentRestaurant.restaurantState} - ${currentRestaurant.restaurantZip}.`}</p>
                                </div>
                            </div>
                        </section>
                    </div>
                )
            }
        </>
    )
}
