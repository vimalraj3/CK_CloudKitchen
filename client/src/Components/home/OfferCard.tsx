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
    image: 'https://res.cloudinary.com/dd39ktpmz/image/upload/v1685954177/ck/client_static/dbwrrfkvkhwwxlqzbuhi.avif',
    bgc: '#EEF5E4',
  },
  {
    title: 'Pizza',
    offer: 20,
    image: 'https://res.cloudinary.com/dd39ktpmz/image/upload/v1685954177/ck/client_static/eh4xjrbveum2a9u0x59w.avif',
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
              className={`w-[100%] md:w-[50%] max-w-[600px] my-5 mx-5 px-2 py-5 md:py-4 md:px-8 aspect-[4/3] md:aspect-[16/9] rounded-lg flex flex-col-reverse md:flex-row justify-between items-center`}
              style={{
                backgroundColor: bgc,
              }}
            >
              <section className="mt-3 md:mt-0 flex flex-col items-center md:block w-[60%]">
                <div>
                  <p className='text-sm'>Sale</p>
                  <span className="font-head text-[1rem] md:text-[1.4rem] font-[400] underline-curve">
                    {offer + '  % Off '}
                  </span>
                </div>

                <h2 className="font-head font-[600] text-[1.5rem] md:text-[2rem] mt-3">
                  {title}
                </h2>

                <div className="flex items-center cursor-pointer w-[100%] categoryBtn">
                  <p className="font-para md:text-[.7rem] lg:text-[1rem]  ">
                    Shop by category
                  </p>
                  <i className="fa-solid fa-arrow-right animateArrow text-[#ff7e8b]"></i>
                </div>
              </section>
              <section>
                <img src={image} alt={title} width={'100%'} height={'100%'} />
              </section>
            </div >
          )
        }
      )}
    </section >
  )
}

export default OfferCard
