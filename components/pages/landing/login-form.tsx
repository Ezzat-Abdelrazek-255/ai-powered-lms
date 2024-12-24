"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/contexts/auth";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const authContext = useAuthContext();
  const router = useRouter();

  const handleEmailChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  };
  const handlePasswordChange = function (
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    setPassword(e.target.value);
  };

  const handleSubmit = function (e: React.FormEvent<HTMLFormElement>) {
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
    <form action="#" onSubmit={handleSubmit}>
      <div className="mx-auto mb-6 flex max-w-[400px] flex-col gap-4">
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
      </div>
      <Button className="h-12 w-60 rounded-full text-xl shadow-md">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
