import React from 'react'
import { Btn } from '../../Btn'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { useSearch } from '../../../../hooks/useSearch';
interface Props {
    handleChange: (value: string, isMin: boolean) => void
    minValue: number
    maxValue: number
}

export const PriceSelector: React.FC<Props> = (props) => {
    return (
        <form className='flex justify-between gap-5 flex-col'>
            <FormControl fullWidth >
                <InputLabel htmlFor="min">Min</InputLabel>
                <OutlinedInput
                    defaultValue={0}
                    value={props.minValue}
                    id="min"
                    startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                    label="min"
                    onChange={(e) => {
                        props.handleChange(e.target.value, true); console.log(e.target.value)
                    }}
                    name='price[min]'
                />
            </FormControl>
            <FormControl fullWidth  >
                <InputLabel htmlFor="max">Max</InputLabel>
                <OutlinedInput
                    value={props.maxValue}
                    defaultValue={0}
                    id="max"
                    name='price[max]'
                    startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                    label="max"
                    onChange={(e) => { props.handleChange(e.target.value, false) }}
                />
            </FormControl>
        </form>
    )
}
