import { Search } from "../../UI/Form/Search/Search";
import FoodCardCon from "../Cards/FoodsCard";
import { ClearFilters } from "../Filters/clearFIlters/ClearFilters";
import { FilterDrawer } from "../Filters/Filter/FilterDrawer";
import { SortedByBtn } from "../Filters/SortedBy/SortedBy";

const HomeProduct: React.FC = () => {
  return (
    <div
      className="mx-auto mt-6 w-[90%] max-w-[1200px] md:mt-10 md:w-[80%]"
      id="foods"
    >
      <div className="my-4 flex flex-col items-center gap-3 md:my-3 md:flex-row">
        <div className="w-[100%] md:w-[30%]">
          <Search />
        </div>
        <div className="grid w-[100%] grid-flow-col items-center gap-3 md:w-[50%]">
          <FilterDrawer />
          {innerWidth > 450 && <SortedByBtn />}
          <ClearFilters />
        </div>
      </div>
      <FoodCardCon />
    </div>
  );
};

export default HomeProduct;
// TODO 1. Add a search bar to search for food items
// TODO 2. Add a filter button to filter food items
// TODO 3. Add a sort button to sort food items
