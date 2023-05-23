import dosaImg from '../../assets/home/dosa.png'
import pizzaImg from '../../assets/home/pizza.png'
import { Typography } from '@mui/material'
import Underline from '../../assets/utils/underline.png'
interface IOfferCard {
  title: string
  image: string
  offer: number
  bgc: string
}

const offerCardData: IOfferCard[] = [
  {
    title: 'Dosa',
    offer: 20,
    image: dosaImg,
    bgc: '#EEF5E4',
  },
  {
    title: 'Pizza',
    offer: 20,
    image: pizzaImg,
    bgc: '#F9ECDE',
  },
]

function OfferCard() {
  return (
    <section className="w-[90%] mx-auto max-w-[1200px] mt-5 md:mt-10 flex justify-evenly items-center flex-col md:flex-row">
      {offerCardData.map(
        ({ title, offer, image, bgc }: IOfferCard, i: number) => {
          return (
            <div
              key={i}
              className={`w-[100%] md:w-[45%] max-w-[600px] my-5 px-2 py-3 md:py-4 md:px-8 aspect-[4/3] md:aspect-[16/9] rounded-lg flex flex-col-reverse  md:flex-row justify-between items-center`}
              style={{
                backgroundColor: bgc,
              }}
            >
              <section className="mt-3 md:mt-0 flex flex-col items-center md:block">
                <div>
                  <p className="font-cardo text-[1rem] md:text-[1.4rem] font-[400]">
                    {offer + '  % Off'}
                  </p>

                  <div className="md:flex  hidden">
                    <img src={Underline} alt="underline" />
                    <Typography
                      ml={1}
                      fontFamily={'montserrat'}
                      component={'p'}
                      fontSize={'.8rem'}
                      fontWeight={400}
                    >
                      Sale
                    </Typography>
                  </div>
                </div>

                <h2 className="font-montserrat font-[600] text-[1.5rem] md:text-[2rem]">
                  {title}
                </h2>

                <div className="flex justify-center items-center cursor-pointer  w-[100%] categoryBtn mt-2">
                  <p className="font-montserrat md:text-[.7rem] lg:text-[1rem]  ">
                    Shop by category
                  </p>
                  <i className="fa-solid fa-arrow-right animateArrow text-[#ff7e8b]"></i>
                </div>
              </section>
              <section className="md:w-[50%] w-[80%]">
                <img src={image} alt={title} width={'100%'} />
              </section>
            </div>
          )
        }
      )}
    </section>
  )
}

export default OfferCard
