import { Button } from '@mui/material'
import { useAppSelector } from '../../../hooks'
import React from 'react'



export const CheckoutBox: React.FC<{
    handleCheckout: (data: boolean) => void
}> = React.memo(
    ({ handleCheckout }) => {
        const { totalPrice, cart, restaurant, loading } = useAppSelector(state => state.cartState)
        return (
            <>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-2 gap-2 bg-secondary py-4 px-6 rounded-lg w-[100%]">
                    <div className="">
                        <h3 className="font-bold font-head md:text-lg">{restaurant?.restaurantName}</h3>
                        <div className="my-3">
                            {
                                cart.map((v, i) => {
                                    return (
                                        <div className="my-1" key={i}>
                                            <p>{`${v.food.title} x ${v.quantity} : ₹ ${v.food.price * v.quantity}`}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <p className="text-sm font-para mt-1">Item total: ₹ {totalPrice}</p>
                    </div>

                    <div className="flex w-[100%] md:w-auto justify-center items-center">
                        <Button variant='contained' sx={{
                            bgcolor: (theme) => theme.palette.success.main,
                            ":hover": {
                                bgcolor: (theme) => theme.palette.success.main,
                            }
                        }}
                            onClick={() => { handleCheckout(true) }}
                        >
                            Checkout
                        </Button>
                    </div>
                </div>
            </>
        )
    }
)
