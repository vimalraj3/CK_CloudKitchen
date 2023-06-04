import { forwardRef, memo } from 'react';

type TextAreaProps = React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
> & {
    label?: string;
};

export const TextArea = memo(
    forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
        const { name, label, ...rest } = props;

        return (
            <div>
                <label htmlFor={name} className="capitalize font-head">
                    {`${label || name}: `}
                </label>
                <textarea
                    className="py-2 mt-1 px-2 w-[100%] bg-[#f8f8f8] border-[#9c9c9c] border-2 rounded-md focus:outline-none text-sm font-para"
                    id={name}
                    ref={ref}
                    name={name}
                    {...rest}
                />
            </div>
        );
    })
);
