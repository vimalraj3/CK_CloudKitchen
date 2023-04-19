import darkLogo from '../../assets/logos/darkLogo.png'
import Container from '../Container';
import { Social, SocialIcon } from '../utils/Social';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import { Divider } from '../utils/Divider'
import { Link } from 'react-router-dom';

const socialData = [
  {
    url: 'https://github.com/vimal-oneway',
    icon: <GitHubIcon />
  },
  {
    url: 'https://www.linkedin.com/in/vimal-raj-r-webie/',
    icon: <LinkedInIcon />
  },
  {
    url: 'mailto:vimalic555@gmail.com',
    icon: <EmailIcon />
  }
]

function index() {
  return (
    <Container bgColor='#f8f8f8'>
      <div className="flex justify-between items-center">
        <div className="w-[75px]">
          <img src={darkLogo} alt="" width={"100%"} />
        </div>
        <Social>
          {
            socialData.map(({ url, icon }, i) => {
              return <SocialIcon url={url} key={i}>
                {icon}
              </SocialIcon>
            })
          }
        </Social>
      </div>

      <Divider margin='1rem' color='#ff7e8b' size='2px' />

      <p className='text-center mt-3 text-[#9c9c9c]'>{`This website is make by `}
        <Link to={'https://github.com/vimal-oneway'}>
          <span className='text-[#c85656] underline cursor-pointer'>{`vimal-oneway❤️`}</span>
        </Link>
      </p>
    </Container >
  );
}

export default index;
