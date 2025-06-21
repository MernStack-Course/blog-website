import React, { useState } from "react";
import CustomInput from "../components/customInput";
import CustomButton from "../components/CustomButton";
import { useAuthContext } from "../context/auth";


function SignIn() {
  const { isLoading, signIn } = useAuthContext();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (fieldName, value) => {
    setData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    signIn(data)
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
          <CustomInput
            label="Password"
            type="password"
            value={data.password}
            onChange={(value) => handleChange("password", value)}
          />

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
