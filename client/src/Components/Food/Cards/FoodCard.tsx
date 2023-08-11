import { memo } from "react";
import { IFood } from "../../../types/Food.types";
import { Button, Grid } from "@mui/material";

interface IFoodCard extends IFood {
  handleAddToCart: (id: string) => void;
  handleClick: (id: string) => void;
}
export const FoodCard: React.FC<IFoodCard> = memo(
  ({
    time,
    title,
    rating,
    price,
    image,
    _id,
    handleAddToCart,
    handleClick,
  }) => {
    return (
      <Grid item xs={12} sm={6} md={4}>
        <div className="aspect-[4/3] w-[100%] rounded-lg bg-white px-4 py-3 transition-shadow ease-in-out md:hover:shadow-xl">
          <section
            className="w-[100%] cursor-pointer"
            onClick={() => handleClick(_id)}
          >
            <img
              src={image[0]}
              width={"100%"}
              height={"100%"}
              alt={title}
              className="rounded-lg"
              loading="lazy"
            />
          </section>
          <section className="mt-2.5">
            <div className="flex items-center justify-between">
              <h4 className="font-head text-lg">{title}</h4>
              <div className="flex w-[50px]  items-center justify-around rounded-sm bg-green-500">
                <p className="text-center font-para text-[14px] font-[700] text-[#fff]">{`${rating}`}</p>
                <i className="fa-solid fa-star text-white"></i>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-montserrat text-[12px] font-[500] text-[#9c9c9c]">{`Price : ₹ ${price}`}</p>
            </div>
          </section>
          <section className="mt-4">
            <Button
              variant="outlined"
              onClick={() => {
                handleAddToCart(_id);
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
          </section>
        </div>
      </Grid>
    );
  },
);
