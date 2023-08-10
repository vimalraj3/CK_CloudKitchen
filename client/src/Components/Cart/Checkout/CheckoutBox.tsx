import { Button, Skeleton } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import React, { useEffect } from 'react'
import { useCheckout } from '../../../hooks/useCheckout'
import { placeOrderCheckout } from '../../../state/slices/checkout.slice'

export const CheckoutBox: React.FC = React.memo(() => {
  const { handlePlaceOrder } = useCheckout()
  const { totalPrice, cart, loading } = useAppSelector(
    (state) => state.cartState
  )
  const { addressId } = useAppSelector((state) => state.checkoutState)

  const dispatch = useAppDispatch()

  const { foods } = useAppSelector((state) => state.foodState)

  return (
    <>
      {foods ? (
        <div className="flex flex-col gap-2 rounded-lg w-full">
          <h2 className="font-bold md:text-2xl font-head">Checkout</h2>
          <div>
            <div className="my-2 w-[100%]">
              {cart.map((v, i) => {
                return (
                  <div className="my-2 flex justify-between w-[100%]" key={i}>
                    <p>{`${v.food.title} x ${v.quantity} `}</p>
                    <p>{` ₹ ${v.food.price * v.quantity}`}</p>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-para mt-1" aria-label="Item total">
                Item total{' '}
              </p>
              <p aria-label={`rupees  ${totalPrice}`}>₹ {totalPrice}</p>
            </div>
          </div>

          <div className="flex w-[100%] md:w-auto justify-end items-center">
            <Button
              variant="contained"
              sx={{
                bgcolor: (theme) => theme.palette.success.main,
                ':hover': {
                  bgcolor: (theme) => theme.palette.success.main,
                },
              }}
              onClick={() => {
                dispatch(placeOrderCheckout(addressId))
              }}
              aria-label="Buy"
              size={'large'}
            >
              Buy
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <h2 className="font-bold md:text-2xl font-head">Checkout</h2>
            <div className="flex items-center justify-center flex-col ">
              <div>
                <img
                  src="https://res.cloudinary.com/dd39ktpmz/image/upload/v1687276814/c7qjhuxe5xdqobh5s6mz.png"
                  alt="No bills"
                  width={'100%'}
                  height={'100%'}
                />
              </div>
              <h4 className="font-head text-2xl font-semibold text-center">
                No bill found
              </h4>
            </div>
          </div>
        </div>
      )}
    </>
  )
})
// TODO : Add a loader here
