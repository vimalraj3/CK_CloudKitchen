import { forwardRef, memo } from 'react'

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string
}

export const Input = memo(
  forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { name, role, label } = props

    return (
      <div>
        {role == 'button' ? (
          <></>
        ) : (
          <>
            <label htmlFor={name} className="capitalize font-head">
              {`${label || name}: `}
            </label>
          </>
        )}
        <input
          id={name}
          placeholder={`Enter your ${label || name}`}
          ref={ref}
          {...props}
          className="py-2 mt-1 px-2 w-[100%] bg-[#f8f8f8] border-[#9c9c9c] border-2 rounded-md focus:outline-none text-sm font-para"
        />
      </div>
    )
  })
)
