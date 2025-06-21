"use client";

import { logout } from "@/services/auth";
import { useRouter } from "@bprogress/next/app";

import React from "react";

const LogoutButton = () => {
  const router = useRouter();
  return <button onClick={() => logout(router)}>Logout</button>;
};

export default LogoutButton;
