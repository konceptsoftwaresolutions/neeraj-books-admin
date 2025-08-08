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
  const [step, setStep] = useState(1); // 1 = email/pass, 2 = otp
  const [loginPayload, setLoginPayload] = useState(null); // store email/pass for step 2

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  // Step 1 → request OTP
  const requestOtpHandler = async ({ email, password }) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/user/login", {
        email,
        password,
      });
      if (response.status === 200) {
        toast.success(response.data.message || "OTP sent to your email/phone");
        setLoginPayload({ email, password, userId: response.data.userId });
        setStep(2); // move to OTP step
      }
    } catch (error) {
      let message = "Error requesting OTP";
      if (error.response?.data) {
        message = error.response.data.message || error.response.data;
      }
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2 → verify OTP and log in
  const verifyOtpHandler = async ({ otp }) => {
    try {
      setIsLoading(true);

      // Make sure loginPayload exists, or use default values if undefined
      const payload = { userId: loginPayload?.userId, otp };

      // Send POST request to login endpoint
      const response = await axiosInstance.post(
        "/user/login-verify-otp",
        payload
      );

      if (response.status === 200) {
        const token = response.data.token;
        console.log("token: ", token);

        if (token) {
          console.log("Processing token");

          // Decode the JWT token
          const user = jwtDecode(token);
          console.log("user: ", user);

          // Check if the user data is valid
          if (user && user.foundUser) {
            const role = user.foundUser.profile;
            const userData = user.foundUser;
            const abilityUser = user.foundUser;

            // Construct the ability object
            const ability = {
              departments: abilityUser?.userDepartment,
              profile: abilityUser?.profile,
            };

            // Dispatch token and user info
            dispatch(
              setToken({
                token,
                isAuthenticated: true,
                role: role || null,
                ability: ability,
              })
            );

            // Set user data
            dispatch(setUser({ userData }));

            // Optionally navigate to the dashboard
            // navigate(`/dashboard`);

            // Show success toast
            toast.success(response.data.message);
          } else {
            // Handle case where user data is invalid
            throw new Error("Invalid user data");
          }
        }
      }
    } catch (error) {
      // Handle specific error messages or fallback to a generic message
      const message =
        error.response?.data?.message || error.message || "Login failed";
      toast.error(message);
      console.error("Error during login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[100vh] w-full flex flex-col justify-center primary-gradient">
      <div className="sm:min-w-[30rem] mx-auto bg-white shadow-2xl rounded-2xl p-10">
        <div className="flex justify-center flex-col items-center pb-6 text-center">
          <img src={logo} alt="logo" className="w-[250px]" />
        </div>

        {step === 1 && (
          <form
            onSubmit={handleSubmit(requestOtpHandler)}
            className="flex flex-col gap-4"
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
              className="primary-gradient black capitalize text-white py-2 font-bold text-md mt-4 rounded-md flex items-center justify-center"
              loading={isLoading}
            >
              Send OTP
            </Button>
          </form>
        )}

        {step === 2 && (
          <form
            onSubmit={handleSubmit(verifyOtpHandler)}
            className="flex flex-col gap-4"
          >
            <InputField
              control={control}
              name="otp"
              label="OTP"
              type="text"
              errors={errors}
            />

            <Button
              type="submit"
              variant="filled"
              className="primary-gradient black capitalize text-white py-2 font-bold text-md mt-4 rounded-md flex items-center justify-center"
              loading={isLoading}
            >
              Log In
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
