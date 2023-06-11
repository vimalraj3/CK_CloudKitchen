import { IFoodCart } from "../../../types/cart.types"
import { AddIconBtn } from "../../utils/IconBtn/AddIconBtn"
import { MinusIconBtn } from "../../utils/IconBtn/MinusIconBtn"
import { DeleteBtn } from "../../utils/IconBtn/DeleteBtn"
import { Divider } from "@mui/material"
import React from "react"
import { useCart } from "../../../hooks/useCart"


interface IRestaurantCardItemProps extends IFoodCart {
    id: string
}

interface IRestaurantCardItemBtnsProps {
    id: string
    quantity: number
}

const RestaurantCardItemBtns: React.FC<IRestaurantCardItemBtnsProps> = React.memo(
    ({ id, quantity }) => {
        const { handleCartQuantity, handleCartDelete } = useCart()

        return (
            <div className="flex  gap-4 items-center">
                {
                    quantity > 1 && (
                        <div onClick={() => {
                            handleCartQuantity(id, quantity - 1)
                            console.log(id, quantity, 'quantity sub');
                        }
                        }>
                            <MinusIconBtn />
                        </div>
                    )
                }
                <p className="ml-auto text-sm font-para">x{quantity}</p>
                <div onClick={() => handleCartQuantity(id, quantity + 1)}>
                    <AddIconBtn />
                </div>
                <Divider orientation="vertical" flexItem />
                <div onClick={() => handleCartDelete(id)}>
                    <DeleteBtn />
                </div>
            </div>
        )
    }
)


export const RestaurantCardItem: React.FC<IRestaurantCardItemProps> = React.memo(
    ({
        food,
        quantity,
        id,
    }) => {
        const { image, title, price } = food

        return (
            <>
                {
                    food.title && (
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-secondary py-4 px-6 rounded-lg">
                            <div className="flex flex-row justify-start items-center gap-4">
                                <img src={image[0]} alt={title} className="w-16 h-16 rounded-md" loading="lazy" />
                                <div className="">
                                    <h3 className="font-bold font-head md:text-lg">{title}</h3>
                                    <p className="text-sm font-para mt-1">₹ {price}</p>
                                </div>
                            </div>

                            <div className="flex w-[100%] md:w-auto justify-center items-center mt-3 md:mt-0">
                                <RestaurantCardItemBtns id={id} quantity={quantity} />
                            </div>
                        </div>
                    )
                }
            </>
        )
    }

)