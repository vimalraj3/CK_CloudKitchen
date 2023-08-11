import React from "react";
import { NavLink } from "react-router-dom";
import { UserAvatar } from "../UI/UserAvatar/UserAvatar";

interface IUserAvatarNavLinks {
  name: string;
  to: string;
}

interface IUserAvatar {
  userName?: string;
  src?: string;
  dropDown: IUserAvatarNavLinks[];
  isHamBuger?: boolean;
  dark?: boolean;
}

export const UserAvatarNav: React.FC<IUserAvatar> = ({
  userName,
  src,
  dropDown,
  isHamBuger = false,
  dark = false,
}) => {
  const [isUserOptionOpen, setIsUserOptionOpen] =
    React.useState<boolean>(false);
  return (
    <>
      {isHamBuger ? (
        <>
          <div
            className="relative z-20 flex h-[18px] w-[24px] flex-col justify-between overflow-hidden md:hidden"
            onClick={() => {
              setIsUserOptionOpen((prev) => (prev = !prev));
            }}
          >
            <div
              className={`absolute my-0.5 h-[2px] w-[100%] ${
                dark ? "bg-black" : "bg-white"
              } transition-all duration-500 ease-in-out ${
                isUserOptionOpen ? "top-1.5 rotate-[135deg]" : "rotate-0"
              }`}
            ></div>
            <div
              className={`absolute top-1.5 my-0.5 h-[2px] w-[100%] ${
                dark ? "bg-black" : "bg-white"
              } transition-all  duration-700 ease-in-out ${
                isUserOptionOpen ? "left-[-60px]" : "left-0"
              }`}
            ></div>
            <div
              className={`absolute my-0.5 h-[2px] w-[100%]  ${
                dark ? "bg-black" : "bg-white"
              } transition-all duration-500 ease-in-out ${
                isUserOptionOpen ? "top-1.5 -rotate-[135deg]" : "top-3 rotate-0"
              }`}
            ></div>
          </div>
        </>
      ) : (
        <div
          className="z-50 cursor-pointer px-1 py-1"
          onClick={() => setIsUserOptionOpen(!isUserOptionOpen)}
        >
          <UserAvatar
            userName={(userName && userName[0]) || "CK"}
            src={src}
            isNav={true}
          />
        </div>
      )}

      {isUserOptionOpen && (
        <div className="absolute right-10 top-[85%] z-50 transition-all ">
          <div className="flex flex-col items-center justify-center gap-2 rounded-md bg-white p-2 shadow-md">
            {dropDown.map((item, index) => (
              <NavLink
                to={item.to}
                key={index}
                onClick={() => {
                  setIsUserOptionOpen(false);
                }}
              >
                <div className="font-moutserrat cursor-pointer rounded-md px-3 py-1.5 text-sm capitalize text-black hover:bg-[#f8f8f8]">
                  <span>{item.name}</span>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      )}
      {isUserOptionOpen && (
        <div
          className="absolute left-0 top-0 h-[100vh] w-[100%]"
          onClick={() => setIsUserOptionOpen(false)}
        ></div>
      )}
    </>
  );
};
