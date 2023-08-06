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
      <div >
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
          name={name}
          {...props}
          className="py-2 mt-2 px-2 w-[100%] bg-white border-primary border-2 rounded-md focus:outline-none text-sm font-para"
        />
      </div>
    )
  })
)
