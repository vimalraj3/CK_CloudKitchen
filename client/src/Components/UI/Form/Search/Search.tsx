import { Button } from "@mui/material";
import React from "react";
import { forwardRef, memo } from "react";
import { SearchIconBtn } from "../../IconBtn/SearchIconBtn";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import {
  getAllFoods,
  setSearch,
  setSortedBy,
} from "../../../../state/slices/food.slice";

interface Props {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Search: React.FC = memo(() => {
  const { search } = useAppSelector((state) => state.foodState);

  const dispatch = useAppDispatch();
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
    dispatch(getAllFoods());
  };
  const handleSubmit = () => {
    dispatch(getAllFoods());
  };

  return (
    <div className="flex w-[100%] items-center justify-center rounded-xl border border-primary bg-transparent  px-1">
      <input
        id={"search"}
        placeholder={`Search`}
        value={search}
        name={"search"}
        onChange={handleSearch}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
        className="text-md w-[100%] rounded-lg bg-transparent px-2 py-2 font-para placeholder:text-black placeholder:text-primary focus:outline-none"
      />
      {/* <SearchIconBtn
        handleClick={() => handleSubmit()}
        className="text-primary"
      /> */}
    </div>
  );
});
