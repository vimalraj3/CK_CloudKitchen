import { useNavigate } from "react-router-dom";

export const NotFoundCart = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center">
      <div className="my-7 flex flex-col items-center justify-center gap-5">
        <section>
          <img
            src="https://res.cloudinary.com/dd39ktpmz/image/upload/v1687273218/spf0qx39wxyfgsivinr2.png"
            alt="User cart not found image"
          />
        </section>
        <section>
          <h4 className="font-head text-lg font-bold">
            Your cart is empty,
            <span
              className="underline-curve ml-1.5 cursor-pointer text-primary"
              onClick={() => {
                navigate(`/`);
              }}
            >
              Add now
            </span>
          </h4>
        </section>
      </div>
    </div>
  );
};
