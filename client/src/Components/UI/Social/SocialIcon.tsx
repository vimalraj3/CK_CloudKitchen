import { Link } from "react-router-dom";
interface SocialIcon {
    children: React.ReactNode;
    url: string;
    fontColor?: string;
    fontSize?: string;
    hoverFontColor?: string;
}

export const SocialIcon: React.FC<SocialIcon> = (
    {
        url,
        fontColor = "#000",
        fontSize = "1rem",
        hoverFontColor = "#ff7e8b",
        children
    }) => {
    return (
        <Link to={url}>
            <div className={`text-[${fontColor}] hover:text-[${hoverFontColor}]  transition-colors bg-[#fff] py-1 px-1.5 aspect-square rounded-md flex justify-center items-center shadow-md`}>
                {children}
            </div>
        </Link>
    )
}

