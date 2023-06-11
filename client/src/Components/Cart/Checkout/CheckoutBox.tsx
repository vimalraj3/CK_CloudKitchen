import { Button, Skeleton } from '@mui/material'
import { useAppSelector } from '../../../hooks'
import React from 'react'
import { useCheckout } from '../../../hooks/useCheckout'



export const CheckoutBox: React.FC<{
    handleCheckout?: (data: boolean) => void
}> = React.memo(
    ({ handleCheckout }) => {
        const { handlePlaceOrder } = useCheckout()
        const { totalPrice, cart, restaurant, loading } = useAppSelector(state => state.cartState)
        return (
            <>
                {
                    !restaurant || !restaurant.restaurantName ? (
                        <div className="flex flex-col gap-4 rounded-lg w-[100%]">
                            <Skeleton variant="rectangular" sx={{
                                width: '100%',
                                height: '100%'
                            }}
                                animation="wave" />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4 rounded-lg w-[100%]">
                            <div className="">
                                <h2 className='font-bold md:text-2xl font-head'>Checkout</h2>
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
                                    onClick={() => { handlePlaceOrder() }}
                                    fullWidth
                                    aria-label='Buy'
                                >
                                    Buy
                                </Button>
                            </div>
                        </div>
                    )
                }
            </>
        )
    }
)
// TODO : Add a loader here