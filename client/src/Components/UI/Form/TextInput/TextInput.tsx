import { forwardRef, memo } from "react";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string;
};

export const Input = memo(
  forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { name, role, label } = props;

    return (
      <div>
        {role == "button" ? (
          <></>
        ) : (
          <>
            <label htmlFor={name} className="font-head capitalize">
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
          className="mt-2 w-[100%] rounded-md border border-primary bg-white px-2 py-2 font-para text-sm focus:outline-none"
        />
      </div>
    );
  }),
);
