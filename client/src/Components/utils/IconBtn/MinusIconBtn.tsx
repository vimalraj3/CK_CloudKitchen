import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton } from '@mui/material'
import { memo } from 'react'

export const MinusIconBtn = memo(
    () => {
        return (
            <IconButton aria-label="delete" size="small">
                <RemoveIcon fontSize='small' className='cursor-pointer' />
            </IconButton>
        )
    }
)