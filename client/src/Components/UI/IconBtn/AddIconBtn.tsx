import { IconButton } from '@mui/material'
import { memo } from 'react'

export const AddIconBtn = memo(
    () => {
        return (
            <IconButton aria-label="delete" size="small">
                <i className="fa-solid fa-plus cursor-pointer"></i>
            </IconButton>
        )
    }
)