import { SearchBar } from "../Nav/SearchBar";
import Nav from "../Nav";
function Hero() {
  return (
    <>
      <div className="relative h-[60vh] w-[100%]">
        <div
          className={`absolute -z-30 h-[100%] w-[100%] bg-[url('https://res.cloudinary.com/dd39ktpmz/image/upload/v1687148289/u22kz56pi6e2g4oyu00b.avif')] bg-cover bg-no-repeat text-[#fff]`}
        ></div>
        <div className="mx-auto  h-[100%] w-[100%] max-w-[1200px]">
          <Nav />
          <div className="mx-auto flex h-[80%] w-[100%] flex-col items-center justify-center ">
            <div className="mb-2 flex">
              <h2 className="font-cardo text-4xl font-[700] text-[#fff] md:text-6xl lg:text-7xl">
                Cloud
              </h2>
              <h2 className="font-cardo ml-2 text-4xl font-[700] text-[#ff7e8b] md:ml-5 md:text-6xl lg:ml-6 lg:text-7xl">
                Kitchen
              </h2>
            </div>
            <SearchBar />
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
