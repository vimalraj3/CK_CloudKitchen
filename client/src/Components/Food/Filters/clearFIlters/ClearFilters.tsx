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
        <div
          className="flex items-center justify-between rounded-[4px] bg-primary px-1 py-[.45rem]"
          onClick={() => handleClear()}
          role="button"
          aria-label="Clear"
        >
          <p className="mx-2 font-para font-semibold text-white">{`Clear`}</p>
          <div>
            <CloseIconBtn className="text-white" />
          </div>
        </div>
      )}
    </>
  );
};
