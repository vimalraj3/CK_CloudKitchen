import React, { Children, useCallback } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Rating from "@mui/material/Rating";
import { Button, Divider } from "@mui/material";
import { PriceSelector } from "../../../UI/Form/PriceSelector/PriceSelector";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { SortedByBtn } from "../SortedBy/SortedBy";
import { getAllFoods, setFilter } from "../../../../state/slices/food.slice";
export const FilterDrawer = () => {
  const anchor = "right";

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  const toggleDrawer = (open: boolean) => {
    setState({ ...state, [anchor]: open });
  };

  const dispatch = useAppDispatch();

  const handleFilterSubmit = () => {
    console.log("closing");
    // console.log(filter, 'filter', 'submitted', sortedBy, 'sortedBy')
    dispatch(getAllFoods());
  };

  const filter = useAppSelector((state) => state.foodState.filter);

  const handleRating = async (value: number) => {
    await dispatch(
      setFilter({
        ...filter,
        rating: value,
      }),
    );
  };

  return (
    <div className="w-[100%]">
      <React.Fragment key={anchor}>
        <Button
          variant="outlined"
          size={"large"}
          onClick={() => toggleDrawer(true)}
          sx={{
            color: "#ff7e8b",
            borderColor: "#ff7e8b",
            ":hover": {
              borderColor: "#ff7e8b",
            },
          }}
          fullWidth
        >
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-arrow-up-wide-short"></i>
            Filter
          </div>
        </Button>
        <div onClick={() => toggleDrawer(true)}></div>
        <SwipeableDrawer
          anchor={anchor}
          open={state[anchor]}
          onClose={() => {
            toggleDrawer(false);
            handleFilterSubmit();
          }}
          onOpen={() => toggleDrawer(true)}
          disableBackdropTransition={false}
        >
          <div className="mx-auto flex h-[100%] w-[100%] flex-col justify-between px-4 py-6 font-para">
            <div className="mx-auto flex w-[100%] flex-col gap-6">
              <section>
                <h4 className="font-head font-semibold">Rating</h4>
                <div className="mt-2 flex w-[100%] flex-col gap-2">
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
                <div className="mt-5 w-[100%]">
                  <PriceSelector />
                </div>
              </section>
              <section className="block md:hidden">
                <h4 className="font-head font-semibold">Sorted by</h4>
                <div className="mt-3 w-[100%]">
                  <SortedByBtn />
                </div>
              </section>
            </div>
            <div className="z-50 flex">
              <Button
                color="success"
                variant="contained"
                fullWidth
                onClick={() => {
                  toggleDrawer(false);
                  handleFilterSubmit();
                }}
              >
                Filter
              </Button>
            </div>
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
};

// TODO: add filter by price
