import React, { useCallback } from 'react'
import { IsFlatObject } from 'react-hook-form'
import { useAppSelector } from './useAppSelector'
import { useAppDispatch } from './useAppDispatch'
import {
  IFilters,
  setFilter,
  setSearch,
  setSortedBy,
} from '../state/slices/FilterAndSearch.slice'

export const useSearch = () => {
  // * state Delcaration
  const { search, filter, sortedBy } = useAppSelector(
    (state) => state.filterAndSearchState
  )

  // *dispatch
  const dispatch = useAppDispatch()

  // * handle search input change
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value))
  }, [])

  // // * handle clear everything
  // const handleClearSearch = useCallback(() => {
  //   setSearch('')
  //   setSortedBy(sortedByDefault)
  //   setFilter(filtersDefault)
  // }, [])

  // * handle Search Submit
  const handleSearchSubmit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      console.log(search, 'search', 'submitted')
    },
    []
  )

  return {
    search,
    handleSearch,
    handleSearchSubmit,
    // handleRating,
    ratingValue: filter.rating,
    // handleFilterSubmit,
    priceMin: filter.price.min,
    priceMax: filter.price.max,
  }
}
