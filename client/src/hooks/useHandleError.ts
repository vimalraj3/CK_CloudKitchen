import { ServerError } from "../types/error.types";

export const useHandleError = () => {
  let serverError: ServerError = {
    message: "",
    success: false,
  };

  const setServerError = (err: ServerError) => {
    serverError = err;
  };
  return { serverError, setServerError };
};
