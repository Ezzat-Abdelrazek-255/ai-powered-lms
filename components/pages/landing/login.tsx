import React from "react";
import LoginForm from "./login-form";
import { testCredientials } from "@/constants/auth";
import ClipboardCopy from "@/components/ui/clipboard-copy";

const Login = () => {
  return (
    <div className="max-w-[35rem] text-center">
      <h1 className="h1 mb-[1.2rem]">Welcome back</h1>
      <p className="text-body-base mb-[1.6rem] text-white/60">
        Log in to access your personalized dashboard, where you can view your
        courses and track your grades.
      </p>
      <div className="mb-[1.6rem]">
        <LoginForm />
      </div>
      <div className="space-y-[2.4rem] rounded-sm bg-gray-dark-2 p-[1.6rem]">
        <div>
          <h3 className="mb-[0.8rem] text-left font-semibold text-white/80">
            Student Credientials
          </h3>
          <div className="rounded-sm bg-gray-dark p-[1.6rem]">
            <div className="flex items-center gap-[0.6rem]">
              <span>Email:</span>
              <span>{testCredientials.studentEmail}</span>
              <ClipboardCopy
                text={testCredientials.studentEmail}
                ariaLabel="Copy email address to clipboard"
              />
            </div>
            <div className="flex items-center gap-[0.6rem]">
              <span>Password: </span>
              <span>{testCredientials.studentPassword}</span>
              <ClipboardCopy
                text={testCredientials.studentPassword}
                ariaLabel="Copy password to clipboard"
              />
            </div>
          </div>
        </div>
        <div>
          <h3 className="mb-[0.8rem] text-left font-semibold text-white/80">
            Instructor Credientials
          </h3>
          <div className="rounded-sm bg-gray-dark p-[1.6rem]">
            <div className="flex items-center gap-[0.6rem]">
              <span>Email:</span>
              <span>{testCredientials.instructorEmail}</span>
              <ClipboardCopy
                text={testCredientials.instructorEmail}
                ariaLabel="Copy email address to clipboard"
              />
            </div>
            <div className="flex items-center gap-[0.6rem]">
              <span>Password: </span>
              <span>{testCredientials.instructorPassword}</span>
              <ClipboardCopy
                text={testCredientials.instructorPassword}
                ariaLabel="Copy password to clipboard"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
