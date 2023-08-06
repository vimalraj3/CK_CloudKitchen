import { IconButton } from '@mui/material'
import { memo } from 'react'

export const DeleteBtn = memo(
    () => {
        return (
            <IconButton aria-label="delete" size="small">
                <i className="fa-solid fa-trash text-red-400"></i>
            </IconButton>
        )
    }
)