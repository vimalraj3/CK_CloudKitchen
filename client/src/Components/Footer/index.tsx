import darkLogo from "../../assets/logos/darkLogo.png";
import Container from "../Container";
import { Social, SocialIcon } from "../UI/Social";
import { Divider } from "../UI/Divider";
import { Link, useNavigate } from "react-router-dom";

const socialData = [
  {
    url: "https://github.com/vimal-oneway",
    icon: <i className="fa-brands fa-github"></i>,
  },
  {
    url: "https://www.linkedin.com/in/vimal-raj-r-webie/",
    icon: <i className="fa-brands fa-linkedin-in"></i>,
  },
  {
    url: "mailto:vimalic555@gmail.com",
    icon: <i className="fa-regular fa-envelope"></i>,
  },
];

function index() {
  const navigate = useNavigate();
  return (
    <Container bgColor="#f8f8f8">
      <div className="flex w-full flex-col items-center justify-center gap-2 md:flex-row md:justify-between md:gap-0">
        <div
          className="w-[75px] cursor-pointer"
          onClick={() => {
            navigate(`/`);
          }}
        >
          <img src={darkLogo} alt="CK_Logo" width={"100%"} />
        </div>
        {/* <div className="flex flex-col justify-center items-center gap-2 my-1 md:gap-0 md:my-0">
          {
            footerLinks.map((v, i) => {
              return <div className='underline' key={useId()}>
                <NavLink to={v.to}>{v.name}</NavLink>
              </div>
            })
          }
        </div> */}
        <Social>
          {socialData.map(({ url, icon }, i) => {
            return (
              <SocialIcon url={url} key={i}>
                {icon}
              </SocialIcon>
            );
          })}
        </Social>
      </div>

      <Divider margin="1rem" color="#ff7e8b" size="2px" />

      <p className="mt-3 text-center text-[#9c9c9c]">
        {`This fake website is make by `}
        <Link to={"https://github.com/vimal-oneway"}>
          <span className="cursor-pointer text-[#c85656] underline">{`vimal-oneway❤️`}</span>
        </Link>
      </p>
    </Container>
  );
}

export default index;
