import React, { useCallback } from 'react'
import { IsFlatObject } from 'react-hook-form'

interface IFilters {
  rating: number
  price: {
    min: number
    max: number
  }
}

interface ISortBy {
  rating: boolean
  price: {
    lowToHigh: boolean
    highToLow: boolean
  }
}

export const useSearch = () => {
  // * Default values
  const filtersDefault: IFilters = {
    rating: 0,
    price: {
      min: 0,
      max: 0,
    },
  }

  const sortedByDefault: ISortBy = {
    rating: false,
    price: {
      lowToHigh: false,
      highToLow: false,
    },
  }

  // * state Delcaration
  const [search, setSearch] = React.useState('')
  const [sortedBy, setSortedBy] = React.useState<ISortBy>(sortedByDefault)
  const [filter, setFilter] = React.useState<IFilters>(filtersDefault)

  // * handle search input change
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }, [])

  // * handle clear everything
  const handleClearSearch = useCallback(() => {
    setSearch('')
    setSortedBy(sortedByDefault)
    setFilter(filtersDefault)
  }, [])

  // * handle Search Submit
  const handleSearchSubmit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      console.log(search, 'search', 'submitted')
    },
    []
  )

  const handleSortedBy = useCallback((sortedBy: ISortBy) => {
    setSortedBy(sortedBy)
  }, [])

  const handleChangePrice = useCallback(
    (value: string, isMin: boolean) => {
      isMin
        ? setFilter({
            ...filter,
            price: {
              max: filter.price.max,
              min: parseInt(value),
            },
          })
        : setFilter({
            ...filter,
            price: {
              min: filter.price.min,
              max: parseInt(value),
            },
          })
    },
    [setFilter]
  )

  const handleRating = useCallback(
    (value: number) => {
      setFilter({
        ...filter,
        rating: value,
      })
    },
    [setFilter, filter]
  )

  const handleFilterSubmit = useCallback((data: IFilters) => {
    console.log(data)
  }, [])

  return {
    search,
    handleSearch,
    handleClearSearch,
    handleSearchSubmit,
    handleSortedBy,
    handleChangePrice,
    handleRating,
    ratingValue: filter.rating,
    handleFilterSubmit,
    priceMin: filter.price.min,
    priceMax: filter.price.max,
  }
}
