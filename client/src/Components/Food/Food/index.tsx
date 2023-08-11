import React, { memo, useEffect } from "react";
import Nav from "../../Nav";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useParams } from "react-router-dom";
import { FoodHeader } from "./FoodHeader";
import { getFoodById } from "../../../state/slices/food.slice";
import { Description } from "./Desciption/Description";
import { Reviews } from "./Reviews/Reviews";
const Food: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) dispatch(getFoodById(id));
  }, [id]);

  return (
    <div className="min-h-[90dvh]">
      <Nav dark bgColor="#f8f8f8" />
      <div className="mt-7 w-[100%] md:mt-4">
        <div className="mx-auto w-[90%] max-w-[1200px] py-4 md:px-[2rem] ">
          {/* <MoblieFood /> */}
          <FoodHeader />
          <Description />
          <Reviews />
        </div>
      </div>
    </div>
  );
};
export default memo(Food);
