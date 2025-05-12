import React from "react";
import AbstractSvg from "../../../../public/vectors/abstract-1.svg";
import AbstractSvg2 from "../../../../public/vectors/abstract-2.svg";
import AbstractSvg3 from "../../../../public/vectors/abstract-3.svg";
import AbstractSvg4 from "../../../../public/vectors/abstract-5.svg";
import PrimaryButton from "@/components/ui/primary-button";

const ParticipantCard = () => {
  return (
    <article className="rounded-sm bg-beige p-[1.6rem] text-black">
      <div className="mb-[2.4rem] flex items-center justify-between">
        <div className="flex items-center gap-[1.2rem]">
          <div className="aspect-square w-[4rem] rounded-full bg-black"></div>
          <div className="flex flex-col gap-[0.8rem]">
            <h3 className="text-[1.6rem] font-bold leading-[85%]">
              Student Title
            </h3>
            <p className="font-mono text-[1rem] leading-[85%] text-black/80">
              Last access to course: 2 secs
            </p>
          </div>
        </div>
        <PrimaryButton variant="secondary">Message</PrimaryButton>
      </div>
      <ul className="font-mono text-[1.2rem] uppercase">
        <li className="flex items-center gap-[0.8rem] border-y-[1px] border-y-black/20 py-[0.8rem]">
          <AbstractSvg className="w-[1.6rem] fill-black" />
          <div className="space-x-1">
            <span className="font-bold">Role:</span>
            <span>Student</span>
          </div>
        </li>
        <li className="flex items-center gap-[0.8rem] border-b-[1px] border-b-black/20 py-[0.8rem]">
          <AbstractSvg2 className="w-[1.6rem] fill-black" />
          <div className="space-x-1">
            <span className="font-bold">Academic year:</span>
            <span>Junior</span>
          </div>
        </li>
        <li className="flex items-center gap-[0.8rem] border-b-[1px] border-b-black/20 py-[0.8rem]">
          <AbstractSvg3 className="w-[1.6rem] fill-black" />
          <div className="space-x-1">
            <span className="font-bold">Department:</span>
            <span>Computer and Systems</span>
          </div>
        </li>
        <li className="flex items-center gap-[0.8rem] pt-[0.8rem]">
          <AbstractSvg4 className="w-[1.6rem] fill-black" />
          <div className="space-x-1">
            <span className="font-bold">Course Registration Date:</span>
            <span>Student</span>
          </div>
        </li>
      </ul>
    </article>
  );
};

export default ParticipantCard;
