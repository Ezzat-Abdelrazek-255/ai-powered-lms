"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/contexts/auth";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import EnterSvg from "../../../public/vectors/enter.svg";
import PrimaryButton from "@/components/ui/primary-button";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const authContext = useAuthContext();
  const router = useRouter();

  const handleEmailChange = function(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  };
  const handlePasswordChange = function(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    setPassword(e.target.value);
  };

  const handleSubmit = function(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email !== authContext.email || password !== authContext.password) {
      console.log(password === authContext.password);
      console.log(password, authContext.password);
      setFormError("Invalid email or password. Please try again.");
    } else {
      authContext.setIsLoggedIn(true);
      router.push("/dashboard");
    }
  };

  return (
    <form className="space-y-[1.6rem]" action="#" onSubmit={handleSubmit}>
      <Input
        value={email}
        onChange={handleEmailChange}
        type="email"
        placeholder="Email"
        required
      />
      <Input
        value={password}
        type="password"
        onChange={handlePasswordChange}
        placeholder="Password"
        required
      />
      {formError && <p className="text-destructive">{formError}</p>}
      {/* <Button className="relative w-full"> */}
      {/*   <span className="absolute left-[1.2rem] top-1/2 -translate-y-1/2"> */}
      {/*     <EnterSvg /> */}
      {/*   </span> */}
      {/*   Login */}
      {/* </Button> */}
      <PrimaryButton className="w-full">Login</PrimaryButton>
    </form>
  );
};

export default LoginForm;
