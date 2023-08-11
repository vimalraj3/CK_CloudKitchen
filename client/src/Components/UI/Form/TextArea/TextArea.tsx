import { forwardRef, memo } from "react";

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
        {label ||
          (name && (
            <label htmlFor={name} className="font-head capitalize">
              {`${label || name}: `}
            </label>
          ))}
        <textarea
          className="w-[100%] rounded-md border-2 border-primary bg-white px-2 py-2 font-para text-sm focus:outline-none"
          id={name}
          ref={ref}
          name={name}
          {...rest}
        />
      </div>
    );
  }),
);
