import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { CloseIconBtn } from "../../../UI/IconBtn/CloseIconBtn";
import { setClear } from "../../../../state/slices/food.slice";

export const ClearFilters = () => {
  const dispatch = useAppDispatch();
  const { canClear } = useAppSelector((state) => state.foodState);
  const handleClear = () => {
    dispatch(setClear());
  };
  return (
    <>
      {canClear && (
        <>
          <button
            onClick={() => handleClear()}
            className="flex items-center justify-center gap-2 rounded-xl border border-primary bg-primary py-2  font-medium  text-white transition-colors duration-300 ease-in-out hover:bg-white hover:text-primary"
          >
            <p className="font-para font-semibold">{`Clear`}</p>
            <i className={`fa-solid fa-xmark cursor-pointer`}></i>
          </button>
        </>
      )}
    </>
  );
};
