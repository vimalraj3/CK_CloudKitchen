import React, { useCallback } from 'react'
import { IsFlatObject } from 'react-hook-form'
import { useAppSelector } from './useAppSelector'
import { useAppDispatch } from './useAppDispatch'
import {
  IFilters,
  getAllRestaurants,
  setFilter,
  setSearch,
  setSortedBy,
} from '../state/slices/restaurants.slice'

export const useSearch = () => {
  // * state Delcaration
  const { search, filter, sortedBy } = useAppSelector(
    (state) => state.restaurantsState
  )

  // *dispatch
  const dispatch = useAppDispatch()

  // * handle search input change
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value))
  }, [])

  // * handle Search Submit
  const handleSearchSubmit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      console.log(search, 'search', 'submitted')
      dispatch(getAllRestaurants())
    },
    []
  )

  return {
    search,
    handleSearch,
    handleSearchSubmit,
  }
}
