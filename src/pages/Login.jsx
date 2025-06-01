import React, { useState } from "react";
import PageCont from "../components/PageCont";
import InputField from "../common/fields/InputField";
import logo from "../assets/neeraj.png";
import { useForm } from "react-hook-form";
import { Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import createAxiosInstance from "../config/axiosConfig";
import { setToken } from "../redux/features/auth";
import { setUser } from "../redux/features/user";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosInstance = createAxiosInstance();
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const loginHandler = async (payload) => {
    try {
      setIsLoading(true);

      const response = await axiosInstance.post("/user/login", payload);
      const token = response.data.token;
      console.log("token si ", token);
      if (token) {
        console.log("in");
        const user = jwtDecode(token);
        console.log("user", user);
        const role = user.foundUser.profile;
        const userData = user.foundUser;
        const abilityUser = user.foundUser;
        const ability = {
          departments: abilityUser?.userDepartment,
          profile: abilityUser?.profile,
        };
        console.log(userData);

        dispatch(
          setToken({
            token,
            isAuthenticated: true,
            role: user.foundUser.profile ? user.foundUser.profile : null,
            ability: ability,
          })
        );
        // dispatch(setUser({ userData }));
        dispatch(setUser({ userData }));
        // navigate(`/`);
        // navigate(`/dashboard`);
        toast.success(response.data.message);
      }
    } catch (error) {
      let message = "ERROR";
      if (error.hasOwnProperty("response")) {
        message = error.response.data;
      }
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="h-[100vh] w-full flex flex-col justify-center primary-gradient ">
        <div className=" sm:min-w-[30rem] mx-auto bg-white shadow-2xl rounded-2xl p-10 ">
          <div className="flex justify-center flex-col items-center pb-6 text-center">
            <img src={logo} alt="logo" className="w-[250px]" />
          </div>

          <form
            onSubmit={handleSubmit(loginHandler)}
            className=" flex flex-col gap-4"
          >
            <InputField
              control={control}
              name="email"
              errors={errors}
              label="Email"
            />

            <InputField
              control={control}
              name="password"
              label="Password"
              type="password"
              isPassword={true}
              errors={errors}
            />
            <Button
              type="submit"
              variant="filled"
              className="primary-gradient black capitalize text-white py-2 font-bold text-md mt-4 rounded-md flex items-center justify-center "
              loading={isLoading}
            >
              Log In
            </Button>
            <span className="w-full text-center my-3 text-[#6E6E6E] font-medium">
              {/* Powered by OCPL Tech */}
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
