import axios, { AxiosError } from "axios";
import { request, success, failed } from "../slices/product.slice";
import { Dispatch } from "redux";
import { ServerError } from "../../types/user.types";
import { IProduct } from "../../types/product.types";

export const addProduct = async (dispatch: Dispatch, product: IProduct) => {
  try {
    const { data } = await axios.post("/api/v1/products/addproduct", {
      product,
    });
    dispatch(success(data.data));
  } catch (error: any) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return dispatch(failed(serverError.response.data));
      }
    }
    dispatch(failed({ message: "Something went wrong", success: false }));
  }
};

export const updateTodoById = async (
  dispatch: Dispatch,
  value: string,
  id: string
) => {
  try {
    const { data } = await axios.patch("api/v1/todo", {
      todoTask: value,
      todoId: id,
    });
    dispatch(success(data.data));
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return dispatch(failed(serverError.response.data));
      }
    }
    dispatch(failed({ message: "Something went wrong", success: false }));
  }
};

export const deleteProduct = async (dispatch: Dispatch, productId: string) => {
  try {
    const { data } = await axios.delete(`api/v1/products/${productId}`);
    dispatch(success(data.data));
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return dispatch(failed(serverError.response.data));
      }
    }
    dispatch(failed({ message: "Something went wrong", success: false }));
  }
};

export const favProduct = async (dispatch: Dispatch, productId: string) => {
  try {
    const { data } = await axios.post(`api/v1/products/${productId}`);
    dispatch(success(data.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return dispatch(failed(serverError.response.data));
      }
    }
    dispatch(failed({ message: "Something went wrong", success: false }));
  }
};

export const getProductById = async (dispatch: Dispatch, productId: string) => {
  try {
    dispatch(request());
    const { data } = await axios.get(`/api/v1/products/${productId}`);
    dispatch(success(data));
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return dispatch(failed(serverError.response.data));
      }
    }
    dispatch(failed({ message: "Something went wrong", success: false }));
  }
};

export const getAllProduct = async (dispatch: Dispatch) => {
  try {
    dispatch(request());
    const { data } = await axios.get(`/api/v1/products/ `);
    dispatch(success(data));
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return dispatch(failed(serverError.response.data));
      }
    }
    dispatch(failed({ message: "Something went wrong", success: false }));
  }
};
