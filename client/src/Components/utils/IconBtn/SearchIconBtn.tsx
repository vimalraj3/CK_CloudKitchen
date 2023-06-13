import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const SearchIconBtn: React.FC<Props> = (props) => {
    return (
        <IconButton aria-label="delete" size="small" onClick={props.handleClick}>
            <SearchIcon fontSize='small' className='cursor-pointer' />
        </IconButton>
    )
}


