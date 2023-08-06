import React, { Children, useCallback } from 'react'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Rating from '@mui/material/Rating'
import { Button, Divider } from '@mui/material'
import { PriceSelector } from '../../../UI/Form/PriceSelector/PriceSelector'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { SortedByBtn } from '../SortedBy/SortedBy'
import { getAllFoods, setFilter } from '../../../../state/slices/food.slice'
export const FilterDrawer = () => {
  const anchor = 'right'

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })

  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)

  const toggleDrawer = (open: boolean) => {
    setState({ ...state, [anchor]: open })
  }

  const dispatch = useAppDispatch()

  const handleFilterSubmit = () => {
    console.log('closing')
    // console.log(filter, 'filter', 'submitted', sortedBy, 'sortedBy')
    dispatch(getAllFoods())
  }

  const filter = useAppSelector((state) => state.foodState.filter)

  const handleRating = async (value: number) => {
    await dispatch(
      setFilter({
        ...filter,
        rating: value,
      })
    )
  }

  return (
    <div className="w-[100%]">
      <React.Fragment key={anchor}>
        <Button
          variant="outlined"
          size={'large'}
          onClick={() => toggleDrawer(true)}
          sx={{
            color: '#ff7e8b',
            borderColor: '#ff7e8b',
            ':hover': {
              borderColor: '#ff7e8b',
            },
          }}
          fullWidth
        >
          <div className="flex gap-2 items-center">
            <i className="fa-solid fa-arrow-up-wide-short"></i>
            Filter
          </div>
        </Button>
        <div onClick={() => toggleDrawer(true)}></div>
        <SwipeableDrawer
          anchor={anchor}
          open={state[anchor]}
          onClose={() => {
            toggleDrawer(false)
            handleFilterSubmit()
          }}
          onOpen={() => toggleDrawer(true)}
          disableBackdropTransition={false}
        >
          <div className="flex flex-col justify-between h-[100%] w-[100%] mx-auto py-6 px-4 font-para">
            <div className="flex flex-col gap-6 w-[100%] mx-auto">
              <section>
                <h4 className="font-head font-semibold">Rating</h4>
                <div className="flex flex-col w-[100%] gap-2 mt-2">
                  <div className="flex gap-2">
                    <Rating
                      name="hover-feedback"
                      value={filter.rating}
                      max={4}
                      onChange={(event, newValue) =>
                        newValue && handleRating(newValue)
                      }
                    />
                    <p> & above</p>
                  </div>
                </div>
              </section>
              <section>
                <h4 className="font-head font-semibold">Price</h4>
                <div className="w-[100%] mt-5">
                  <PriceSelector />
                </div>
              </section>
              <section className="block md:hidden">
                <h4 className="font-head font-semibold">Sorted by</h4>
                <div className="w-[100%] mt-3">
                  <SortedByBtn />
                </div>
              </section>
            </div>
            <div className="flex z-50">
              <Button
                color="success"
                variant="contained"
                fullWidth
                onClick={() => {
                  toggleDrawer(false)
                  handleFilterSubmit()
                }}
              >
                Filter
              </Button>
            </div>
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  )
}

// TODO: add filter by price
