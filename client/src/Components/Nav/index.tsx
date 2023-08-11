import lightLogo from "../../assets/logos/ligthLogo.png";
import darkLogo from "../../assets/logos/darkLogo.png";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../hooks";

import { UserAvatarNav } from "./UserAvatarNav";
import Cart from "../UI/IconBtn/CartIcon";

interface INavProps {
  dark?: boolean;
  textColor?: string;
  bgColor?: string;
}

const DropDown = [
  {
    name: "login",
    to: "/login",
  },
  {
    name: "sign up",
    to: "/signup",
  },
];

const userDropDown = [
  {
    name: "account",
    to: "/account",
  },
  {
    name: "logout",
    to: "/logout",
  },
];

const adminDropDown = [
  {
    name: "dashboard",
    to: "/dashboard",
  },
];

const mobileUserDropDown = [
  {
    name: "cart",
    to: "/cart",
  },
  ...userDropDown,
];

const Nav: React.FC<INavProps> = ({
  dark = false,
  textColor = "#fff",
  bgColor = "transparent",
}) => {
  const { data } = useAppSelector((state) => state.userState);
  return (
    <div id="top" className={`w-[100%] bg-[${bgColor}] z-50`}>
      <header
        className={`relative mx-auto flex w-[100%] max-w-[1200px] items-center justify-between px-10 py-2 text-[${
          dark ? "#242424" : textColor
        }] `}
      >
        {/* Logo */}
        <section>
          <NavLink to={"/"}>
            <h1 className="LogoName relative z-[50] w-[36px] cursor-pointer md:w-[52px]">
              {!dark ? (
                <img src={lightLogo} alt="light_logo" width={"100%"} />
              ) : (
                <img src={darkLogo} alt="dark_logo" width={"100%"} />
              )}
            </h1>
          </NavLink>
        </section>

        {/* nav  links */}
        <section>
          {/* desktop nav  links */}
          {!data.auth?.isAuth ? (
            <div className="hidden items-center justify-between  md:flex">
              <NavLink to={"/login"}>
                <button className="mr-5 text-xl">Log in</button>
              </NavLink>
              <NavLink to={"/signup"}>
                <button className="text-xl">Sign up</button>
              </NavLink>
            </div>
          ) : !data.auth?.isAdmin ? (
            <>
              <div className="hidden items-center justify-between gap-6 md:flex">
                <Cart />
                <UserAvatarNav
                  userName={data?.userName}
                  src={data.avatar}
                  dropDown={userDropDown}
                />
              </div>
            </>
          ) : (
            <>
              <div className="hidden items-center justify-between gap-6 md:flex">
                <Cart />
                <UserAvatarNav
                  userName={data?.userName}
                  src={data.avatar}
                  dropDown={[...adminDropDown, ...userDropDown]}
                />
              </div>
            </>
          )}

          {/* Moblie Nav links */}

          <div className="md:hidden">
            {!data.userName ? (
              <>
                {/* Moblie nav links*/}
                <UserAvatarNav
                  userName={data?.userName}
                  src={data.avatar}
                  isHamBuger={true}
                  dropDown={DropDown}
                  dark={dark}
                />
              </>
            ) : !(data.role == "admin") ? (
              <>
                <div className="mb-2">
                  <UserAvatarNav
                    userName={data?.userName}
                    src={data.avatar}
                    dropDown={mobileUserDropDown}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="mb-2">
                  <UserAvatarNav
                    userName={data?.userName}
                    src={data.avatar}
                    dropDown={[...adminDropDown, ...mobileUserDropDown]}
                  />
                </div>
              </>
            )}
          </div>
        </section>
      </header>
    </div>
  );
};
export default Nav;
