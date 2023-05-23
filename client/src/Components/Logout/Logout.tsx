import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import { useAppDispatch } from '../../hooks'

interface DialogBoxProps {
  children: React.ReactNode
}

interface LogoutProps extends DialogBoxProps {}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const DialogBox: React.FC<DialogBoxProps> = ({ children }) => {
  const [open, setOpen] = React.useState<boolean>(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleConfirm = async () => {
    setOpen(false)
  }

  return (
    <div>
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        {children}
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="Logout dialog"
      >
        <DialogTitle
          sx={{
            fontFamily: 'poppins',
          }}
        >
          {`Logout`}
        </DialogTitle>
        <DialogContent>
          <p className="text-md font-bold font-head text-red-300">
            Confirm to logout
          </p>
        </DialogContent>
        <DialogActions
          sx={{
            padding: ' 0 1rem 1rem 1rem',
          }}
        >
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            sx={{
              bgcolor: '#ff7e8b',
              ':hover': {
                bgcolor: '#ff7e8b',
              },
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export const Logout: React.FC<LogoutProps> = ({ children }) => {
  return (
    <div>
      <DialogBox>{children}</DialogBox>
    </div>
  )
}
