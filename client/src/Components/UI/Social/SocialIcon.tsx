import { Link } from "react-router-dom";
interface SocialIcon {
  children: React.ReactNode;
  url: string;
  fontColor?: string;
  fontSize?: string;
  hoverFontColor?: string;
}

export const SocialIcon: React.FC<SocialIcon> = ({
  url,
  fontColor = "#000",
  fontSize = "1rem",
  hoverFontColor = "#ff7e8b",
  children,
}) => {
  return (
    <Link to={url}>
      <div
        className={`text-[${fontColor}] hover:text-[${hoverFontColor}]  flex aspect-square items-center justify-center rounded-md bg-[#fff] px-1.5 py-1 shadow-md transition-colors`}
      >
        {children}
      </div>
    </Link>
  );
};
