import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useState, forwardRef, memo } from 'react'

type InputProps = {
  label?: string
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export const PasswordInput = memo(
  forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { name, label } = props
    const [visible, setVisible] = useState<boolean>(false)
    return (
      <div>
        <label htmlFor={name} className="capitalize mt-2 font-head">
          {label ? label : name}
        </label>
        <div className="w-[100%] flex  border-[#9c9c9c] border-2 rounded-md bg-[#f8f8f8] justify-between items-center mt-2 py-2 px-2 ">
          <input
            type={visible ? 'text' : 'password'}
            id={name}
            className="bg-[#f8f8f8] w-[90%] focus:outline-none text-sm font-para"
            placeholder={`Enter your ${
              name === 'repassword' ? 'confrim password' : name
            }`}
            ref={ref}
            {...props}
          />
          <button
            className="px-2 font-para bg-[#f8f8f8]"
            onClick={() => setVisible(!visible)}
          >
            {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </button>
        </div>
      </div>
    )
  })
)
