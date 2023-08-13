import React from "react";
import Nav from "../Nav";
import { Link } from "react-router-dom";

export const PageNotFound = () => {
  console.log("404");

  return (
    <>
      <Nav dark={true} bgColor={"#f8f8f8"} />

      <div className="flex h-[70vh] w-full flex-col items-center justify-center gap-2 text-black">
        <div className="w-[220px] md:w-[350px]">
          <img
            src="https://res.cloudinary.com/dd39ktpmz/image/upload/v1691859844/ck/client_static/clds5fclmmr04posyf4h.webp"
            alt="Restaurant nor found image"
            width={"100%"}
            height={"100%"}
            loading={"lazy"}
          />
        </div>
        <h1 className="text-3xl font-bold capitalize text-primary">
          404 Page not found
        </h1>
        <Link
          to={"/"}
          className="w-full text-center text-lg font-bold text-blue-400 underline"
        >
          Go To Home
        </Link>
      </div>
    </>
  );
};
