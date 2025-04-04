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
import AddMembers from "../pages/TeamMembers/AddMembers";
import Categori from "../pages/Categori/Categori";
import EditCategori from "../pages/Categori/AddCategory";
import Customer from "../pages/customer/Customer";
import EditCustomer from "../pages/customer/EditCustomer";
import Promotions from "../pages/Promotions/Promotions";
import Banners from "../pages/Banners/Banners";
import AddBanners from "../pages/Banners/AddBanners";
import BestSeller from "../pages/BestSeller/BestSeller";
import User from "../pages/User/User";
import Combos from "../pages/combos/Combos";
import CreateCombo from "../pages/combos/CreateCombo";
import EditCombo from "../pages/combos/EditCombo";
import Quiz from "../pages/quiz/Quiz";
import AddQuiz from "../pages/quiz/AddQuiz";
import EditQuiz from "../pages/quiz/EditQuiz";
import Sliders from "../pages/sliders/Sliders";
import AddSlider from "../pages/sliders/AddSlider";
import EditSlider from "../pages/sliders/EditSlider";
import AllPopups from "../pages/popups/AllPopups";
import AddCategory from "../pages/Categori/AddCategory";
import EditCategory from "../pages/Categori/EditCategory";
import CreateBook from "../pages/books/CreateBook";
import UpdateBook from "../pages/books/UpdateBook";
import AbandonedCart from "../pages/abandoned/AbandonedCart";
import AbandonedDetail from "../pages/abandoned/AbandonedDetail";
import AllCoupons from "../pages/coupons/AllCoupons";

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
          element: (
            <ProtectedRoutes
              isAuthenticated={isAuthenticated}
              redirect={`/${role}/books`}
              role={role}
            >
              <Home />
            </ProtectedRoutes>
          ),
        },
        { path: "/:type/books", element: <Books /> },
        { path: "/:type/quiz", element: <Quiz /> },
        { path: "/:type/:parent/addquiz", element: <AddQuiz /> },
        { path: "/:type/:parent/editquiz", element: <EditQuiz /> },
        { path: "/:type/addbook", element: <AddBook /> },
        { path: "/:type/createbook", element: <CreateBook /> },
        { path: "/:type/updatebook", element: <UpdateBook /> },
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
        { path: "/:type/addcategory", element: <AddCategory /> },
        { path: "/:type/editcategory", element: <EditCategory /> },
        { path: "/:type/customer", element: <Customer /> },
        { path: "/:type/editcustomer", element: <EditCustomer /> },
        { path: "/:type/promotions", element: <Promotions /> },
        { path: "/:type/popups", element: <AllPopups /> },
        { path: "/:type/banners", element: <Banners /> },
        { path: "/:type/addbanners", element: <AddBanners /> },
        { path: "/:type/bestseller", element: <BestSeller /> },
        { path: "/:type/user", element: <User /> },
        { path: "/:type/combos", element: <Combos /> },
        { path: "/:type/createcombo", element: <CreateCombo /> },
        { path: "/:type/editcombo", element: <EditCombo /> },
        { path: "/:type/sliders", element: <Sliders /> },
        { path: "/:type/addslider", element: <AddSlider /> },
        { path: "/:type/editslider", element: <EditSlider /> },
        { path: "/:type/abandonedcart", element: <AbandonedCart /> },
        { path: "/:type/abandoned-detail", element: <AbandonedDetail /> },
        { path: "/:type/coupons", element: <AllCoupons /> },
        { path: "*", element: <Navigate to="/" replace /> }, // Redirects to /home
      ],
    },
  ];

  const element = useRoutes(routes);
  return element;
};

export default Routes;
