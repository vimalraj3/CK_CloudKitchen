import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import {
  SortedBy,
  getAllFoods,
  setSortedBy,
} from "../../../../state/slices/food.slice";

export const SortedByBtn = () => {
  const [open, setOpen] = useState(false);
  const defaultSortedByTitle = "sorted by" as const;
  const [sortedByTitle, setSortedBytitle] =
    useState<string>(defaultSortedByTitle);

  const buttonValues = [
    {
      name: "rating",
      value: SortedBy.rating,
    },
    {
      name: "low to high",
      value: SortedBy.lowToHigh,
    },
    {
      name: "high to low",
      value: SortedBy.highToLow,
    },
  ] as const;

  const dispatch = useAppDispatch();
  const { sortedBy } = useAppSelector((state) => state.foodState);

  const handleSortedBySubmit = async (sortedByValue: SortedBy) => {
    await dispatch(setSortedBy(sortedByValue));
    dispatch(getAllFoods());
    setOpen(false);
  };

  useEffect(() => {
    const sortedByName = !(sortedBy === SortedBy.empty)
      ? buttonValues.find(({ name, value }) => value === sortedBy)?.name
      : "";
    setSortedBytitle(`${defaultSortedByTitle} ${sortedByName}`);
  }, [sortedBy]);

  return (
    <div className="relative w-[100%]" key={"sorted by btn component"}>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-center  gap-1 rounded-xl border border-primary py-2 font-medium text-primary transition-colors  duration-300 ease-in-out hover:bg-primary-300 hover:font-semibold hover:text-white"
      >
        <div className="flex items-center gap-2 capitalize md:gap-3">
          {`${sortedByTitle}`}
          <i
            className={`fa-solid fa-chevron-down ${
              open ? "rotate  " : "reverse-rotate "
            }`}
          ></i>
        </div>
      </button>
      {open && (
        <div
          className="slider absolute top-[100%] z-50 mt-4 w-[100%] rounded-xl border border-gray-400 bg-white  px-1 py-1 md:border-primary"
          key={"BtnShow"}
        >
          {buttonValues.map(({ name, value }, i) => (
            <>
              <button
                key={`${name}:${i}`}
                onClick={() => handleSortedBySubmit(value)}
                className="flex w-full items-center justify-center gap-1  rounded-lg border-primary py-1 capitalize text-primary transition-colors  duration-300 ease-in-out hover:bg-primary-300 hover:font-semibold hover:text-white"
              >
                {name}
              </button>
            </>
          ))}
        </div>
      )}
    </div>
  );
};
