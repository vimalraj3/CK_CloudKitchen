import { IFoodCart } from "../../../types/cart.types";
import { AddIconBtn } from "../../UI/IconBtn/AddIconBtn";
import { MinusIconBtn } from "../../UI/IconBtn/MinusIconBtn";
import { DeleteBtn } from "../../UI/IconBtn/DeleteBtn";
import { Divider } from "@mui/material";
import React from "react";
import { useCart } from "../../../hooks/useCart";
import toast from "react-hot-toast";

interface IRestaurantCardItemProps extends IFoodCart {
  id: string;
}

interface IRestaurantCardItemBtnsProps {
  id: string;
  quantity: number;
}

const CardItemBtns: React.FC<IRestaurantCardItemBtnsProps> = React.memo(
  ({ id, quantity }) => {
    const { handleCartQuantity, handleCartDelete } = useCart();

    return (
      <div className="flex  items-center gap-4">
        {quantity > 1 && (
          <div
            onClick={() => {
              handleCartQuantity(id, quantity - 1);
            }}
          >
            <MinusIconBtn />
          </div>
        )}
        <p className="ml-auto font-para text-sm">x{quantity}</p>
        <div onClick={() => handleCartQuantity(id, quantity + 1)}>
          <AddIconBtn />
        </div>
        <Divider orientation="vertical" flexItem />
        <div onClick={() => handleCartDelete(id)}>
          <DeleteBtn />
        </div>
      </div>
    );
  },
);

export const CartItem: React.FC<IRestaurantCardItemProps> = React.memo(
  ({ food, quantity, id }) => {
    const { image, title, price } = food;

    return (
      <>
        {food.title && (
          <div className="flex flex-col items-start justify-between rounded-lg bg-secondary px-6 py-4 md:flex-row md:items-center">
            <div className="flex flex-row items-center justify-start gap-4">
              <img
                src={image[0]}
                alt={title}
                className="h-16 w-16 rounded-md"
                loading="lazy"
              />
              <div className="">
                <h3 className="font-head font-bold md:text-lg">{title}</h3>
                <p className="mt-1 font-para text-sm">₹ {price}</p>
              </div>
            </div>

            <div className="mt-3 flex w-[100%] items-center justify-center md:mt-0 md:w-auto">
              <CardItemBtns id={id} quantity={quantity} />
            </div>
          </div>
        )}
      </>
    );
  },
);
