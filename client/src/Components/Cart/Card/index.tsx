import Container from "../../Container"
import { ICart, IFoodCart } from "../../../types/cart.types"
import { useAppSelector } from "../../../hooks"
import { RestaurantCardItemLoading } from "../Loading/RestaurantCardItemLoading"
import { RestaurantCardItem } from "./RestaurantCardItem"
interface IRestaurantCardTitleProps {
    // date: Date
    total: number
    restaurant: string
}



const RestaurantCardTitle: React.FC<IRestaurantCardTitleProps> = ({
    restaurant,
    total,
    // date,
}) => {
    return (
        <>
            <div className="flex items-center justify-between px-4 gap-2">
                <h3 className="font-bold font-head text-sm md:text-lg capitalize">{restaurant}</h3>
                <p className="text-xs md:text-sm">{`Total: `} <span className="ml-1">{`₹ ${total}`}</span></p>
            </div>
            {/* <p className="text-xs">{date.toDateString()}</p> */}
        </>
    )
}



export const RestaurantCard: React.FC = () => {
    const { loading, error, cart, restaurant, restaurantId, totalPrice } = useAppSelector(state => state.cartState)

    const tempArrayLoading: string[] = [...Array(5).fill('fdsfafdsa')];
    return (
        <div>
            <Container>
                <div className="min-h-[70svh]">
                    <div className="mb-2">
                        {
                            restaurant && (
                                <RestaurantCardTitle
                                    // date={restaurant.restaurantHours.close}
                                    total={totalPrice}
                                    restaurant={restaurant.restaurantName}
                                />
                            )
                        }
                    </div>
                    <div className="flex flex-col gap-3 md:gap-5">
                        {
                            loading && (
                                tempArrayLoading.map((a, i) => {
                                    return <RestaurantCardItemLoading key={i} />
                                })
                            )
                        }
                        {
                            cart && cart.map((v, i) => {
                                return (
                                    <RestaurantCardItem {...v} key={i} />
                                )
                            })
                        }
                    </div>
                </div>
            </Container>
        </div>
    )
}
