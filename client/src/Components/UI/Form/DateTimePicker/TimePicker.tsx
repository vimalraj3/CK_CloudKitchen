import { forwardRef, memo, useState } from "react";
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
      <div className="flex w-[100%] flex-col gap-1">
        <label htmlFor={name} className="font-head capitalize">
          {`${label || name}: `}
        </label>
        <input
          type="time"
          id={name}
          name={name}
          ref={ref}
          className="mt-2 w-[100%] rounded-md border-2 border-primary bg-white px-1 py-2"
          {...rest}
        />
      </div>
    );
  }),
);
