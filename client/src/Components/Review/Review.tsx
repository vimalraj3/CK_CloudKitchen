import { Button, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFoodById } from "../../state/slices/food.slice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Input, TextArea } from "../UI/Form";
import { Btn } from "../UI/Btn/Btn";
import toast from "react-hot-toast";
import { addReview } from "../../state/slices/checkout.slice";

const Review = () => {
  const { userId, foodId } = useParams();

  const [review, setReview] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  const dispatch = useAppDispatch();

  const food = useAppSelector((state) => state.foodState.food);

  const handleSubmit = () => {
    if (!review || !message.trim()) {
      toast.error(
        `${!review && "Rating"} ${!review && !message.trim() && "and"} ${
          !message.trim() && "Message"
        }  required`,
      );
      return;
    }

    if (!userId || !foodId) {
      toast.error(`User not found`);
      return;
    }

    dispatch(
      addReview({
        rating: review,
        message: message,
        userId,
        foodId,
      }),
    );
  };

  useEffect(() => {
    if (foodId) {
      dispatch(getFoodById(foodId));
    }
  }, [foodId]);

  return (
    <>
      <div className="relative h-[100vh] w-[100%]">
        <div className="mx-auto flex h-[100%] w-[100%] max-w-[1200px] items-center justify-center">
          <div className="flex w-full flex-col gap-3 px-3 py-2 md:items-center md:justify-center md:gap-7">
            <section className="">
              <h1 className="text-2xl font-bold">{`Review food ${food?.title}`}</h1>

              <img
                className="mt-2 w-[250px] rounded-md"
                src={food?.image[0]}
                alt={food?.title}
                width={"100%"}
                height={"100%"}
              />
            </section>

            <section className="">
              <div>
                <h3 className="mb-1 text-xl">Rating:</h3>
                <Rating
                  value={review}
                  onChange={(e, rating) => rating && setReview(rating)}
                />
              </div>

              <div className="mt-3 w-[250px]">
                <h3 className="mb-1 text-xl">Message: </h3>
                <TextArea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div>
                <button
                  className="mt-2 w-full rounded-md bg-primary px-3 py-2 text-lg font-bold text-white hover:bg-primary-300"
                  onClick={handleSubmit}
                >
                  Review
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
export default Review;
