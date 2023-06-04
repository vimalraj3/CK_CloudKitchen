import React from 'react'
import { DialogBox } from '../utils/DialogBox'
interface DialogBoxProps {
    open: boolean
    setOpen: (open: boolean) => void
    handleConfirm: () => void
}

export const LogoutDialogBox: React.FC<DialogBoxProps> = ({ open, setOpen, handleConfirm }) => {
    return (
        <div>
            <DialogBox open={open} setOpen={setOpen} title='Logout' handleConfirm={handleConfirm}>
                <p>Are you sure you want to logout</p>
            </DialogBox>
        </div>
    )
}
