import "./AdminLogin.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

interface FormInputs {
  email: string;
  password: string;
}

const UserLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email: data.email,
        password: data.password,
      });

      if (response.status === 200) {
        navigate("/profile");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Response error:", error.response.data);
          toast.error(`${error.response.data.message || "Unknown error"}`);
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

  return (
    <div className="login">
      <div className="login-form">
        <img src="/vite.svg" alt="logo" className="login-logo" />
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            })}
            type="password"
            placeholder="Password"
          />
          <div className="error-message">
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserLogin;
