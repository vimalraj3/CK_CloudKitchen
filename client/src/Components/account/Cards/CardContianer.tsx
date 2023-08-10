interface ICardContianerProps {
  children: React.ReactNode
  title?: string
}

export const CardContianer: React.FC<ICardContianerProps> = ({
  title,
  children,
}) => {
  return (
    <div className="mt-5">
      <h3 className="font-bold font-head md:text-xl">{title}</h3>
      <div className="mt-2 w-[100%] px-4 py-6 mt-3rounded-md border-2 border-[#f1eeee] shadow-sm" key={title}>
        {children}
      </div>
    </div>
  )
}
