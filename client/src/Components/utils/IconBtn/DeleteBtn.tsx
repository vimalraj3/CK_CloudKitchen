import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material'
import { memo } from 'react'

export const DeleteBtn = memo(
    () => {
        return (
            <IconButton aria-label="delete" size="small">
                <DeleteIcon fontSize='small' className='cursor-pointer' sx={{
                    color: (theme) => theme.palette.error.light
                }} />
            </IconButton>
        )
    }
)