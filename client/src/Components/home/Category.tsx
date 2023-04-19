import { useState } from 'react'
import cakeImg from "../../assets/home/cake.png"
import biriyaniImg from "../../assets/home/biriyani.png"
import dosaImg from "../../assets/home/dosa.png"
import firedriceImg from "../../assets/home/firedrice.png"
import noodlesImg from "../../assets/home/noodles.png"
import paneerImg from "../../assets/home/paneer.png"
import pizzaImg from "../../assets/home/pizza.png"
import rollsImg from "../../assets/home/rolls.png"
import shawarmaImg from "../../assets/home/shawarma.png"
import thaliImg from "../../assets/home/thali.png"

interface ICategoryData {
    image: string;
    name: string;
}

interface IArrow {
    cardPointer: number;
    setPointer: (cardPointer: number) => void;
}


const categoryData: ICategoryData[] = [
    {
        image: biriyaniImg,
        name: "Biriyani"
    },
    {
        image: dosaImg,
        name: "Dosa"
    },
    {
        image: firedriceImg,
        name: "Fired Rice"
    },
    {
        image: thaliImg,
        name: "Thali"
    },
    {
        image: noodlesImg,
        name: "Noodles"
    },
    {
        image: paneerImg,
        name: "Paneer"
    },
    {
        image: pizzaImg,
        name: "Pizza"
    },
    {
        image: cakeImg,
        name: "Cake"
    },

    {
        image: rollsImg,
        name: "Rolls"
    },
    {
        image: shawarmaImg,
        name: "Shawarma"
    },

]



const LeftArrow: React.FC<IArrow> = ({ cardPointer, setPointer }) => {

    const handleBackward = () => {
        let content = document.getElementById("content")
        if (content) {
            content.scrollLeft -= 400;
            setPointer(cardPointer -= 1)
        }
    }

    if (cardPointer != 0) {
        return (
            <div role="button" className="cursor-pointer absolute -left-[1.3rem] bg-[#fff] aspect-square w-[3rem] rounded-full text-[#fff] hidden md:flex justify-center items-center z-30" onClick={handleBackward}>
                <i className="fa-solid fa-arrow-left text-[#000]"></i>
            </div>
        )
    }
    return <></>
}


const RightArrow: React.FC<IArrow> = ({ cardPointer, setPointer }) => {

    const handleForward = () => {
        let content = document.getElementById("content")
        if (content) {
            content.scrollLeft += 400;
            setPointer(cardPointer += 1)
        }
    }

    if (cardPointer != 7) {
        return (
            <div role="button" className="cursor-pointer absolute -right-[1.3rem] bg-[#fff] aspect-square w-[3rem] rounded-full text-[#fff] md:flex justify-center items-center z-30 hidden" onClick={handleForward}>
                <i className="fa-solid fa-arrow-right text-[#000]"></i>
            </div>
        )
    }
    return <></>
}

const CategoryTemp: React.FC<any> = () => {
    const [pointer, setPointer] = useState<number>(0)
    const [showMore, setShowMore] = useState<boolean>(false)

    return (
        <div className="bg-[#f8f8f8] w-[100%] h-[100%] ">
            <div className="w-[90%] md:w-[80%] max-w-[1200px] mx-auto">
                <section className=' md:py-[2rem] max-w-[1200px] md:mt-10 flex items-center relative ' >
                    <LeftArrow cardPointer={pointer} setPointer={setPointer} />
                    <div id="content" className={`flex w-[100%] mx-auto justify-start flex-wrap md:flex-nowrap  scroll-smooth overflow-x-scroll snap-x scrollbar-hide md:h-[100%] ${showMore ? "h-[100%]" : " h-[14rem]"} overflow-hidden`}>
                        {categoryData.map(({ image, name }: ICategoryData, i: number) => {
                            return (
                                <div key={i} className="md:min-w-[25%] w-[6rem] mt-3 px-2.5 aspect-square flex flex-col items-center md:snap-start ">
                                    <img src={image} alt={name + "img"} width={"100%"} loading="lazy" />
                                    <p>{name}</p>
                                </div>
                            )
                        })}
                    </div>
                    <RightArrow cardPointer={pointer} setPointer={setPointer} />
                </section >
                <button onClick={() => { setShowMore(!showMore) }} className="bg-[#fff] w-[100%] border-1px my-3 py-1 rounded-md  md:hidden">Show more</button>
            </div>
        </div>
    )
}

export default CategoryTemp