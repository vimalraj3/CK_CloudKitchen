import { Dispatch } from "redux";
import { request, success, failed } from "../slices/user.state";
import { Axios } from "../../axios/config";

interface ILogin {
  email: string;
  password: string;
}

export const login = async (dispatch: Dispatch, userInfo: ILogin) => {
  try {
    dispatch(request());
    const user = await Axios.post("/auth/login", userInfo);
    console.log(user);
    dispatch(success(user));
  } catch (error) {
    dispatch(failed(error));
  }
};
