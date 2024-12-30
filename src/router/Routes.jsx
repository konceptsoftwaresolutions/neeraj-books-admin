import React, { useMemo } from "react";
import Home from "../pages/dashboard/Home";
import DashLayout from "../components/layout/DashLayout";
import { Navigate, useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import { useSelector } from "react-redux";
import ProtectedRoutes from "./ProtectedRoutes";
import Books from "../pages/books/Books";
import AddBook from "../pages/books/AddBook";
import EditBook from "../pages/books/EditBook";
import Testimonials from "../pages/testimonials/Testimonials";
import AddTestimonial from "../pages/testimonials/AddTestimonial";
import Orders from "../pages/orders/Orders";
import EditOrders from "../pages/orders/EditOrders";
import AddOrders from "../pages/orders/AddOrders";
import TeamMembers from "../pages/TeamMembers/TeamMembers";
import EditMembers from "../pages/TeamMembers/EditMembers";
import AddMembers from "../pages/TeamMembers/AddMembers"
import Categori from "../pages/Categori/Categori";
import EditCategori from "../pages/Categori/EditCategori";
import Customer from "../pages/customer/Customer";
import EditCustomer from "../pages/customer/EditCustomer";
import Promotions from "../pages/Promotions/Promotions";
import Banners from "../pages/Banners/Banners";
import AddBanners from "../pages/Banners/AddBanners";
import BestSeller from "../pages/BestSeller/BestSeller";
import User from "../pages/User/User"
const Routes = () => {
  const { isAuthenticated, role, token } = useSelector((state) => state.auth);

  const destinationRoute = useMemo(() => {
    if (isAuthenticated) {
      return `/${role}/dashboard`;
    } else if (!isAuthenticated) {
      return "/login";
    } else {
      return "/";
    }
  }, [isAuthenticated, token, role]);

  const routes = [
    {
      path: "/",
      element: <Navigate to={destinationRoute} />,
    },
    {
      path: "*",
      element: <Navigate to={"/"} />,
    },
    {
      path: "/login",
      element: (
        <ProtectedRoutes isAuthenticated={!isAuthenticated} redirect={"/"}>
          <Login />
        </ProtectedRoutes>
      ),
    },
    {
      path: "/",
      element: (
        <ProtectedRoutes isAuthenticated={isAuthenticated} redirect={"/login"}>
          <DashLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          path: "/:type/dashboard",
          element: <Home />,
        },
        { path: "/:type/books", element: <Books /> },
        { path: "/:type/addbook", element: <AddBook /> },
        { path: "/:type/editbook", element: <EditBook /> },
        { path: "/:type/testimonials", element: <Testimonials /> },
        { path: "/:type/addtestimonial", element: <AddTestimonial /> },
        { path: "/:type/orders", element: <Orders /> },
        { path: "/:type/editOrders", element: <EditOrders /> },
        { path: "/:type/addOrders", element: <AddOrders /> },
        { path: "/:type/teamMembers", element: <TeamMembers /> },
        { path: "/:type/editMembers", element: <EditMembers /> },
        { path: "/:type/addMembers", element: <AddMembers /> },
        { path: "/:type/categori", element: <Categori /> },
        { path: "/:type/editCategori", element: <EditCategori /> },
        { path: "/:type/customer", element: <Customer /> },
        { path: "/:type/editcustomer", element: <EditCustomer /> },
        { path: "/:type/promotions", element: <Promotions /> },
        { path: "/:type/banners", element: <Banners /> },
        { path: "/:type/addbanners", element: <AddBanners /> },
        { path: "/:type/bestseller", element: <BestSeller /> },
        { path: "/:type/user", element: <User /> },


        { path: "*", element: <Navigate to="/" replace /> }, // Redirects to /home
      ],
    },
  ];

  const element = useRoutes(routes);
  return element;
};

export default Routes;
