interface ICardContianerProps {
  children: React.ReactNode;
  title?: string;
}

export const CardContianer: React.FC<ICardContianerProps> = ({
  title,
  children,
}) => {
  return (
    <div className="mt-5">
      <h3 className="font-head font-bold md:text-xl">{title}</h3>
      <div
        className="mt-3rounded-md mt-2 w-[100%] border-2 border-[#f1eeee] px-4 py-6 shadow-sm"
        key={title}
      >
        {children}
      </div>
    </div>
  );
};
