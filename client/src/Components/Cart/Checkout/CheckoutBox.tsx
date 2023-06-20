import { Button, Skeleton } from '@mui/material'
import { useAppSelector } from '../../../hooks'
import React, { useEffect } from 'react'
import { useCheckout } from '../../../hooks/useCheckout'



export const CheckoutBox: React.FC = React.memo(
    () => {
        const { handlePlaceOrder } = useCheckout()
        const { totalPrice, cart, restaurant, loading } = useAppSelector(state => state.cartState)

        return (
            <>
                {
                    restaurant ? (
                        <div className="flex flex-col gap-2 rounded-lg w-[40%]">
                            <h2 className='font-bold md:text-2xl font-head'>Checkout</h2>
                            <div>
                                <h3 className="font-semibold font-head md:text-md mt-5">{restaurant?.restaurantName}</h3>
                                <div className="my-2 w-[100%]">
                                    {
                                        cart.map((v, i) => {
                                            return (
                                                <div className="my-2 flex justify-between w-[100%]" key={i}>
                                                    <p>{`${v.food.title} x ${v.quantity} `}</p>
                                                    <p>{` ₹ ${v.food.price * v.quantity}`}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm font-para mt-1" aria-label='Item total'>Item total </p>
                                    <p aria-label={`rupees  ${totalPrice}`}>₹ {totalPrice}</p>
                                </div>
                            </div>

                            <div className="flex w-[100%] md:w-auto justify-center items-center">
                                <Button variant='contained' sx={{
                                    bgcolor: (theme) => theme.palette.success.main,
                                    ":hover": {
                                        bgcolor: (theme) => theme.palette.success.main,
                                    }
                                }}
                                    onClick={() => { handlePlaceOrder(restaurant._id) }}
                                    fullWidth
                                    aria-label='Buy'
                                >
                                    Buy
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div>
                                <h2 className='font-bold md:text-2xl font-head'>Checkout</h2>
                                <div className='flex items-center justify-center flex-col '>
                                    <div>
                                        <img src="https://res.cloudinary.com/dd39ktpmz/image/upload/v1687276814/c7qjhuxe5xdqobh5s6mz.png" alt="No bills" width={'100%'} height={'100%'} />
                                    </div>
                                    <h4 className='font-head text-2xl font-semibold text-center'>No bill found</h4>
                                </div>
                            </div>
                        </div>
                    )
                }
            </>
        )
    }
)
// TODO : Add a loader here