import Container from "../Container";
import Nav from "../Nav";
import { useState } from "react";
import { Form, PasswordInput, Input } from "../UI/Form";

import { Divider } from "../UI/Divider";

import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { loginUser } from "../../state/slices/user.slice";
import { Login } from "../../types/user.types";
import { Text } from "../UI/Text";
import * as yup from "yup";
import ForgetPassword from "../DialogBox/ForgetBox";

function index() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state?.userState);

  const [user, setUser] = useState<Login>({
    email: "",
    password: "",
  });

  const handleChange = async (key: string, value: string) => {
    setUser((prev) => {
      return (prev = {
        ...prev,
        [key]: value,
      });
    });
  };

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(5, "Password must be at least 5 characters"),
  });

  const onSubmit = async (data: Login) => {
    const resultAction = await dispatch(loginUser(data));

    if (loginUser.fulfilled.match(resultAction)) {
      navigate(-1);
    }
  };

  const handleGoogleLogin = () => {
    console.log(import.meta.env.VITE_REACT_SER_URL, "server url");
    const url =
      import.meta.env.VITE_REACT_SER_URL ||
      import.meta.env.VITE_REACT_SER_URL_LOCAL;
    window.open(`${url}/api/auth/google`, "_self");
  };

  return (
    <>
      <Nav dark={true} bgColor="#f8f8f8" />
      <Container>
        <div className="flex min-h-[60svh] justify-center">
          <div className="flex w-[100%] flex-col items-center justify-center gap-4 px-2 py-2 md:w-[50%] lg:w-[40%] xl:w-[35%]">
            <Form<Login> onSubmit={onSubmit} schema={schema}>
              {({ register, errors }) => (
                <>
                  <div>
                    <Input
                      type="email"
                      {...register("email", { required: true, maxLength: 30 })}
                    />
                    {errors.email && (
                      <Text
                        message={errors.email.message as string}
                        color="#EF4444"
                        size="sm"
                      />
                    )}
                  </div>
                  <div className="">
                    <PasswordInput
                      {...register("password", {
                        required: true,
                        minLength: 8,
                      })}
                    />
                    {errors.password && (
                      <Text
                        message={errors.password.message as string}
                        color="#EF4444"
                        size="sm"
                      />
                    )}
                  </div>
                  <div>
                    <ForgetPassword />
                  </div>
                  <Input
                    type="submit"
                    role="button"
                    style={{
                      cursor: "pointer",
                    }}
                  />
                </>
              )}
            </Form>

            <button
              className="rounded-md p-1"
              onClick={handleGoogleLogin}
              style={{
                width: "100%",
                border: "#ff7e8b 2px solid",
                display: "flex",
                justifyContent: "center",
                margin: "  0",
                color: "#000",
                fontFamily: "montserrat",
                backgroundColor: "#f8f8f8",
                fontWeight: "500",
                padding: "7px 6px",
              }}
            >
              <div className="flex items-center justify-center gap-1">
                {`Google `}{" "}
                <i className="fa-brands fa-google text-lg text-gray-400"></i>
              </div>
            </button>
            <Divider margin="0" color="#c1c1c1" size="1px" />
            <div className="flex items-center justify-center">
              <p className="text-sm text-[#9c9c9c]">have account already? </p>
              <Link to={"/signup"}>
                <span className="ml-1.5 cursor-pointer text-[#000] hover:underline">
                  sign up
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default index;
