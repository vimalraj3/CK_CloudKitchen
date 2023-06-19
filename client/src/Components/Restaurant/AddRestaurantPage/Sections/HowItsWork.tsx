import ProcessCard from "../Card/ProcessCard"

function HowItsWork() {
    return (
        <div className="bg-[#f8f8f8] w-[100%] mt-0" >
            <div className="w-[90%] max-w-[1200px] mx-auto md:px-[2rem] py-5 md:py-10">
                <div className="flex justify-center items-center">
                    <h4 className="font-head text-2xl font-semibold">How it works?</h4>
                </div>
                <ProcessCard />
            </div>
        </div>
    )
}

export default HowItsWork