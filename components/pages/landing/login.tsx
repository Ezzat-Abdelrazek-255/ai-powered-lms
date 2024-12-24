import React from "react";
import LoginForm from "./login-form";
import { testCredientials } from "@/constants/auth";

const Login = () => {
  return (
    <div className="max-w-[450px] text-center">
      <h1 className="mb-3 text-5xl font-bold leading-[85%]">Welcome back</h1>
      <p className="mb-6 text-muted-foreground">
        Log in to access your personalized dashboard, where you can view your
        courses, track your grades, and stay updated with important messages.
      </p>
      <div className="mb-12">
        <LoginForm />
      </div>
      <div>
        <p className="mb-6">
          To explore the site login using one of the following credentials:
        </p>
        <p className="mb-1 text-muted-foreground">
          <span className="font-bold text-black">Email: </span>
          {testCredientials.email}
        </p>
        <p className="text-muted-foreground">
          <span className="font-bold text-black">Password: </span>
          {testCredientials.password}
        </p>
      </div>
    </div>
  );
};

export default Login;
