import React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { setPriceFilter } from '../../../../state/slices/restaurants.slice';

export const PriceSelector: React.FC = () => {
    const dispatch = useAppDispatch()
    const { filter } = useAppSelector(state => state.restaurantsState)

    const handleChangePrice =
        (value: string, isMin: boolean) => {
            dispatch(setPriceFilter({ value: parseInt(value), isMin }))
        }
    return (
        <form className='flex justify-between gap-5 flex-col'>
            <FormControl fullWidth key={"minPriceInput"} >
                <InputLabel htmlFor="min">Min</InputLabel>
                <OutlinedInput
                    value={filter.price.min}
                    id="min"
                    startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                    label="min"
                    onChange={(e) => {
                        handleChangePrice(e.target.value, true); console.log(e.target.value)
                    }}
                    name='price[min]'
                />
            </FormControl>
            <FormControl fullWidth  >
                <InputLabel htmlFor="max">Max</InputLabel>
                <OutlinedInput
                    value={filter.price.max}
                    id="max"
                    name='price[max]'
                    startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                    label="max"
                    onChange={(e) => { handleChangePrice(e.target.value, false) }}
                />
            </FormControl>
        </form>
    )
}
