import { useCallback } from "react";
import { useAppDispatch } from "./useAppDispatch";
import {
  addToCart,
  clearAndAddToCart,
  setAskClean,
} from "../state/slices/cart.slice";
import { useAppSelector } from "./useAppSelector";

export const useRestaurantOrderPage = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cartState);
  interface addToCartProps {
    foodId: string;
    restaurantId: string;
    quantity: number;
  }

  const handleAddToCart = useCallback(
    ({ foodId, restaurantId, quantity }: addToCartProps) => {
      dispatch(
        addToCart({
          foodId: foodId,
          quantity: quantity,
        }),
      );
    },
    [],
  );

  const handleAskClean = useCallback(() => {
    dispatch(setAskClean());
  }, []);

  const handleClearAndAddToCart = useCallback((food: addToCartProps) => {
    dispatch(clearAndAddToCart(food));
  }, []);

  return { handleAddToCart, handleAskClean, handleClearAndAddToCart };
};
