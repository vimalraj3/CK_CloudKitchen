import { useAppDispatch } from "../../hooks";
import { useScroll } from "../../hooks/useScroll";
import { getAllFoods, setSearch } from "../../state/slices/food.slice";

interface IOfferCard {
  title: string;
  image: string;
  offer: number;
  bgc: string;
  searchFor: string;
}

const offerCardData: IOfferCard[] = [
  {
    title: "Dosa",
    offer: 20,
    image:
      "https://res.cloudinary.com/dd39ktpmz/image/upload/v1685954177/ck/client_static/dbwrrfkvkhwwxlqzbuhi.avif",
    bgc: "#EEF5E4",
    searchFor: "Dosa",
  },
  {
    title: "Pizza",
    offer: 20,
    image:
      "https://res.cloudinary.com/dd39ktpmz/image/upload/v1685954177/ck/client_static/eh4xjrbveum2a9u0x59w.avif",
    bgc: "#F9ECDE",
    searchFor: "Pizza",
  },
];

function OfferCard() {
  const dispatch = useAppDispatch();
  const scrollTo = useScroll();
  const handleSearch = (searchFor: string) => {
    dispatch(setSearch(searchFor));
    scrollTo("foods");
    setTimeout(() => {
      dispatch(getAllFoods());
    }, 200);
  };
  return (
    <section className="mx-auto mt-5 flex w-[90%] max-w-[1200px] flex-col items-center justify-evenly md:mt-10 md:flex-row">
      {offerCardData.map(
        ({ title, offer, image, bgc, searchFor }: IOfferCard, i: number) => {
          return (
            <div
              key={i}
              className={`mx-5 my-5 flex aspect-[4/3] w-[100%] max-w-[600px] flex-col-reverse items-center justify-between rounded-lg px-2 py-5 md:aspect-[16/9] md:w-[50%] md:flex-row md:px-8 md:py-4`}
              style={{
                backgroundColor: bgc,
              }}
            >
              <section className="mt-3 flex w-[60%] flex-col items-center md:mt-0 md:block">
                <div>
                  <p className="text-sm">Sale</p>
                  <span className="underline-curve font-head text-[1rem] font-[400] md:text-[1.4rem]">
                    {offer + "  % Off "}
                  </span>
                </div>

                <h2 className="mt-3 font-head text-[1.5rem] font-[600] md:text-[2rem]">
                  {title}
                </h2>

                <div
                  className="categoryBtn flex w-[100%] cursor-pointer items-center"
                  onClick={() => {
                    handleSearch(searchFor);
                  }}
                >
                  <p className="font-para md:text-[.7rem] lg:text-[1rem] ">
                    search for {searchFor}
                  </p>
                  <i className="fa-solid fa-arrow-right animateArrow text-[#ff7e8b]"></i>
                </div>
              </section>
              <section>
                <img src={image} alt={title} width={"100%"} height={"100%"} />
              </section>
            </div>
          );
        },
      )}
    </section>
  );
}

export default OfferCard;
