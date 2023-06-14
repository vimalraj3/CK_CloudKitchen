import React, { Children, useCallback } from 'react'
import { Drawer } from './Drawer'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Btn } from './../Btn'
import { useSearch } from '../../../hooks/useSearch';
import { Input } from '../Form';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { Button, Divider } from '@mui/material';
import { PriceSelector } from '../Form/PriceSelector/PriceSelector';
import { TickCheckbox } from '../Form/Checkbox/Checkbox';
import { flif } from '@cloudinary/url-gen/qualifiers/format';

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

    const { handleRating, ratingValue, handleFilterSubmit } = useSearch()


    const [rating, setRating] = React.useState(0)
    const [minValue, setMinValue] = React.useState(0)
    const [maxValue, setMaxValue] = React.useState(0)


    const handlePrice = useCallback((value: string, isMin: boolean) => {
        isMin ?
            setMinValue(parseInt(value))
            :
            setMaxValue(parseInt(value))
    }, [])

    const toggleDrawer =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event &&
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };
    return (
        <div>
            <div>
                <React.Fragment key={anchor}>
                    <Btn label={"Filter"} onClick={toggleDrawer(true)} />
                    <div onClick={toggleDrawer(true)}>
                    </div>
                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(false)}
                        onOpen={toggleDrawer(true)}
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
                                                value={rating}
                                                precision={0.5}
                                                max={4}
                                                onChange={(event, newValue) => {
                                                    if (newValue) {
                                                        console.log(newValue, 'new value ratng');
                                                        setRating(newValue);
                                                    }
                                                }}
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
                                        <PriceSelector handleChange={handlePrice} minValue={minValue} maxValue={maxValue} />
                                    </div>
                                </section>
                            </div>
                            <div className="flex gap-5 z-50">
                                <div className="w-[50%]">
                                    <Button color='error' variant='outlined' fullWidth onClick={toggleDrawer(false)}>
                                        Cancel
                                    </Button>
                                </div>
                                <div className="w-[50%]">
                                    <Button color='success' variant='contained' fullWidth onClick={() => {
                                        toggleDrawer(false)
                                        handleFilterSubmit({
                                            rating: rating,
                                            price: {
                                                min: minValue
                                                ,
                                                max: maxValue
                                            }
                                        })
                                    }}>
                                        confirm
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </SwipeableDrawer>
                </React.Fragment>
            </div>
        </div>
    )
}


// TODO customized the filter btns