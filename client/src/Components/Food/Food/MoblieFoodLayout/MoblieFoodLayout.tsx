import React from "react";
import FoodCardCon from "../../Cards/FoodsCard";
import { Reviews } from "../Reviews/Reviews";
import { Description } from "../Desciption/Description";
export const MoblieFood = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="mt-4 flex w-[100%] flex-col gap-4 px-4">
      <section>
        <h4 className="my-4 font-head text-lg font-semibold">Menu</h4>
        <FoodCardCon />
      </section>
      <section>
        <h4 className="my-4 font-head text-lg font-semibold">Reviews</h4>
        <Reviews />
      </section>
      <section>
        <h4 className="my-4 font-head text-lg font-semibold">Description</h4>
        <Description />
      </section>
    </div>
  );
};
