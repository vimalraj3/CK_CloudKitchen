import { AuthLoading } from "../Components/Loading/AuthLoading";
import PageLoading from "../Components/Loading/PageLoading";
import { useAppSelector } from "../hooks";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = () => {
  const email = useAppSelector((state) => state.userState.data.email);
  const loading = useAppSelector((state) => state.userState.loading);

  console.log(loading, "loading user private routes");

  if (loading) return <AuthLoading />;

  return email ? <Outlet /> : <Navigate to="/login" />;
};
