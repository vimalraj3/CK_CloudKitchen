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
        <div className="w-[100%] flex  border-primary border-2 rounded-md bg-white justify-between items-center mt-2 py-2 px-2 ">
          <input
            type={visible ? 'text' : 'password'}
            id={name}
            className="bg-white w-[90%] focus:outline-none text-sm font-para"
            placeholder={`Enter your ${name === 'repassword' ? 'confrim password' : name
              }`}
            ref={ref}
            {...props}
          />
          <button
            className="px-2 font-para bg-white"
            onClick={() => setVisible(!visible)}
          >
            {visible ? <i className="fa-solid fa-eye-slash text-primary"></i> : <i className="fa-solid fa-eye text-primary"></i>}
          </button>
        </div>
      </div>
    )
  })
)
