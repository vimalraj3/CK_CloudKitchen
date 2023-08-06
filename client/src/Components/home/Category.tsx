import { useCallback, useState } from 'react'
import { useScroll } from '../../hooks/useScroll'
import { useAppDispatch } from '../../hooks'
import { getAllFoods, setSearch } from '../../state/slices/food.slice'
interface ICategoryData {
  image: string
  name: string
}

interface IArrow {
  cardPointer: number
  setPointer: (cardPointer: number) => void
}

const categoryData: ICategoryData[] = [
  {
    image:
      'https://res.cloudinary.com/dd39ktpmz/image/upload/v1685954417/ck/client_static/wo5fduzjhxmgxjnepubt.avif',
    name: 'Biriyani',
  },
  {
    image:
      'https://res.cloudinary.com/dd39ktpmz/image/upload/v1685954177/ck/client_static/dbwrrfkvkhwwxlqzbuhi.avif',
    name: 'Dosa',
  },
  {
    image:
      'https://res.cloudinary.com/dd39ktpmz/image/upload/v1685954176/ck/client_static/aw2pq8ovtfadnrndiv7y.avif',
    name: 'Fired Rice',
  },
  {
    image:
      'https://res.cloudinary.com/dd39ktpmz/image/upload/v1685954176/ck/client_static/hj62uq38p4albzjle9s5.avif',
    name: 'Thali',
  },
  {
    image:
      'https://res.cloudinary.com/dd39ktpmz/image/upload/v1685954176/ck/client_static/pef7cy10s4bt2oqk5e3t.avif',
    name: 'Noodles',
  },
  {
    image:
      'https://res.cloudinary.com/dd39ktpmz/image/upload/v1685954176/ck/client_static/hbambl5svg5d0kbihkbp.avif',
    name: 'Paneer',
  },
  {
    image:
      'https://res.cloudinary.com/dd39ktpmz/image/upload/v1685954177/ck/client_static/eh4xjrbveum2a9u0x59w.avif',
    name: 'Pizza',
  },
  {
    image:
      'https://res.cloudinary.com/dd39ktpmz/image/upload/v1685954552/ck/client_static/xat79gdpdesnyzqzay7d.png',
    name: 'Cake',
  },

  {
    image:
      'https://res.cloudinary.com/dd39ktpmz/image/upload/v1685954177/ck/client_static/wcveniokmrytgwa4ckev.avif',
    name: 'Rolls',
  },
  {
    image:
      'https://res.cloudinary.com/dd39ktpmz/image/upload/v1685954176/ck/client_static/ximkylkzfv4rtlphe3gx.avif',
    name: 'Shawarma',
  },
]

const LeftArrow: React.FC<IArrow> = ({ cardPointer, setPointer }) => {
  const handleBackward = () => {
    let content = document.getElementById('content')
    if (content) {
      content.scrollLeft -= 400
      setPointer((cardPointer -= 1))
    }
  }

  if (cardPointer != 0) {
    return (
      <div
        role="button"
        className="cursor-pointer absolute -left-[1.3rem] bg-[#fff] aspect-square w-[3rem] rounded-full text-[#fff] hidden md:flex justify-center items-center z-30"
        onClick={handleBackward}
        aria-label="Move Backward"
      >
        <i className="fa-solid fa-arrow-left text-[#000]"></i>
      </div>
    )
  }
  return <></>
}

const RightArrow: React.FC<IArrow> = ({ cardPointer, setPointer }) => {
  const handleForward = () => {
    let content = document.getElementById('content')
    if (content) {
      content.scrollLeft += 400
      setPointer((cardPointer += 1))
    }
  }

  if (cardPointer != 6) {
    return (
      <div
        role="button"
        className="cursor-pointer absolute -right-[1.3rem] bg-[#fff] aspect-square w-[3rem] rounded-full text-[#fff] md:flex justify-center items-center z-30 hidden"
        onClick={handleForward}
        aria-label="Move forward"
      >
        <i className="fa-solid fa-arrow-right text-[#000]"></i>
      </div>
    )
  }
  return <></>
}

const CategoryTemp: React.FC<any> = () => {
  const [pointer, setPointer] = useState<number>(0)
  const [showMore, setShowMore] = useState<boolean>(false)

  const scrollTo = useScroll()
  const dispatch = useAppDispatch()
  const handleSearch = useCallback(
    (name: string) => {
      dispatch(setSearch(name))
      setTimeout(() => {
        dispatch(getAllFoods())
      }, 500)
      scrollTo('foods')
    },
    [dispatch, scrollTo]
  )

  return (
    <div className="bg-[#f8f8f8] w-[100%] h-[100%] ">
      <div className="w-[90%] md:w-[80%] max-w-[1200px] mx-auto">
        <section className=" md:py-[2rem] max-w-[1200px] md:mt-10 flex items-center relative ">
          <LeftArrow cardPointer={pointer} setPointer={setPointer} />
          <div
            id="content"
            className={`flex w-[100%] mx-auto justify-start flex-wrap md:flex-nowrap  scroll-smooth overflow-x-scroll snap-x scrollbar-hide md:h-[100%] ${
              showMore ? 'h-[100%]' : ' h-[14rem]'
            } overflow-hidden`}
          >
            {categoryData.map(({ image, name }: ICategoryData, i: number) => {
              return (
                <div
                  key={i}
                  className="md:min-w-[25%] w-[6rem] mt-3 px-2.5 aspect-square flex flex-col items-center md:snap-start cursor-pointer"
                  onClick={() => handleSearch(name)}
                >
                  <img
                    src={image}
                    alt={name + 'img'}
                    width={'100%'}
                    height={'100%'}
                    loading="lazy"
                  />
                  <p className="mt-2 text-lg">{name}</p>
                </div>
              )
            })}
          </div>
          <RightArrow cardPointer={pointer} setPointer={setPointer} />
        </section>
        <button
          onClick={() => {
            setShowMore(!showMore)
          }}
          className="bg-[#fff] w-[100%] border-1px my-3 py-1 rounded-md  md:hidden"
        >
          Show more
        </button>
      </div>
    </div>
  )
}

export default CategoryTemp
