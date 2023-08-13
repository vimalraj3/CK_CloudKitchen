import { useState, forwardRef, memo } from "react";

type InputProps = {
  label?: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const PasswordInput = memo(
  forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { name, label } = props;
    const [visible, setVisible] = useState<boolean>(false);
    return (
      <div>
        <label htmlFor={name} className="mt-2 font-head capitalize">
          {label ? label : name}
        </label>
        <div className="mt-2 flex  w-[100%] items-center justify-between rounded-md border border-primary bg-white px-2 py-2 ">
          <input
            type={visible ? "text" : "password"}
            id={name}
            className="w-[90%] bg-white font-para text-sm focus:outline-none"
            placeholder={`Enter your ${
              name === "repassword" ? "confrim password" : name
            }`}
            ref={ref}
            {...props}
          />
          <div
            className="bg-white px-2 font-para"
            onClick={() => setVisible(!visible)}
            role={"button"}
          >
            {visible ? (
              <i className="fa-solid fa-eye-slash text-primary"></i>
            ) : (
              <i className="fa-solid fa-eye text-primary"></i>
            )}
          </div>
        </div>
      </div>
    );
  }),
);
