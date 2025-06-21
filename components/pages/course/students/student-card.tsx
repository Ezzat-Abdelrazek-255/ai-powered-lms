import React from "react";
import AbstractSvg from "../../../../public/vectors/abstract-1.svg";
import AbstractSvg2 from "../../../../public/vectors/abstract-2.svg";
import AbstractSvg3 from "../../../../public/vectors/abstract-3.svg";
import AbstractSvg4 from "../../../../public/vectors/abstract-5.svg";
import { Student } from "@/types/courses";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StudentCard = ({ user }: { user: Student }) => {
  return (
    <article className="rounded-sm bg-beige p-[1.6rem] text-black">
      <div className="mb-[1.6rem] flex items-center justify-between">
        <div className="flex items-center gap-[1.2rem]">
          <div className="relative aspect-square w-[4rem] overflow-hidden rounded-full bg-black">
            <Image
              width={40}
              height={40}
              src={`${user.profileImageUrl}?u=${user.userId}`}
              alt={user.name}
              className="h-full w-full object-cover"
            />
          </div>
          <h3 className="text-[1.6rem] font-bold leading-none">{user.name}</h3>
        </div>
        <Button variant="secondary" asChild>
          <Link href={`mailto:${user.email}`}>Message</Link>
        </Button>
      </div>
      <ul className="font-mono text-[1.2rem] uppercase">
        <li className="flex items-center gap-[0.8rem] border-y-[1px] border-y-black/20 py-[0.8rem]">
          <AbstractSvg className="w-[1.6rem] fill-black" />
          <div className="space-x-1">
            <span className="font-bold">Birth Date:</span>
            <span>{user.birthdate}</span>
          </div>
        </li>
        <li className="flex items-center gap-[0.8rem] border-b-[1px] border-b-black/20 py-[0.8rem]">
          <AbstractSvg2 className="w-[1.6rem] fill-black" />
          <div className="space-x-1">
            <span className="font-bold">Academic year:</span>
            <span>{user.level}</span>
          </div>
        </li>
        <li className="flex items-center gap-[0.8rem] border-b-[1px] border-b-black/20 py-[0.8rem]">
          <AbstractSvg3 className="w-[1.6rem] fill-black" />
          <div className="space-x-1">
            <span className="font-bold">Department:</span>
            <span>{user.major}</span>
          </div>
        </li>
        <li className="flex items-center gap-[0.8rem] pt-[0.8rem]">
          <AbstractSvg4 className="w-[1.6rem] fill-black" />
          <div className="space-x-1">
            <span className="font-bold">Email address:</span>
            <span>{user.email}</span>
          </div>
        </li>
      </ul>
    </article>
  );
};

export default StudentCard;
