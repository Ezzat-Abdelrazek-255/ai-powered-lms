import React from "react";

const QuestionCard = () => {
  return (
    <article className="rounded-[0.8rem] bg-beige p-[3.2rem] py-[6.4rem]">
      <h3 className="mb-[1.6rem] text-center text-[1.6rem] font-bold uppercase text-black">
        What is the primary gas found in the earth&apos;s atmopshere
      </h3>
      <ul className="grid grid-cols-2 gap-[1.6rem] text-black">
        <li className="rounded-full border border-black px-[1.2rem] py-[0.8rem] leading-none">
          Option One
        </li>
        <li className="rounded-full border border-black px-[1.2rem] py-[0.8rem] leading-none">
          Option One
        </li>
        <li className="rounded-full border border-black px-[1.2rem] py-[0.8rem] leading-none">
          Option One
        </li>
        <li className="rounded-full border border-black px-[1.2rem] py-[0.8rem] leading-none">
          Option One
        </li>
      </ul>
    </article>
  );
};

export default QuestionCard;
