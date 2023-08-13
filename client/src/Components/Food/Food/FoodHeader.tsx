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
                <h3 className="font-head text-2xl font-semibold capitalize md:text-2xl">
                  {food.title}
                </h3>
                <div className="mt-1 flex flex-row-reverse items-center justify-between gap-2 md:flex-row">
                  {/* <p className={`text-gray-500 text-sm md:text-md`}>{`${food.restaurantCity}`}</p> */}
                  <div className="hidden items-center justify-end md:flex">
                    <p className="text-sm capitalize">{`₹ ${food.price} - per ${food.title}`}</p>
                  </div>
                  <div className="flex items-center gap-2 md:hidden">
                    <Rating value={food.rating} size="small" readOnly />
                    <p className="text-sm">{`(${
                      food.totalNumberOfRating || 0
                    })`}</p>
                  </div>
                  <div className="flex items-center gap-2 md:hidden">
                    <p className="text-sm">{`₹ ${food.price}  - per ${food.title}`}</p>
                  </div>
                </div>
              </div>
            </div>
            <section className="flex flex-col gap-4">
              <div className="hidden justify-end gap-2 md:flex">
                <Rating value={food.rating} readOnly />
                <p>{`(${food.totalNumberOfRating || 0})`}</p>
              </div>
              <div className="mt-3 flex items-center gap-4 md:mt-0">
                <button
                  onClick={() => {
                    handleCart(food._id);
                  }}
                  className="flex w-full items-center justify-center gap-1 rounded-lg border border-primary px-3 py-2 font-medium  text-primary  transition-colors duration-300 ease-in-out hover:bg-primary-300 hover:font-semibold hover:text-white"
                >
                  <div className="flex items-center gap-2">
                    <p className=" capitalize md:block">add to cart</p>
                    <i className="fa-solid fa-cart-shopping"></i>
                  </div>
                </button>
              </div>
            </section>
          </div>
        )
      )}
    </>
  );
};
