import { Button } from "@/components/ui/button";
import React from "react";

const Profile = () => {
  return (
    <div>
      <section>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-8">
            <div className="aspect-square h-24 rounded-full bg-foreground"></div>
            <h1 className="text-3xl font-bold">Student Name</h1>
            <Button variant="outline">Message</Button>
          </div>
          <p className="mb-8 leading-[150%]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
          </p>
        </div>
        <div className="flex gap-8">
          <article className="rounded-[0.5rem] border-[1px] border-foreground p-6">
            <h3 className="mb-4 text-2xl font-bold leading-[85%]">
              User details
            </h3>
            <ul className="flex flex-col gap-2">
              <li className="flex flex-col">
                <span className="font-bold text-primary">Email address</span>
                <span>2001022@whatever.com</span>
              </li>
              <li className="flex flex-col">
                <span className="font-bold text-primary">Country</span>
                <span>Egypt</span>
              </li>
              <li className="flex flex-col">
                <span className="font-bold text-primary">City/town</span>
                <span>Cairo</span>
              </li>
              <li className="flex flex-col">
                <span className="font-bold text-primary">Timezone</span>
                <span>Etc/GMT-1</span>
              </li>
            </ul>
          </article>
          <article className="rounded-[0.5rem] border-[1px] border-foreground p-6">
            <h3 className="mb-4 text-2xl font-bold leading-[85%]">
              User Actions
            </h3>
            <ul className="flex flex-col gap-2">
              <li className="flex flex-col">
                <span className="font-bold text-primary">Email address</span>
                <span>2001022@whatever.com</span>
              </li>
            </ul>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Profile;
