interface BtnFuns {
  className?: string;
  styles?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  types?: "success" | "error" | "warning";
  type?: "button" | "submit" | "reset" | undefined;
}

interface BtnProps extends BtnFuns {
  label: string;
}

interface BtnsProps extends BtnFuns {
  labelArr: string[];
}

export const Btn: React.FC<BtnProps> = ({
  label,
  styles,
  className,
  onClick,
  types,
  type = "button",
}) => {
  const btnType = types || "success";
  return (
    <button
      onClick={onClick}
      type={type}
      className="text-md rounded-md border-2 border-[#9c9c9c] bg-secondary px-2 py-2 font-para focus:outline-none"
    >
      {label}
    </button>
  );
};

export const Btns: React.FC<BtnsProps> = ({
  labelArr,
  styles,
  className,
  onClick,
}) => {
  return (
    <>
      <div className="flex items-center gap-3">
        {labelArr.map((v, i) => {
          return (
            <button
              key={i}
              onClick={onClick}
              className="rounded-md border-2 border-[#9c9c9c] bg-secondary px-2 py-2 font-para text-sm focus:outline-none"
            >
              {v}
            </button>
          );
        })}
      </div>
    </>
  );
};
