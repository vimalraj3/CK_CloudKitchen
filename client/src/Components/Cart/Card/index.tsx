import Container from "../../Container"
import { useAppSelector } from "../../../hooks"
import { RestaurantCardItemLoading } from "../Loading/RestaurantCardItemLoading"
import { RestaurantCardItem } from "./RestaurantCardItem"
import { useNavigate } from "react-router-dom"
import { CheckoutBox } from "../Checkout/CheckoutBox"
import { useCart } from "../../../hooks/useCart"
import React, { useCallback, useEffect } from "react"
import { Button } from "@mui/material"
import { Checkout } from "../Checkout/Checkout"
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
    return (
        <>
            <div className="flex items-center justify-between gap-2">
                <h3 className="font-bold font-head text-sm md:text-lg capitalize cursor-pointer" onClick={() => navigate(`/restaurant/${id}`)}>{restaurant}</h3>
                <p className="text-xs md:text-sm">{`Total: `} <span className="ml-1">{`₹ ${total}`}</span></p>
            </div>
        </>
    )
}

const RestaurantCard: React.FC = () => {
    const { loading, cart, restaurant, totalPrice, error } = useAppSelector(state => state.cartState)

    const navigate = useNavigate()

    const { handlePageLoad } = useCart()
    const [checkout, setCheckout] = React.useState(false)


    const handleNavigate = useCallback((toggle: boolean) => {
        setCheckout(toggle)
    }, [])

    useEffect(() => {
        handlePageLoad()
    }, [])

    const tempArrayLoading: string[] = [...Array(5).fill('fdsfafdsa')];

    return (
        <div>
            <Container>

                <div className="min-h-[70svh]">
                    {
                        cart.length > 0 && restaurant ?
                            (
                                <>
                                    {
                                        !checkout ? (
                                            <>
                                                <div className="mb-2">
                                                    <RestaurantCardTitle
                                                        // date={restaurant.restaurantHours.close}
                                                        total={totalPrice}
                                                        restaurant={restaurant.restaurantName}
                                                        id={restaurant._id}
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-3 md:gap-5">

                                                    {
                                                        cart && cart.map((v, i) => {
                                                            return (
                                                                <RestaurantCardItem key={i} id={v._id}   {...v} />
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <div className="flex justify-end mt-4">
                                                    <CheckoutBox handleCheckout={handleNavigate} />
                                                </div>
                                            </>
                                        ) : (
                                            <Checkout handleBack={handleNavigate} />
                                        )
                                    }
                                </>
                            ) :
                            (
                                <>
                                    {
                                        loading ? (
                                            tempArrayLoading.map((a, i) => {
                                                return <RestaurantCardItemLoading key={i} />
                                            })
                                        )
                                            : (
                                                <div className="flex justify-center items-center gap-2 flex-col">
                                                    <p className="font-para">Your cart is empty 😥</p>
                                                    <Button variant="outlined" onClick={() => navigate('/')}>
                                                        add Foods
                                                    </Button>
                                                </div>
                                            )
                                    }
                                </>
                            )
                    }
                </div>
            </Container>
        </div >
    )
}

export default RestaurantCard