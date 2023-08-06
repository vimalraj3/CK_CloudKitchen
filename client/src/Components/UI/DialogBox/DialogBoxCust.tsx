import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'

export interface DialogTitleProps {
    id: string
    children?: React.ReactNode
    onClose: () => void
}

export const DialogBoxCust = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(1),
        minWidth: '250px',
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}))

export const DialogBoxCustTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other} >
            <div className="flex items-center justify-between">
                {children}
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </IconButton>
                ) : null}
            </div>
        </DialogTitle>
    )
}
