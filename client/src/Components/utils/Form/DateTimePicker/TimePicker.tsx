import { forwardRef, memo, useState } from 'react';
// import TimePicker from 'rc-time-picker';
// import 'rc-time-picker/assets/index.css';
type TimePickerProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & {
    label?: string;
};

export const TimePicker = memo(
    forwardRef<HTMLInputElement, TimePickerProps>((props, ref) => {
        const { name, label, ...rest } = props;


        return (
            <div className='flex flex-col gap-1 w-[100%]'>
                <label htmlFor={name} className="capitalize font-head">
                    {`${label || name}: `}
                </label>
                <input type='time' id={name} name={name} ref={ref} className='py-2 px-1 bg-secondary border-gray-400 border-2 rounded-md w-[100%]' {...rest} />
            </div>
        );
    })
);
