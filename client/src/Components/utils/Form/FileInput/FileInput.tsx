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
                    className="py-2 mt-2 px-2 w-[100%] bg-white border-primary border-2 rounded-md focus:outline-none text-sm font-para"
                    {...rest}
                />
            </div>
        );
    })
);