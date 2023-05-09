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
      <p className="text-[#9c9c9c] font-bold">{title}</p>
      <div className="mt-2 w-[100%] px-4 py-6 mt-3rounded-md border-2 border-[#f1eeee] shadow-sm">
        {children}
      </div>
    </div>
  )
}
