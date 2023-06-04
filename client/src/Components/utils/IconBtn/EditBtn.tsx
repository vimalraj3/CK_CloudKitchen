import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { memo } from 'react'

export const EditBtn = memo(
    () => {
        return (
            <IconButton aria-label="delete" size="small">
                <EditIcon fontSize='small' className='cursor-pointer' />
            </IconButton>
        )
    }
)