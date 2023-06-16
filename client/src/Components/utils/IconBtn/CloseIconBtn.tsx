import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material'
import { memo } from 'react'

export const CloseIconBtn = memo(
    ({ className }: { className?: string }) => {
        return (
            <IconButton aria-label="Close" size="small">
                <CloseIcon fontSize='small' className={`cursor-pointer ${className || ""}`} />
            </IconButton>
        )
    }
)