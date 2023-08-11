import React, { useCallback, useEffect, useState } from "react";
import { Button, Rating, Skeleton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { IFood } from "../../../types/Food.types";
import { useNavigate, useParams } from "react-router-dom";
import { set } from "react-hook-form";
import { addToCart } from "../../../state/slices/cart.slice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const FoodHeaderLoading = () => (
  <div className="flex w-[100%] flex-col border-b border-dashed border-primary px-3 pb-6 md:flex-row md:items-center md:justify-between md:gap-9 md:px-5 md:py-6">
    <div className="flex w-[100%] flex-col md:w-[50%]  md:flex-row md:items-center md:gap-6">
      <div className="hidden aspect-video md:block md:w-[300px]">
        <Skeleton
          variant="rectangular"
          width="100%"
          height={"100%"}
          animation="wave"
        />
      </div>
      <div className="flex w-[100%] flex-col gap-2">
        <Skeleton
          variant="text"
          sx={{ fontSize: { sm: "1.85rem", md: "2rem" }, width: "100%" }}
          animation="wave"
        />
        <div className="mt-1 flex w-[100%] items-center justify-between gap-2">
          <div className="w-[50%] md:w-[100%]">
            <Skeleton
              variant="text"
              sx={{ fontSize: { sm: "3rem", md: "1rem" }, width: "100%" }}
              animation="wave"
            />
          </div>
          <div className="flex w-[30%] items-center gap-2 md:hidden">
            <Skeleton
              animation="wave"
              variant="text"
              sx={{ fontSize: "3rem", width: "100%" }}
            />
          </div>
        </div>
        <div className="flex w-[100%] items-center gap-2 md:hidden">
          <Skeleton
            variant="text"
            animation="wave"
            sx={{ fontSize: "1.65rem", width: "100%" }}
          />
        </div>
      </div>
    </div>
    <section className="flex w-[100%] flex-col gap-4 md:w-[10%]">
      <div className="hidden gap-2 md:flex">
        <Skeleton
          variant="text"
          animation="wave"
          sx={{ fontSize: "1.75rem", width: "100%" }}
        />
      </div>
      <div className="hidden items-center justify-end md:flex">
        <Skeleton
          variant="text"
          animation="wave"
          sx={{ fontSize: "1.75rem", width: "100%" }}
        />
      </div>
    </section>
  </div>
);

// * TITLE of Restaurant Card
export const FoodHeader: React.FC = () => {
  const { loading, food } = useAppSelector((state) => state.foodState);

  const email = useAppSelector((state) => state.userState.data.email);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const handleCart = useCallback(
    (foodId: string) => {
      console.log(email);

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
    [dispatch],
  );
  return (
    <>
      {loading ? (
        <FoodHeaderLoading />
      ) : (
        food && (
          <div className="flex w-[100%] flex-col border-b border-dashed border-primary px-3 pb-6 md:flex-row md:justify-between md:px-5 md:py-6">
            <div className="flex flex-col md:flex-row md:items-center  md:gap-6">
              <div className="hidden md:block md:w-[100px]">
                <img
                  src={food.image[0]}
                  alt="image"
                  width={"100%"}
                  className="rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-head text-2xl font-semibold md:text-2xl">
                  {food.title}
                </h3>
                <div className="mt-1 flex items-center justify-between gap-2">
                  {/* <p className={`text-gray-500 text-sm md:text-md`}>{`${food.restaurantCity}`}</p> */}
                  <div className="hidden items-center justify-end md:flex">
                    <p className="text-sm">{`₹ ${food.price} for two`}</p>
                  </div>
                  <div className="flex items-center gap-2 md:hidden">
                    <Rating value={food.rating} size="small" readOnly />
                    <p className="text-sm">{`(${
                      food.totalNumberOfRating || 0
                    })`}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:hidden">
                  <p className="text-sm">{`₹ ${food.price} for two`}</p>
                </div>
              </div>
            </div>
            <section className="flex flex-col gap-4">
              <div className="hidden justify-end gap-2 md:flex">
                <Rating value={food.rating} readOnly />
                <p>{`(${food.totalNumberOfRating || 0})`}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outlined"
                    onClick={() => {
                      handleCart(food._id);
                    }}
                    sx={{
                      color: "#ff7e8b",
                      borderColor: "#ff7e8b",
                      ":hover": {
                        borderColor: "#ff7e8b",
                      },
                    }}
                    fullWidth
                  >
                    <div className="flex items-center gap-2">
                      <p className=" capitalize md:block">add to cart</p>
                      <i className="fa-solid fa-cart-shopping"></i>
                    </div>
                  </Button>
                </div>
              </div>
            </section>
          </div>
        )
      )}
    </>
  );
};
{
  /* <div className="flex flex-col md:flex-row md:justify-between w-[100%] px-3 md:px-5 border-b border-dashed border-primary pb-6 md:py-6">
<div className="flex flex-col md:flex-row md:gap-6  md:items-center">
  <div className="hidden md:block md:w-[100px]">
    <img
      src={food.image[0]}
      alt="image"
      width={'100%'}
      className="rounded-md"
    />
  </div>
  <div className="flex gap-2 flex-col">
    <h3 className="font-head font-semibold text-2xl md:text-2xl">
      {food.title}
    </h3>
    <div className="flex items-center justify-between gap-2 mt-1">
      <p
        className={`text-gray-500 text-sm md:text-md`}
      >{`${food.price}`}</p>
      <div className="flex gap-2 items-center md:hidden">
        <Rating value={food.rating} size="small" readOnly />
        <p className="text-sm">{`(${food.totalRating})`}</p>
      </div>
    </div>
    <div className="flex md:hidden items-center gap-2">
      <p className="text-sm">{`₹ ${food.price} for two`}</p>
    </div>
  </div>
</div>
<section className="flex gap-4 flex-col">
  <div className="hidden md:flex gap-2">
    <Rating value={food.rating} readOnly />
    <p>{`(${food.totalRating})`}</p>
  </div>
  <div className="hidden md:flex items-center justify-end">
    <p className="text-sm">{`₹ ${food.price} for two`}</p>
  </div>
</section>
</div> */
}
