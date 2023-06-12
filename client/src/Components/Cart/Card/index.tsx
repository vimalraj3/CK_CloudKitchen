import Container from "../../Container"
import { useAppSelector } from "../../../hooks"
import { RestaurantCardItemLoading } from "../Loading/RestaurantCardItemLoading"
import { RestaurantCardItem } from "./RestaurantCardItem"
import { useNavigate } from "react-router-dom"
import { CheckoutBox } from "../Checkout/CheckoutBox"
import { useCart } from "../../../hooks/useCart"
import React, { useCallback, useEffect } from "react"
import { AddressSelector } from "../Address/AddressSelector"
import { useCheckout } from "../../../hooks/useCheckout"
interface IRestaurantCardTitleProps {
    total: number
    id: string
    restaurant: string
}

const RestaurantCardTitle: React.FC<IRestaurantCardTitleProps> = ({
    restaurant,
    total,
    id
}) => {
    const navigate = useNavigate()
    console.log(restaurant, total, id, 'restaurant card title');

    return (
        <>
            <div className="flex items-center justify-between gap-2">
                <h3 className="font-bold font-head text-md md:text-lg capitalize cursor-pointer" onClick={() => navigate(`/restaurant/${id}`)}>{restaurant}</h3>
                <p className="text-xs md:text-sm">{`Total: `} <span className="ml-1">{`₹ ${total}`}</span></p>
            </div>
        </>
    )
}

const RestaurantCard: React.FC = () => {
    const { loading, cart, restaurant, totalPrice } = useAppSelector(state => state.cartState)

    const { handlePageLoad } = useCart()
    useEffect(() => {
        handlePageLoad()
    }, [])

    const tempArrayLoading: string[] = [...Array(5).fill('fdsfafdsa')];

    return (
        <div>
            <Container>

                <div className="min-h-[70svh]">
                    {

                        <div className="flex flex-col gap-8 md:gap-8 md:w-[100%] mx-auto">
                            <div className="flex flex-col gap-3 md:gap-4">
                                {
                                    restaurant?.restaurantName && (
                                        <RestaurantCardTitle
                                            total={totalPrice}
                                            restaurant={restaurant.restaurantName}
                                            id={restaurant._id}
                                        />
                                    )
                                }
                                <div className="flex flex-col gap-3 md:gap-8">
                                    {
                                        cart ? cart.map((v, i) => {
                                            return (
                                                <RestaurantCardItem key={i} id={v._id}   {...v} />
                                            )
                                        }) : (
                                            tempArrayLoading.map((v, i) => {
                                                return (
                                                    <RestaurantCardItemLoading key={i} />
                                                )
                                            })
                                        )
                                    }
                                </div>
                            </div>
                            <div className="flex gap-8 md:gap-8 flex-col md:flex-row">
                                <div className="w-[100%] md:w-[60%]">
                                    <AddressSelector />
                                </div>
                                <div className="w-[100%] md:w-[40%]">
                                    <CheckoutBox />
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </Container>
        </div >
    )
}

export default RestaurantCard