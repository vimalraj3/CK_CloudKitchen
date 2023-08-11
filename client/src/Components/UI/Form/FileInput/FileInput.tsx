import { forwardRef, memo } from "react";
import { useFormContext, Controller } from "react-hook-form";
type FileInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string;
};

export const FileInput = memo(
  forwardRef<HTMLInputElement, FileInputProps>((props, ref) => {
    const { name, label, ...rest } = props;
    return (
      <div>
        <label htmlFor={name} className="font-head capitalize">
          {`${label || name}: `}
        </label>
        <input
          type="file"
          id={name}
          ref={ref}
          name={name}
          className="mt-2 w-[100%] rounded-md border-2 border-primary bg-white px-2 py-2 font-para text-sm focus:outline-none"
          {...rest}
        />
      </div>
    );
  }),
);
