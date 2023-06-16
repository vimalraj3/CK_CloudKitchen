import React from 'react'
import { IconButton } from '@mui/material'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const SearchIconBtn: React.FC<Props> = (props) => {
    return (
        <IconButton aria-label="delete" size="small" onClick={props.handleClick}>
            <i className="fa-solid fa-magnifying-glass"></i>
        </IconButton>
    )
}


