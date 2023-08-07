import Container from '../../Container'
import { useAppSelector } from '../../../hooks'
import { CardItemLoading } from '../Loading/Loading'
import { RestaurantCardItem } from './CardItem'
import { useNavigate } from 'react-router-dom'
import { CheckoutBox } from '../Checkout/CheckoutBox'
import { useCart } from '../../../hooks/useCart'
import React, { useEffect } from 'react'
import { AddressSelector } from '../Address/AddressSelector'
import { NotFoundCart } from '../NotFound/NotFoundCart'
interface IRestaurantCardTitleProps {
  total: number
  id: string
  restaurant: string
}

const RestaurantCardTitle: React.FC<IRestaurantCardTitleProps> = ({
  restaurant,
  total,
  id,
}) => {
  const navigate = useNavigate()
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h3
          className="font-bold font-head text-md md:text-lg capitalize cursor-pointer"
          onClick={() => navigate(`/restaurant/${id}`)}
        >
          {restaurant}
        </h3>
        <p className="text-xs md:text-sm">
          {`Total: `} <span className="ml-1">{`₹ ${total}`}</span>
        </p>
      </div>
    </>
  )
}

const RestaurantCard: React.FC = () => {
  const { loading, cart, error } = useAppSelector((state) => state.cartState)

  const tempArrayLoading: string[] = [...Array(5).fill('fdsfafdsa')]

  return (
    <div>
      <Container>
        <div className="min-h-[70svh]">
          {
            <div className="flex flex-col gap-8 md:gap-8 md:w-[100%] mx-auto">
              <div className="flex flex-col gap-3 md:gap-4">
                <div className="flex flex-col gap-3 md:gap-8">
                  {loading && cart.length == 0 ? (
                    tempArrayLoading.map((v, i) => {
                      return <CardItemLoading key={i} />
                    })
                  ) : cart.length == 0 ? (
                    <NotFoundCart />
                  ) : (
                    cart.map((v, i) => {
                      return <RestaurantCardItem key={i} id={v._id} {...v} />
                    })
                  )}
                </div>
              </div>
              <div className="flex gap-8 md:gap-8 flex-col">
                {cart.length !== 0 && (
                  <>
                    <div className="w-[100%] md:w-[100%]">
                      <AddressSelector />
                    </div>
                    <div className="w-[100%] md:w-[100%]">
                      <CheckoutBox />
                    </div>
                  </>
                )}
              </div>
            </div>
          }
        </div>
      </Container>
    </div>
  )
}

export default RestaurantCard
