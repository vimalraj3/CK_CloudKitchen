import { useNavigate } from "react-router-dom"

export const NotFoundCart = () => {

    const navigate = useNavigate()
    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col gap-5 justify-center items-center my-7">
                <section>
                    <img src="https://res.cloudinary.com/dd39ktpmz/image/upload/v1687273218/spf0qx39wxyfgsivinr2.png" alt="User cart not found image" />
                </section>
                <section>
                    <h4 className="font-head font-bold text-lg">Your cart is empty,
                        <span className="ml-1.5 text-primary underline-curve cursor-pointer" onClick={() => { navigate(`/`) }}>
                            Add now
                        </span>
                    </h4>
                </section>
            </div>
        </div>
    )
}
