import "./UserLogin.css";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  profileImage: string;
}

const UserLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormInputs>();
  const [signState, setSignState] = useState("Sign In");

  const navigate = useNavigate();

  // Function to handle form submission
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      if (signState === "Sign Up") {
        if (data.password !== data.confirmPassword) {
          toast.error("Passwords do not match!");
          return;
        }

        const response = await axios.post(
          "http://localhost:3000/register",
          {
            name: data.name,
            email: data.email,
            password: data.password,
            profileImage: data.profileImage,
          },
          { withCredentials: true }
        );

        if (response) {
          toast.success("Sign up successful!");
          navigate("/profile");
        }
      } else {
        // Handle sign in
        const response = await axios.post(
          "http://localhost:3000/login",
          {
            email: data.email,
            password: data.password,
          },
          { withCredentials: true }
        );

        if (response.data?.accessToken) {
          localStorage.setItem("accessToken", response.data.accessToken);
          toast.success("Login successful!");
          navigate("/profile");
        } else {
          toast.error("Login failed, please try again.");
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Response error:", error.response.data);
          toast.error(
            `Error: ${error.response.data.message || "Unknown error"}`
          );
        } else if (error.request) {
          console.error("No response:", error.request);
          toast.error("No response from the server.");
        } else {
          console.error("Axios error:", error.message);
          toast.error(`Error: ${error.message}`);
        }
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_PRESET);

    try {
      const uploadRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/image/upload`,
        formData
      );
      const imageUrl = uploadRes.data.secure_url;

      setValue("profileImage", imageUrl);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Error uploading image to Cloudinary");
      console.error("Error uploading image to Cloudinary", error);
    }
  };

  const handleFormSwitch = (newState: string) => {
    setSignState(newState);
    reset();
  };

  return (
    <div className="login">
      <div className="login-form">
        <img src="/vite.svg" alt="logo" className="login-logo" />
        <h1>{signState}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {signState === "Sign Up" && (
            <>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Your name"
              />
              <div className="error-message">
                {errors.name && <p>{errors.name.message}</p>}
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file);
                }}
              />
              <div className="error-message">
                {errors.profileImage && <p>{errors.profileImage.message}</p>}
              </div>
            </>
          )}

          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email address",
              },
            })}
            type="email"
            placeholder="Email"
          />
          <div className="error-message">
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
            type="password"
            placeholder="Password"
          />
          <div className="error-message">
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          {signState === "Sign Up" && (
            <input
              {...register("confirmPassword", {
                required: "Confirm Password is required",
              })}
              type="password"
              placeholder="Confirm Password"
            />
          )}
          <div className="error-message">
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          </div>

          <button type="submit">{signState}</button>
        </form>

        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              New to the platform?{" "}
              <span onClick={() => handleFormSwitch("Sign Up")}>
                Sign Up Now
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => handleFormSwitch("Sign In")}>Login</span>
            </p>
          )}
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default UserLogin;
