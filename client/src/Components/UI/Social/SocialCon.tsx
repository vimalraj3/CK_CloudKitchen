interface ISocialConProps {
  children: React.ReactNode;
  title?: string;
  subTitle?: string;
}
export const SocialCon: React.FC<ISocialConProps> = ({
  children,
  title = "Social links",
  subTitle = "Feel free to contact",
}: ISocialConProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-center">
        <h3 className="font-montserrat text-xl font-[600]">{title}</h3>
        <h3 className="font-montserrat text-sm font-[400] text-[#9c9c9c]">
          {subTitle}
        </h3>
      </div>
      <div className="flex gap-4">{children}</div>
    </div>
  );
};
