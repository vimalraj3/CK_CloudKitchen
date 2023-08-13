import React, { memo, useCallback, useEffect } from "react";
import { Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useNavigate } from "react-router-dom";

import { addToCart } from "../../../state/slices/cart.slice";
import { FoodCard } from "./FoodCard";
import { FoodCardSkeleton } from "./Loading";
import { FoodNotFound } from "./NotFound";
import { getAllFoods } from "../../../state/slices/food.slice";
import toast from "react-hot-toast";

const FoodCardCon: React.FC = memo(() => {
  const email = useAppSelector((state) => state.userState.data.email);
  const { foods, loading, error } = useAppSelector((state) => state.foodState);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCart = useCallback(
    (foodId: string) => {
      if (!email) {
        navigate("/login");
        return;
      }

      if (!foodId) return;

      const data = dispatch(addToCart({ foodId, quantity: 1 }));

      toast.promise(
        data,
        {
          loading: "Adding to cart",
          success: (data) => {
            if (!data.payload?.success) {
              throw data.payload?.message;
            }
            return `${data.payload?.message.trim()}`;
          },
          error: (err) => {
            return `${err}`;
          },
        },
        {
          success: {
            duration: 2000,
          },
          error: {
            duration: 2000,
          },
        },
      );
    },
    [dispatch, email],
  );

  const handleClick = (id: string) => {
    navigate(`/food/${id}`);
  };

  useEffect(() => {
    if (!foods && !error) {
      dispatch(getAllFoods());
    }
  });

  return (
    <div className="mx-auto mt-5 w-[100%] max-w-[1200px]">
      {loading ? (
        <FoodCardSkeleton />
      ) : foods?.length === 0 ? (
        <FoodNotFound />
      ) : (
        <div className="w-[100%]">
          <Grid container spacing={4}>
            {foods.map((v, i) => {
              return (
                <FoodCard
                  {...v}
                  key={i}
                  handleAddToCart={handleCart}
                  handleClick={handleClick}
                />
              );
            })}
          </Grid>
        </div>
      )}
    </div>
  );
});
export default FoodCardCon;
