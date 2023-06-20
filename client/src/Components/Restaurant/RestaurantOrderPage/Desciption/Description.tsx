import React, { useEffect } from 'react'
import { useAppSelector } from '../../../../hooks'
import { Skeleton } from '@mui/material';

export const Description = () => {

    const restaurant = useAppSelector(state => state.foodState.currentRestaurant)

    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
    };

    const currentTime = new Date();
    // * Convert the current time to the restaurant's time zone (e.g., 'Asia/Kolkata')
    const currentDateTime = new Date(currentTime.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));

    let isOpen

    useEffect(() => {
        if (restaurant) {
            isOpen = currentDateTime >= restaurant.restaurantHours.open && currentDateTime <= restaurant.restaurantHours.close;
        }
    }, [])

    return (
        <div className='md:w-[100%] leading-7 font-para mx-auto'>
            {
                restaurant ? restaurant.restaurantDescription && (
                    <div>
                        <p>
                            {restaurant.restaurantDescription}
                        </p>
                        <div className="flex flex-col-reverse md:flex-row md:items-center justify-between">
                            <div className='mt-4 flex items-center gap-2'>
                                <i className="fa-solid fa-phone"></i>
                                <p className='text-base'>{`${restaurant.restaurantPhone}`}</p>
                            </div>

                            <div className='mt-4 flex items-center gap-4'>
                                <div className="flex items-center gap-2">
                                    <i className="fa-regular fa-clock"></i>
                                    <p className='font-para text-base'>{new Date(restaurant.restaurantHours.open).toLocaleTimeString('en-IN', options)}</p>
                                    <p>-</p>
                                    <p className='font-para text-base'>{new Date(restaurant.restaurantHours.close).toLocaleTimeString('en-IN', options)}</p>
                                    <p className='text-primary font-semibold'>{`(${isOpen ? "Open" : "Closed"})`}</p>
                                </div>
                            </div>
                        </div>
                        <div className='mt-4 flex items-start gap-4'>
                            <i className="fa-solid fa-location-dot mt-2"></i>
                            <div className='font-para'>
                                <p>{`${restaurant.restaurantAddress},`}</p>
                                <p>{`${restaurant.restaurantCity},`}</p>
                                <p>{`${restaurant.restaurantRegion},`}</p>
                                <p>{`${restaurant.restaurantState} - ${restaurant.restaurantZip}.`}</p>
                            </div>
                        </div>
                    </div>
                )
                    : (
                        <div>
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={'100%'} animation='wave' />
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={'100%'} animation='wave' />
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={'100%'} animation='wave' />
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={'100%'} animation='wave' />

                            <div className="flex flex-col-reverse md:flex-row md:items-center justify-between">
                                <div className='mt-4 flex items-center gap-2'>
                                    <i className="fa-solid fa-phone"></i>
                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={'100%'} animation='wave' />
                                </div>

                                <div className='mt-4 flex items-center gap-4'>
                                    <div className="flex items-center gap-2">
                                        <i className="fa-regular fa-clock"></i>
                                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={'100%'} animation='wave' />
                                        <p>-</p>
                                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={'100%'} animation='wave' />
                                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={'100%'} animation='wave' />
                                    </div>
                                </div>
                                <div className='mt-4 flex items-start gap-4'>
                                    <i className="fa-solid fa-location-dot mt-2"></i>
                                    <div className='font-para'>
                                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={'100%'} animation='wave' />
                                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={'100%'} animation='wave' />
                                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={'100%'} animation='wave' />
                                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={'100%'} animation='wave' />
                                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={'100%'} animation='wave' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}
