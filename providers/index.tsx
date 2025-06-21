"use client";

import { Toaster } from "react-hot-toast";
import { ProgressProvider } from "@bprogress/next/app";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressProvider
      color="#C9FE6C"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "hsl(var(--color-gray-dark))",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "hsl(var(--color-white))",
            },
          },
          error: {
            style: {
              background: "hsl(var(--color-gray-dark))",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "hsl(var(--color-white))",
            },
          },
        }}
      />
    </ProgressProvider>
  );
};

export default Providers;
