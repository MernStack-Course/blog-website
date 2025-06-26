import { useState } from "react";
import CustomInput from "../components/customInput";
import CustomButton from "../components/CustomButton";
import { useAuthContext } from "../context/auth";
import * as yup from "yup";

function SignIn() {
  const { isLoading, signIn } = useAuthContext();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ password: [], email: [] })
  const validationSchema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      
  });

  // .min(8, "Password must be at least 8 characters long")
  //     .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  //     .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  //     .matches(/\d/, "Password must contain at least one number")
  //     .matches(
  //       /[!@#$%^&*(),.?":{}|<>]/,
  //       "Password must contain at least one special character"
  //     )

  const handleChange = (fieldName, value) => {
    setData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await validationSchema.validate(data, { abortEarly: false });
      signIn(data);
    } catch (validationErrors) {
      const newErrors = {password:[], email:[]}
      validationErrors.inner.forEach((error) => {
           newErrors[error.path] = [...newErrors[error.path], error.message]
      });
      setErrors(newErrors)
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center ">
      <div className="p-4 rounded-lg shadow-xl w-xl bg-gradient-to-r from-blue-300 to-blue-400">
        <h1 className="text-center text-2xl mb-4 font-medium">
          SignIn to you account
        </h1>
        <form onSubmit={handleSubmit} method="post">
          <CustomInput
            label="Email-address"
            type="email"
            value={data.email}
            onChange={(value) => handleChange("email", value)}
          />
           {
               errors && errors.email.map((error, index)=> <li key={index}>{error}</li> )
           }

          <CustomInput
            label="Password"
            type="password"
            value={data.password}
            onChange={(value) => handleChange("password", value)}
          />

           {
               errors && errors.password.map((error, index)=> <li key={index}>{error}</li> )
           }

          <CustomButton
            label="SignIn"
            variant="bg-indiago-500"
            onClick={handleSubmit}
            type="submit"
            isLoading={isLoading}
          />
        </form>
      </div>
    </div>
  );
}

export default SignIn;
