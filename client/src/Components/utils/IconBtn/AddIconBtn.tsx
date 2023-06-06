import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material'
import { memo } from 'react'

export const AddIconBtn = memo(
    () => {
        return (
            <IconButton aria-label="delete" size="small">
                <AddIcon fontSize='small' className='cursor-pointer' />
            </IconButton>
        )
    }
)