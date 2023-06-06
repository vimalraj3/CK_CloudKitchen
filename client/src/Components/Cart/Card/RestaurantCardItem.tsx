import { IFoodCart } from "../../../types/cart.types"
import { AddIconBtn } from "../../utils/IconBtn/AddIconBtn"
import { MinusIconBtn } from "../../utils/IconBtn/MinusIconBtn"
import { DeleteBtn } from "../../utils/IconBtn/DeleteBtn"
import { Divider } from "@mui/material"
import React from "react"


interface IRestaurantCardItemProps extends IFoodCart { }

export const RestaurantCardItem: React.FC<IRestaurantCardItemProps> = React.memo(
    ({
        food,
        quantity,
    }) => {
        const { image, title, price, } = food
        return (
            <>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-2 gap-2 bg-secondary py-4 px-6 rounded-lg ">
                    <div className="flex flex-row justify-start items-center gap-4">
                        <img src={image[0]} alt={title} className="w-16 h-16 rounded-md" />
                        <div className="">
                            <h3 className="font-bold font-head md:text-lg">{title}</h3>
                            <p className="text-sm font-para mt-1">₹ {price}</p>
                        </div>
                    </div>

                    <div className="flex w-[100%] md:w-auto justify-center items-center">
                        <div className="flex  gap-4 items-center">
                            <div>
                                <MinusIconBtn />
                            </div>
                            <p className="ml-auto text-sm font-para">x{quantity}</p>
                            <div>
                                <AddIconBtn />
                            </div>
                            <Divider orientation="vertical" flexItem />
                            <div>
                                <DeleteBtn />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

)