import React, { useState } from 'react'
import { IRestaurant } from '../../../types/Restaurant.types'

const RestaurantOrderCard: React.FC<IRestaurant> = ({
    restaurantImage, restaurantName, restaurantDescription, restaurantAddress, restaurantCity, restaurantHours, restaurantPhone, restaurantRegion, restaurantState, restaurantZip
}) => {
    const [openTime, setOpenTime] = useState(new Date(restaurantHours.open))
    const [closeTime, setCloseTime] = useState(new Date(restaurantHours.close))

    return (
        <div className="flex justify-between items-center md:items-start flex-col md:flex-row gap-3 md:gap-6 w-[100%]">
            <section className="w-[100%] md:w[40%]">
                <img src={restaurantImage[0]} alt={restaurantName} className='rounded-md' />
            </section>
            <section className="w-[100%] md:w[40%]">
                <h3 className='font-head font-semibold text-lg md:text-3xl mb-2 md:mb-3'>{restaurantName}</h3>
                <p className='text-gray-400 font-para'>{restaurantDescription}</p>
                <div className="flex gap-2 mt-2">
                    <p>Timing:</p>
                    <p className='text-gray-400 font-para'>{openTime.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</p>
                    <p className='text-gray-400'>-</p>
                    <p className='text-gray-400 font-para'>{closeTime.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</p>
                </div>
                <div className="flex gap-2 mt-2">
                    <p>Address:</p>
                    <div>
                        <p className='text-gray-400 font-para'>{`${restaurantAddress},`}</p>
                        <p className='text-gray-400 font-para'>{`${restaurantCity},`}</p>
                        <p className='text-gray-400 font-para'>{`${restaurantRegion},`}</p>
                        <p className='text-gray-400 font-para'>{`${restaurantState} - ${restaurantZip}.`}</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default RestaurantOrderCard