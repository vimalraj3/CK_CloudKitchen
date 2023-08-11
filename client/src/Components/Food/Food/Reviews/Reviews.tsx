import { useAppSelector } from "../../../../hooks";
import { UserAvatar } from "../../../UI/UserAvatar/UserAvatar";
import moment, { MomentInput } from "moment";
import { Rating, Skeleton } from "@mui/material";
import { useEffect } from "react";

const ReviewsLoading = () => (
  <div className="mt-8 flex w-[100%] items-center gap-7">
    <Skeleton variant="circular" width={55} height={44} animation="wave" />
    <div className="flex w-[100%] flex-col gap-3">
      <div className="flex w-[100%] justify-between gap-3">
        <div className="flex w-[70%] flex-col gap-2">
          <Skeleton
            variant="text"
            sx={{ fontSize: "1rem" }}
            width={"100%"}
            animation="wave"
          />
          <Skeleton
            variant="text"
            sx={{ fontSize: "1rem" }}
            width={"100%"}
            animation="wave"
          />
        </div>
        <Skeleton
          variant="text"
          sx={{ fontSize: "1rem" }}
          width={"30%"}
          animation="wave"
        />
      </div>
      <div className="flex w-[100%] flex-col gap-1">
        <Skeleton
          variant="text"
          sx={{ fontSize: "1rem" }}
          width={"100%"}
          animation="wave"
        />
        <Skeleton
          variant="text"
          sx={{ fontSize: "1rem" }}
          width={"100%"}
          animation="wave"
        />
      </div>
    </div>
  </div>
);

const NoReviews = () => (
  <div className="flex flex-col items-center justify-center gap-1">
    <div className="w-[300px]">
      <img src="/review.png" alt="review" width={"100%"} />
    </div>
    <div>
      <p className="text-center font-head text-xl">Be a first reviewer</p>
    </div>
  </div>
);

//  TODO add illustrator and description page

export const Reviews = () => {
  const reviews = useAppSelector((state) => state.foodState.food?.reviews);
  const loading = useAppSelector((state) => state.foodState.loading);
  useEffect(() => {
    console.log(reviews, "reviews");
  }, [reviews]);

  return (
    <div className=" mt-4 px-3 md:px-5">
      {loading ? (
        new Array(4).fill("623").map((v, i) => <ReviewsLoading key={i} />)
      ) : !reviews || reviews.length == 0 ? (
        <NoReviews />
      ) : (
        reviews.map((review, i) => (
          <div
            className="mb-8 flex w-[100%] items-start gap-7 md:items-center"
            key={i}
          >
            <UserAvatar
              userName={review.user.userName || ""}
              src={review.user.avatar}
              isComment
            />
            <div className="flex w-[100%] flex-col gap-1.5 md:gap-2.5">
              <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between md:gap-0">
                <div className="flex items-center gap-2">
                  <p className="font-head font-[500] capitalize md:text-lg">
                    {review.user.userName}
                  </p>
                  <p>-</p>
                  <div className="flex items-center md:hidden">
                    <Rating
                      name={`${review.user.userName}_rating`}
                      value={review.rating}
                      readOnly
                      size="small"
                    />
                  </div>
                  <p className="hidden text-sm md:block">
                    {moment(review.create).format("MMMM D, YYYY")}
                  </p>
                </div>
                <div className="hidden md:block">
                  <Rating
                    name={`${review.user.userName}_rating`}
                    value={review.rating}
                    readOnly
                    size="medium"
                  />
                </div>
                <p className="text-sm text-gray-500 md:hidden">
                  {moment(review.create).format("MMMM D, YYYY")}
                </p>
              </div>
              <div>
                <p className="text-md">{review.message}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
