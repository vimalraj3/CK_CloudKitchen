import React, { useEffect, useState } from "react";
import Nav from "../Nav";
import Container from "../Container";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { verifiyUser } from "../../state/slices/user.slice";
import toast from "react-hot-toast";

export const Verified = () => {
  const { email } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [message, setMessage] = useState("Verification in progress");

  useEffect(() => {
    if (email) {
      const promiseData = dispatch(verifiyUser(email));
      toast.promise(
        promiseData,
        {
          loading: "Verification in progress",
          success: (data: any) => {
            if (data.payload?.email) {
              navigate("/");
              setMessage("successfully verified");
              return `Successfully Verified`;
            }

            throw data.payload?.message || "Something went wrong";
          },
          error: (err) => {
            setMessage(err);
            return `${err}`;
          },
        },
        {
          success: {
            duration: 2000,
          },
          error: {
            duration: 1500,
          },
        },
      );
    }
  }, []);

  return (
    <>
      <Nav dark={true} bgColor={"#f8f8f8"} />
      <Container>
        <div className="flex min-h-[70vh] items-center justify-center">
          <h3 className="font-head text-xl font-bold capitalize">{message}</h3>
        </div>
      </Container>
    </>
  );
};
