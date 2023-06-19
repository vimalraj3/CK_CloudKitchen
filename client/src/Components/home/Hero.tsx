import { SearchBar } from '../Nav/SearchBar'
import Nav from '../Nav'
import { useAppSelector } from '../../hooks'
function Hero() {
  const { data } = useAppSelector((state) => state.userState)
  return (
    <>
      <div className="relative h-[60vh] w-[100%]">
        <div
          className={`w-[100%] text-[#fff] absolute h-[100%] -z-30 bg-[url('https://res.cloudinary.com/dd39ktpmz/image/upload/v1687148289/u22kz56pi6e2g4oyu00b.avif')] bg-no-repeat bg-cover`}
        ></div>
        <div className="w-[100%]  h-[100%] mx-auto max-w-[1200px]">
          <Nav />
          <div className="h-[80%] items-center flex-col w-[100%] mx-auto flex justify-center ">
            <div className="flex mb-2">
              <h2 className="font-cardo text-4xl md:text-6xl lg:text-7xl font-[700] text-[#fff]">
                Cloud
              </h2>
              <h2 className="font-cardo text-4xl md:text-6xl lg:text-7xl font-[700] text-[#ff7e8b] ml-2 md:ml-5 lg:ml-6">
                Kitchen
              </h2>
            </div>
            <SearchBar />
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero
