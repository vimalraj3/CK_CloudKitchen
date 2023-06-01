import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import { Typography } from '@mui/material'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

interface IDialogBox {
  isOpen: boolean
  imgSrc: string | undefined
  title: string
}

export default function DialogBox({ isOpen, imgSrc, title }: IDialogBox) {
  const [open, setOpen] = React.useState(isOpen)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          sx={{
            fontFamily: 'Montserrat',
          }}
        >
          {title}
        </DialogTitle>
        <DialogContent>
          {imgSrc ? (
            <img
              className="rounded-sm"
              src={imgSrc}
              loading="lazy"
              alt="Product_img"
              width={'100%'}
              height={'100%'}
            />
          ) : (
            <Typography>{'Unable to upload the image'}</Typography>
          )}
        </DialogContent>
        <DialogActions
          sx={{
            padding: ' 0 1rem 1rem 1rem',
          }}
        >
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
