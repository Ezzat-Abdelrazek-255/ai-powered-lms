"use client";

import ErrorMsg from "@/components/ui/error-msg";
import { Input } from "@/components/ui/input";
import PrimaryButton from "@/components/ui/primary-button";
import { login } from "@/services/auth";
import { AuthInputs } from "@/types";
import { useState } from "react";
import { useRouter } from "@bprogress/next/app";
import { useForm, SubmitHandler } from "react-hook-form";

const LoginForm = () => {
  const { register, handleSubmit } = useForm<AuthInputs>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit: SubmitHandler<AuthInputs> = async (data) => {
    try {
      setIsLoading(true);
      setError("");
      return await login(data, router);
    } catch (error) {
      setIsLoading(false);
      if (error instanceof Error) setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-[1.6rem]">
      <div className="space-y-[0.8rem]">
        <Input
          {...register("email")}
          name="email"
          type="email"
          placeholder="Email"
          required
        />
        <Input
          {...register("password")}
          name="password"
          type="password"
          placeholder="Password"
          required
        />
      </div>
      <PrimaryButton className="w-full" isLoading={isLoading}>
        Login
      </PrimaryButton>
      {error && <ErrorMsg errorMsg={error} />}
    </form>
  );
};

export default LoginForm;
