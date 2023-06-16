import React, { Children, useCallback } from 'react'
import { Drawer } from './Drawer'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Btn } from './../Btn'
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { Button, Divider } from '@mui/material';
import { PriceSelector } from '../Form/PriceSelector/PriceSelector';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setFilter } from '../../../state/slices/FilterAndSearch.slice';
import TuneIcon from '@mui/icons-material/Tune';
export const FilterDrawer = () => {
    const anchor = 'right'

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const iOS =
        typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

    const { filter, search, sortedBy } = useAppSelector(state => state.filterAndSearchState)
    const dispatch = useAppDispatch()


    const toggleDrawer = (open: boolean) => {
        setState({ ...state, [anchor]: open });
    };


    const handleFilterSubmit = () => {
        console.log('closing');

        console.log(filter, 'filter', 'submitted', sortedBy, 'sortedBy')
    }

    const handleRating = (value: number) => {
        dispatch(
            setFilter({
                ...filter,
                rating: value,
            })
        )
    }

    return (
        <div>
            <div>
                <React.Fragment key={anchor}>
                    <Button variant='outlined' size={'large'} onClick={() => toggleDrawer(true)} sx={{
                        color: '#ff7e8b',
                        borderColor: '#ff7e8b',
                        ":hover": {
                            borderColor: '#ff7e8b',
                        }
                    }} >
                        <div className='flex gap-2 items-center'>
                            <TuneIcon />
                            Filter
                        </div>
                    </Button>
                    <div onClick={() => toggleDrawer(true)}>
                    </div>
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
                            <div className='flex flex-col gap-6 w-[100%] mx-auto'>
                                <section>
                                    <h4 className='font-head font-semibold'>
                                        Rating
                                    </h4>
                                    <div className='flex flex-col w-[100%] gap-2 mt-2'>
                                        <div className="flex gap-2">
                                            <Rating
                                                name="hover-feedback"
                                                value={filter.rating}
                                                max={4}
                                                onChange={(event, newValue) => (newValue) && handleRating(newValue)}
                                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                            />
                                            <p> & above</p>
                                        </div>
                                    </div>
                                </section>
                                <section>
                                    <h4 className='font-head font-semibold'>
                                        Price
                                    </h4>
                                    <div className='w-[100%] mt-5'>
                                        <PriceSelector />
                                    </div>
                                </section>
                            </div>
                            <div className="flex z-50">
                                <Button color='success' variant='contained' fullWidth onClick={() => {
                                    toggleDrawer(false)
                                    handleFilterSubmit()
                                }}>
                                    Filter
                                </Button>
                            </div>
                        </div>
                    </SwipeableDrawer>
                </React.Fragment>
            </div>
        </div>
    )
}


// TODO customized the filter btns