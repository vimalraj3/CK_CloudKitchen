interface ISocialConProps {
    children: React.ReactNode;
    title?: string;
    subTitle?: string;
}
export const SocialCon: React.FC<ISocialConProps> = ({ children, title = "Social links", subTitle = "Feel free to contact" }: ISocialConProps) => {
    return (
        <div className="flex gap-2 flex-col items-center">
            <div className="text-center">
                <h3 className="font-montserrat font-[600] text-xl">{title}</h3>
                <h3 className="font-montserrat font-[400] text-sm text-[#9c9c9c]">{subTitle}</h3>
            </div>
            <div className="flex gap-4">
                {children}
            </div>
        </div>
    )
}