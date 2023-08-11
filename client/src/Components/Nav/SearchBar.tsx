import { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getAllFoods, setSearch } from "../../state/slices/food.slice";
import { useScroll } from "../../hooks/useScroll";
export const SearchBar = () => {
  const search = useAppSelector((state) => state.foodState.search);
  const dispatch = useAppDispatch();
  const setSearchValue = (element: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(element.target.value));
  };
  const scrollTo = useScroll();
  const handleSearch = () => {
    dispatch(getAllFoods());
    scrollTo("foods");
  };

  return (
    <section className=" font-moutserrat mt-2 flex h-[40px] w-[80%] max-w-[500px] flex-row items-center justify-center rounded-lg bg-[#fff] px-4 text-[#000] shadow-inner md:mt-5 md:h-[50px] md:rounded-xl">
      <i className="fa-solid fa-magnifying-glass w-[20px] text-[#ff7e8b]"></i>
      <input
        type="text"
        value={search}
        className="ml-2 h-[90%]  w-[100%] hover:outline-none focus:outline-none"
        placeholder="Search for cloud kitchen"
        onChange={(e) => setSearchValue(e)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
    </section>
  );
};
