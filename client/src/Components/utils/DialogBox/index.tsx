import * as React from 'react'
import Button from '@mui/material/Button'

import DialogContent from '@mui/material/DialogContent'

import { DialogBoxCust, DialogBoxCustTitle } from './DialogBoxCust'
import { DialogActions, Divider } from '@mui/material'

interface IProps {
  open: boolean
  setOpen: (open: boolean) => void
  title: string
  children: React.ReactNode
  cancelBtnText?: string
  successBtnText?: string
  btns?: boolean
}
export const DialogBox: React.FC<IProps> = React.memo(
  ({ open, setOpen, title, children, cancelBtnText = "Cancel", successBtnText = "confirm", btns = true }) => {
    // const [isOpen, setIsOpen] = React.useState(open || false)

    const handleClose = () => {
      setOpen(false)
    }

    return (
      <div>
        <DialogBoxCust
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogBoxCustTitle
            id={title}
            onClose={handleClose}
          >
            <p className='font-head textlg'>
              {title}
            </p>
          </DialogBoxCustTitle>
          <Divider />
          <DialogContent >
            {children}
          </DialogContent>
          {
            btns &&
            <>
              <Divider />
              <DialogActions className='mt-2 gap-1'>
                <Button variant='outlined' sx={{
                  color: (theme) => theme.palette.error.main,
                  borderColor: (theme) => theme.palette.error.dark,
                }} >{cancelBtnText}</Button>
                <Button variant='outlined' sx={{
                  color: (theme) => theme.palette.success.main,
                  borderColor: (theme) => theme.palette.success.dark,
                }}  >{successBtnText}</Button>
              </DialogActions>
            </>

          }
        </DialogBoxCust>
      </div>
    )
  }

)

// TODO customize the cancel and confirm buttons 
