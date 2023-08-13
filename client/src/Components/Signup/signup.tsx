import Container from "../Container";
import Nav from "../Nav";
import { PasswordInput, Input, Form } from "../UI/Form";
import { Divider } from "../UI/Divider";
import { Link, useNavigate } from "react-router-dom";
import { SignUp } from "../../types/user.types";
import { signUpUser } from "../../state/slices/user.slice";
import { useAppDispatch } from "../../hooks";
import * as yup from "yup";
import { Text } from "../UI/Text";
import toast from "react-hot-toast";
interface ISignupForm extends SignUp {
  repassword: string;
}

function index() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    userName: yup.string().required("userName is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(5, "Password must be at least 5 characters"),
    repassword: yup
      .string()
      .required("confrim Password is required")
      .min(5, "Password must be at least 5 characters")
      .oneOf([yup.ref("password")], "Passwords do not match"),
  });

  const onSubmit = async (data: ISignupForm) => {
    console.log(data);

    const { email, userName, password } = data;
    const resultAction = dispatch(
      signUpUser({ email, userName, password } as SignUp),
    );

    toast.promise(
      resultAction,
      {
        loading: "Sign up in progress",
        success: (data: any) => {
          if (!data.payload.success) {
            throw data.payload.message;
          }
          navigate("/");
          return `Successfully Signup`;
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
      <Nav dark={true} bgColor={"#f8f8f8"} />
      <Container>
        <div className="flex min-h-[60svh] justify-center">
          <div className="flex w-[100%] flex-col items-center justify-center gap-4 px-2 py-2 md:w-[50%] lg:w-[40%] xl:w-[35%]">
            <Form<ISignupForm> onSubmit={onSubmit} schema={schema}>
              {({ register, errors }) => {
                return (
                  <>
                    <div>
                      <Input type="email" {...register("email")} />
                      {errors.email && (
                        <Text
                          message={errors.email.message as string}
                          color="#EF4444"
                          size="sm"
                        />
                      )}
                    </div>
                    <div>
                      <Input
                        type="text"
                        {...register("userName")}
                        name="userName"
                      />
                      {errors.userName && (
                        <Text
                          message={errors.userName.message as string}
                          color="#EF4444"
                          size="sm"
                        />
                      )}
                    </div>
                    <div className="">
                      <PasswordInput {...register("password")} />
                      {errors.password && (
                        <Text
                          message={errors.password.message as string}
                          color="#EF4444"
                          size="sm"
                        />
                      )}
                    </div>
                    <div className="">
                      <PasswordInput
                        {...register("repassword")}
                        label="Confirm Password"
                      />
                      {errors.repassword && (
                        <Text
                          message={errors.repassword.message as string}
                          color="#EF4444"
                          size="sm"
                        />
                      )}
                    </div>
                    <button
                      role="submit"
                      value={"Sign up"}
                      className="w-full rounded-md border border-primary py-2 transition-colors"
                    >
                      <div className="flex w-full items-center justify-center gap-1  text-primary">
                        <p> {`Submit `}</p>
                      </div>
                    </button>
                  </>
                );
              }}
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
