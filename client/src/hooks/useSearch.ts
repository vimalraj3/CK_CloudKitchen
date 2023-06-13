import React, { useCallback } from 'react'

interface IFilters {
  rating: {
    min: number
    max: number
  }
  price: {
    min: number
    max: number
  }
  vegOnly: boolean
  nonVegOnly: boolean
}

interface ISortBy {
  rating: number
  price: {
    lowToHigh: false
    highToLow: false
  }
}

export const useSearch = () => {
  const filtersDefault: IFilters = {
    rating: {
      min: 0,
      max: 0,
    },
    price: {
      min: 0,
      max: 0,
    },
    vegOnly: false,
    nonVegOnly: false,
  }

  const sortedByDefault: ISortBy = {
    rating: 0,
    price: {
      lowToHigh: false,
      highToLow: false,
    },
  }

  const [search, setSearch] = React.useState('')

  const [sortedBy, setSortedBy] = React.useState<ISortBy>(sortedByDefault)

  const [filter, setFilter] = React.useState<IFilters>(filtersDefault)

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }, [])

  const handleClearSearch = useCallback(() => {
    setSearch('')
  }, [])

  const handleSearchSubmit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      console.log(search, 'search', 'submitted')
    },
    []
  )

  const handleSortedBy = useCallback((sortedBy: ISortBy) => {
    setSortedBy(sortedBy)
  }, [])

  const handleFilter = useCallback((filters: IFilters) => {
    setFilter(filters)
  }, [])

  return {
    search,
    handleSearch,
    handleClearSearch,
    handleSearchSubmit,
    handleFilter,
    handleSortedBy,
  }
}
