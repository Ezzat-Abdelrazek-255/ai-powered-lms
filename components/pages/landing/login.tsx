import React from "react";
import LoginForm from "./login-form";

const Login = () => {
  return (
    <div className="max-w-[35rem] text-center">
      <h1 className="h1 mb-[1.2rem]">Welcome back</h1>
      <p className="text-body-base mb-[1.6rem] text-white/60">
        Log in to access your personalized dashboard, where you can view your
        courses, track your grades, and stay updated with important messages.
      </p>
      <div className="mb-[1.6rem]">
        <LoginForm />
      </div>
      {/* <div> */}
      {/*   <p className="mb-[0.8rem] text-white/60"> */}
      {/*     To explore the site use one of the following credentials: */}
      {/*   </p> */}
      {/*   <p className="mb-[0.4rem]"> */}
      {/*     <span>Email: </span> */}
      {/*     {testCredientials.email} */}
      {/*   </p> */}
      {/*   <p> */}
      {/*     <span>Password: </span> */}
      {/*     {testCredientials.password} */}
      {/*   </p> */}
      {/* </div> */}
    </div>
  );
};

export default Login;
