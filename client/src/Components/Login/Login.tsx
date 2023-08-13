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
import toast from "react-hot-toast";

function index() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(5, "Password must be at least 5 characters"),
  });

  const onSubmit = async (data: Login) => {
    const resultAction = dispatch(loginUser(data));

    toast.promise(
      resultAction,
      {
        loading: "Login in progress",
        success: (data) => {
          navigate("/");

          return `Successfully login`;
        },
        error: (err) => {
          return `${err}`;
        },
      },
      {
        success: {
          duration: 2000,
        },
        error: {
          duration: 2000,
        },
      },
    );
  };

  return (
    <>
      <Nav dark={true} bgColor="#f8f8f8" />
      <Container>
        <div className="flex min-h-[60svh] justify-center">
          <div className="flex w-full flex-col items-center justify-center gap-4 px-2 py-2 md:w-[50%] lg:w-[40%] xl:w-[35%]">
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
                  <button
                    role="submit"
                    className="w-full rounded-md border border-primary py-2 transition-colors"
                  >
                    <div className="flex w-full items-center justify-center gap-1  text-primary">
                      <p> {`Submit `}</p>
                    </div>
                  </button>
                </>
              )}
            </Form>

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
