import React, { useState } from 'react'
import { IRestaurant } from '../../../../types/Restaurant.types'
import { Rating, Skeleton } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../../hooks'

const RestaurantOrderCardLoading = () => (

    <div className="flex flex-col md:flex-row md:justify-between w-[100%] px-3 md:px-5 border-b border-dashed border-primary pb-6 md:py-6 md:items-center md:gap-9">
        <div className='flex flex-col md:flex-row md:gap-6  md:items-center w-[100%] md:w-[50%]'>
            <div className='hidden md:block md:w-[300px] aspect-video'>
                <Skeleton variant="rectangular" width='100%' height={'100%'} animation='wave' />
            </div>
            <div className='flex gap-2 flex-col w-[100%]'>
                <Skeleton variant="text" sx={{ fontSize: { sm: '1.85rem', md: '2rem' }, width: '100%' }} animation='wave' />
                <div className='flex items-center justify-between gap-2 mt-1 w-[100%]'>
                    <div className='w-[50%] md:w-[100%]'>
                        <Skeleton variant="text" sx={{ fontSize: { sm: '3rem', md: '1rem' }, width: '100%' }} animation='wave' />
                    </div>
                    <div className='flex gap-2 items-center md:hidden w-[30%]'>
                        <Skeleton animation='wave' variant="text" sx={{ fontSize: '3rem', width: '100%' }} />
                    </div>
                </div>
                <div className='flex md:hidden items-center gap-2 w-[100%]'>
                    <Skeleton variant="text" animation='wave' sx={{ fontSize: '1.65rem', width: '100%' }} />
                </div>
            </div>
        </div>
        <section className='flex gap-4 flex-col w-[100%] md:w-[10%]'>
            <div className='hidden md:flex gap-2'>
                <Skeleton variant="text" animation='wave' sx={{ fontSize: '1.125rem', width: '100%' }} />
            </div>
            <div className='hidden md:flex items-center justify-end'>
                <Skeleton variant="text" animation='wave' sx={{ fontSize: '1rem', width: '100%' }} />
            </div>
        </section>
    </div>
)


// * TITLE of Restaurant Card
export const RestaurantOrderCard: React.FC = () => {

    const { loading, currentRestaurant } = useAppSelector(state => state.foodState)

    return (
        <>
            {
                loading && !currentRestaurant ? (<RestaurantOrderCardLoading />) : currentRestaurant && (
                    <div className="flex flex-col md:flex-row md:justify-between w-[100%] px-3 md:px-5 border-b border-dashed border-primary pb-6 md:py-6">
                        <div className='flex flex-col md:flex-row md:gap-6  md:items-center'>
                            <div className='hidden md:block md:w-[100px]'>
                                <img src={currentRestaurant.restaurantImage[0]} alt="image" width={'100%'} className='rounded-md' />
                            </div>
                            <div className='flex gap-2 flex-col'>
                                <h3 className='font-head font-semibold text-2xl md:text-2xl'>{currentRestaurant.restaurantName}</h3>
                                <div className='flex items-center justify-between gap-2 mt-1'>
                                    <p className={`text-gray-500 text-sm md:text-md`}>{`${currentRestaurant.restaurantCity}`}</p>
                                    <div className='flex gap-2 items-center md:hidden'>
                                        <Rating
                                            value={currentRestaurant.rating} size='small'
                                            readOnly
                                        />
                                        <p className='text-sm'>{`(${currentRestaurant.totalNumberOfRating})`}</p>
                                    </div>

                                </div>
                                <div className='flex md:hidden items-center gap-2'>
                                    <p className='text-sm'>{`₹ ${currentRestaurant.priceRange} for two`}</p>
                                </div>
                            </div>
                        </div>
                        <section className='flex gap-4 flex-col'>
                            <div className='hidden md:flex gap-2'>
                                <Rating
                                    value={currentRestaurant.rating}
                                    readOnly
                                />
                                <p>{`(${currentRestaurant.totalNumberOfRating})`}</p>
                            </div>
                            <div className='hidden md:flex items-center justify-end'>
                                <p className='text-sm'>{`₹ ${currentRestaurant.priceRange} for two`}</p>
                            </div>
                        </section>
                    </div>
                )
            }
        </>
    )
}
