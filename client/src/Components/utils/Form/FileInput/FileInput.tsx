import { forwardRef, memo } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
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
                <label htmlFor={name} className="capitalize font-head">
                    {`${label || name}: `}
                </label>
                <input
                    type="file"
                    id={name}
                    ref={ref}
                    name={name}
                    className="py-2 mt-1 px-2 w-[100%] bg-[#f8f8f8] border-[#9c9c9c] border-2 rounded-md focus:outline-none text-sm font-para"
                    {...rest}
                />
            </div>
        );
    })
);