import { Search } from '../../UI/Form/Search/Search'
import FoodCardCon from '../Cards/FoodsCard'
import { ClearFilters } from '../Filters/clearFIlters/ClearFilters'
import { FilterDrawer } from '../Filters/Filter/FilterDrawer'
import { SortedByBtn } from '../Filters/SortedBy/SortedBy'

const HomeProduct: React.FC = () => {
  return (
    <div
      className="w-[90%] md:w-[80%] mx-auto max-w-[1200px] mt-6 md:mt-10"
      id="foods"
    >
      <div className="flex flex-col md:flex-row my-4 md:my-3 gap-3 items-center">
        <div className="w-[100%] md:w-[30%]">
          <Search />
        </div>
        <div className="grid grid-flow-col gap-3 w-[100%] items-center md:w-[50%]">
          <FilterDrawer />
          {innerWidth > 450 && <SortedByBtn />}
          <ClearFilters />
        </div>
      </div>
      <FoodCardCon />
    </div>
  )
}

export default HomeProduct
// TODO 1. Add a search bar to search for food items
// TODO 2. Add a filter button to filter food items
// TODO 3. Add a sort button to sort food items
