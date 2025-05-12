"use client";

import QuizQuestion from "@/components/pages/course/quizzes/quiz-question";
import React, { useEffect, useState } from "react";
import PrimaryButton from "@/components/ui/primary-button";
import CourseSectionTitle from "@/components/pages/course/ui/course-section-title";
import SliderSvg from "../../../../../../public/vectors/slider.svg";
import DeckSvg from "../../../../../../public/vectors/deck.svg";
import ArrowSvg from "../../../../../../public/vectors/arrow.svg";
import { AnimatePresence, motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";

import { EffectCards } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { Swiper as SwiperType } from "swiper/types";
import { cn } from "@/lib/utils";

const QuizPage = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mode, setMode] = useState("slide");
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <div className="relative flex min-h-[calc(100vh-var(--header-height))] flex-col px-[var(--container-px)] pb-[6.4rem]">
      <div className="mb-[2.4rem] border-b-[1px] border-b-white/20 pb-[2.4rem] pt-[3.2rem]">
        <div className="mx-auto max-w-[var(--container-max-width)] space-y-[1.6rem]">
          <CourseSectionTitle>Quiz 1</CourseSectionTitle>
          <p className="text-white/80">Tuesday 12 November 2024</p>
        </div>
      </div>
      <div className="mx-auto mb-[11rem] flex flex-col">
        <div>
          <div className="mb-[0.8rem] flex w-fit items-center rounded-xs border-[1px] border-white/20 bg-gray-dark p-[0.8rem]">
            <button
              onClick={() => setMode("slide")}
              className={cn(
                "relative z-0 grid h-[4.4rem] w-[4.4rem] place-content-center text-white/60 transition-colors duration-500",
                mode === "slide" && "text-primary",
              )}
            >
              {mode === "slide" && (
                <motion.div
                  layoutId="mode"
                  className="absolute inset-0 z-hidden aspect-square h-full w-full rounded-xs bg-black"
                ></motion.div>
              )}
              <SliderSvg className="h-[2.4rem] w-[2.4rem]" data-fade-x="1" />
            </button>
            <button
              onClick={() => setMode("cards")}
              className={cn(
                "relative z-0 grid h-[4.4rem] w-[4.4rem] place-content-center text-white/60 transition-colors duration-500",
                mode === "cards" && "text-primary",
              )}
            >
              {mode === "cards" && (
                <motion.div
                  layoutId="mode"
                  className="absolute inset-0 z-hidden aspect-square h-full w-full rounded-xs bg-black"
                ></motion.div>
              )}
              <DeckSvg className="h-[2rem] w-[2rem]" />
            </button>
          </div>
        </div>
        <div className="flex text-center leading-[85%]">
          {/*   {mode === "slide" && ( */}
          {/*     <motion.p */}
          {/*       layoutId="modeTitle" */}
          {/*       className="flex flex-col overflow-hidden pl-[1rem] font-mono text-[1.2rem] uppercase" */}
          {/*     > */}
          {/*       <span className="overflow-hidden"> */}
          {/*         <motion.span */}
          {/*           className="inline-block -translate-y-full" */}
          {/*           animate={{ y: "0" }} */}
          {/*           exit={{ y: "-100%" }} */}
          {/*         > */}
          {/*           Slider */}
          {/*         </motion.span> */}
          {/*       </span> */}
          {/*       <span className="text-white/60">Mode</span> */}
          {/*     </motion.p> */}
          {/*   )} */}

          {
            <motion.p
              layout
              className={cn(
                "flex flex-col overflow-hidden pl-[1rem] font-mono text-[1.2rem] uppercase",
                mode === "cards" && "ml-auto pr-[1.4rem]",
              )}
            >
              <span className="relative overflow-hidden">
                <AnimatePresence mode="popLayout">
                  {mode === "cards" ? (
                    <motion.span
                      className="inline-block"
                      animate={{ y: 0 }}
                      initial={{ y: "100%" }}
                      exit={{ y: "100%" }}
                      transition={{ ease: "easeOut", duration: 0.5 }}
                    >
                      Stack
                    </motion.span>
                  ) : (
                    <motion.span
                      key="slide-title"
                      className="inline-block"
                      animate={{ y: 0 }}
                      initial={{ y: mount ? "-100%" : "0" }}
                      exit={{ y: "-100%" }}
                      transition={{ ease: "easeOut", duration: 0.5 }}
                    >
                      Slider
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
              <span className="text-white/60">Mode</span>
            </motion.p>
          }
        </div>
      </div>
      <div className="mb-[8rem]">
        <Swiper
          key={mode}
          spaceBetween={16}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          slidesPerView="auto"
          onSwiper={(swiper) => setSwiperInstance(swiper)}
          modules={[EffectCards]}
          initialSlide={activeIndex}
          effect={mode}
          cardsEffect={{
            slideShadows: false,
          }}
          grabCursor={true}
          speed={500}
        >
          {[...new Array(11)].map((_, i) => (
            <SwiperSlide key={i} className="last:pr-[8rem]">
              <QuizQuestion index={i} swiperInstance={swiperInstance} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="relative z-base flex items-center justify-between pr-[calc(var(--container-px)*2)]">
        <div className="flex items-center gap-[1rem]">
          <Button
            aria-label="previous question"
            className={cn(
              "h-16 w-16 border-[1px] border-white/40 bg-gray-dark p-[1rem] transition-colors hover:bg-gray-dark/60",
              activeIndex === 0 && "opacity-50",
            )}
            onClick={() => swiperInstance?.slidePrev()}
          >
            <ArrowSvg className="h-[1.2rem] w-[1.2rem] -rotate-[135deg] fill-white" />
          </Button>

          <Button
            aria-label="next question"
            className={cn(
              "h-16 w-16 border-[1px] border-white/40 bg-gray-dark p-[1rem] transition-colors hover:bg-gray-dark/60",
              activeIndex === 10 && "opacity-50",
            )}
            onClick={() => swiperInstance?.slideNext()}
          >
            <ArrowSvg className="h-[1.2rem] w-[1.2rem] rotate-45 fill-white" />
          </Button>
        </div>
        <ul className="absolute left-1/2 top-1/2 flex w-fit -translate-x-1/2 -translate-y-1/2 items-center gap-[0.8rem] rounded-xs bg-gray-dark p-[0.8rem] font-mono text-[1.2rem] leading-[85%]">
          {[...new Array(11)].map((_, i) => (
            <li
              key={i}
              className={`relative z-base grid h-[2.8rem] w-[2.8rem] place-content-center`}
            >
              <button onClick={() => swiperInstance?.slideTo(i)}>
                {activeIndex === i && (
                  <motion.div
                    layoutId="pagination"
                    className="absolute inset-0 z-hidden h-full w-full rounded-xs bg-black"
                  ></motion.div>
                )}
                <span>{i + 1}</span>
              </button>
            </li>
          ))}
        </ul>
        <PrimaryButton className="justify-self-center">
          Finish Attempt
        </PrimaryButton>
      </div>
    </div>
  );
};

export default QuizPage;
