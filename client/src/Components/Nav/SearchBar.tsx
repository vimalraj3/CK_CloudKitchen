import { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { getAllFoods, setSearch } from '../../state/slices/food.slice'
import { useScroll } from '../../hooks/useScroll'
export const SearchBar = () => {
  const search = useAppSelector((state) => state.foodState.search)
  const dispatch = useAppDispatch()
  const setSearchValue = (element: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(element.target.value))
  }
  const scrollTo = useScroll()
  const handleSearch = () => {
    dispatch(getAllFoods())
    scrollTo('foods')
  }

  return (
    <section className=" h-[40px] md:h-[50px] w-[80%] max-w-[500px] mt-2 md:mt-5 bg-[#fff] text-[#000] rounded-lg md:rounded-xl flex justify-center items-center shadow-inner flex-row font-moutserrat px-4">
      <i className="fa-solid fa-magnifying-glass text-[#ff7e8b] w-[20px]"></i>
      <input
        type="text"
        value={search}
        className="ml-2 w-[100%]  h-[90%] hover:outline-none focus:outline-none"
        placeholder="Search for cloud kitchen"
        onChange={(e) => setSearchValue(e)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch()
          }
        }}
      />
    </section>
  )
}
