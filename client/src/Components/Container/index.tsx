import { useId } from "react";

interface Props {
  children: React.ReactNode;
  bgColor?: string;
  mt?: number;
}

const defaultProps: Props = {
  children: <></>,
  bgColor: "#ffffff",
  mt: 10,
};

function Container({ children, bgColor, mt }: Props) {
  const props: Props = {
    ...defaultProps,
    children,
    bgColor: bgColor ?? defaultProps.bgColor,
    mt: 10,
  };

  return (
    <div
      className={`w-[100%] bg-[${props.bgColor}] mt-7 md:mt-10`}
      key={useId()}
    >
      <div className="mx-auto w-[90%] max-w-[1200px] py-4 md:px-[2rem]">
        {children}
      </div>
    </div>
  );
}

export default Container;
