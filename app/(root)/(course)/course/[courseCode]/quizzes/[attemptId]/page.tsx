"use client";

import QuizQuestion from "@/components/pages/course/quizzes/quiz-question";
import React, { useEffect, useState, useRef, useCallback } from "react";
import PrimaryButton from "@/components/ui/primary-button";
import CourseSectionTitle from "@/components/pages/course/ui/course-section-title";
import { SliderSvg, DeckSvg, ArrowSvg } from "@/components/ui/icons";
import { AnimatePresence, motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";

import { EffectCards } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { Swiper as SwiperType } from "swiper/types";
import { cn } from "@/utils";
import { Quiz } from "@/types/courses";
import { getQuiz } from "@/services/course";
import { createClient } from "@/libs/supabase/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Type for storing answers
interface QuizAnswers {
  [questionId: string]: string;
}

interface AttemptData {
  attempt_id: string;
  student_id: string;
  quiz_id: string;
  expires_at: string;
  quiz: {
    quiz_id: string;
    time_limit_minutes: number;
  };
}

const QuizPage = ({
  params: { attemptId, courseCode },
}: {
  params: { attemptId: string; courseCode: string };
}) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mode, setMode] = useState<"slide" | "cards">("slide");
  const [mount, setMount] = useState(false);
  const [quiz, setQuiz] = useState<Quiz>();
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Timer related states
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [isExpired, setIsExpired] = useState(false);
  const [attemptData, setAttemptData] = useState<AttemptData | null>(null);

  const supabase = createClient();
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hasAutoSubmittedRef = useRef(false);

  const handleAnswerChange = (questionId: string, choiceId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: choiceId }));
  };

  const getSelectedAnswer = (questionId: string): string | null =>
    answers[questionId] || null;

  const validateAnswers = (): boolean =>
    !!quiz && Object.keys(answers).length === quiz.quizQuestion.length;

  // Auto-submit function
  const autoSubmitQuiz = useCallback(async () => {
    if (hasAutoSubmittedRef.current || isSubmitting) return;

    hasAutoSubmittedRef.current = true;

    try {
      toast.error("Time's up! Auto-submitting quiz...");

      const attemptAnswers = Object.entries(answers).map(
        ([questionId, answerId]) => ({
          question_id: questionId,
          answer: answerId,
          attempt_id: attemptId,
        }),
      );

      if (attemptAnswers.length > 0) {
        const { error: answersError } = await supabase
          .from("answer")
          .insert(attemptAnswers);

        if (answersError) throw new Error(answersError.message);
      }

      // Mark attempt as completed
      await supabase
        .from("attempt")
        .update({ status: "completed" })
        .eq("attempt_id", attemptId)
        .select(); // Add select() to see what was updated

      toast.success("Quiz auto-submitted successfully!");
      router.push(`/course/${courseCode}/quizzes`);
    } catch (err) {
      console.error("Auto-submission error:", err);
      toast.error("Failed to auto-submit quiz");
    }
  }, [answers, attemptId, supabase, router, courseCode, isSubmitting]);

  // Manual submit function
  const handleSubmitQuiz = async () => {
    if (!quiz || isSubmitting || isExpired) {
      if (isExpired) {
        toast.error("Quiz has expired");
        return;
      }
      if (!quiz) {
        toast.error("Quiz data not loaded");
        return;
      }
    }

    if (!validateAnswers()) {
      toast.error("Please answer all questions before submitting");
      return;
    }

    try {
      setIsSubmitting(true);

      const attemptAnswers = Object.entries(answers).map(
        ([questionId, answerId]) => ({
          question_id: questionId,
          answer: answerId,
          attempt_id: attemptId,
        }),
      );

      const { error: answersError } = await supabase
        .from("answer")
        .insert(attemptAnswers);

      if (answersError) throw new Error(answersError.message);

      // Update attempt status with debugging
      await supabase
        .from("attempt")
        .update({ status: "completed" })
        .eq("attempt_id", attemptId)
        .select(); // Add select() to see what was updated

      toast.success("Quiz submitted successfully!");
      router.push(`/course/${courseCode}/quizzes`);
    } catch (err) {
      console.error("Quiz submission error:", err);
      if (err instanceof Error)
        toast.error(err.message || "Failed to submit quiz");
      setIsSubmitting(false);
    }
  };

  // Timer logic
  const startTimer = useCallback(
    (expiresAt: string) => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      const updateTimer = () => {
        const now = new Date();
        const expiry = new Date(expiresAt);
        const diff = expiry.getTime() - now.getTime();

        if (diff <= 0) {
          setTimeRemaining(0);
          setIsExpired(true);
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          // Auto-submit when time runs out
          autoSubmitQuiz();
        } else {
          setTimeRemaining(Math.floor(diff / 1000)); // Convert to seconds
        }
      };

      updateTimer();
      timerRef.current = setInterval(updateTimer, 1000);
    },
    [autoSubmitQuiz],
  );

  // Format time display
  const formatTime = (seconds: number | null): string => {
    if (seconds === null) return "--:--";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  // Setup real-time subscription
  useEffect(() => {
    if (!attemptData) return;

    const subscription = supabase
      .channel("attempt_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "attempt",
          filter: `attempt_id=eq.${attemptId}`,
        },
        (payload) => {
          console.log("Attempt updated:", payload);
          if (payload.eventType === "UPDATE" && payload.new.expires_at) {
            startTimer(payload.new.expires_at);
          }
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [attemptData, attemptId, supabase, startTimer]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => setMount(true), []);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("attempt")
          .select("*, quiz(*)")
          .eq("attempt_id", attemptId)
          .single();

        if (error || !data.quiz?.quiz_id) throw error;

        setAttemptData(data);

        // Start timer if expires_at is available
        if (data.expires_at) {
          startTimer(data.expires_at);
        }

        const quizData = await getQuiz(supabase, data?.quiz?.quiz_id);
        setQuiz(quizData);
      } catch (err) {
        console.error("Failed to fetch quiz:", err);
        toast.error("Failed to load quiz");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [supabase, attemptId]);

  if (isLoading || !quiz) {
    return (
      <div className="relative flex min-h-[calc(100vh-var(--header-height))] flex-col items-center justify-center px-[var(--container-px)]">
        <div className="text-white">Loading quiz...</div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[calc(100vh-var(--header-height))] max-w-[calc(100vw-3px)] flex-col overflow-hidden px-[var(--container-px)] pb-[6.4rem]">
      <div className="mb-[2.4rem] flex w-full items-center justify-between border-b-[1px] border-b-white/20 pb-[2.4rem] pt-[3.2rem]">
        <div className="max-w-[var(--container-max-width)] space-y-[1.6rem]">
          <CourseSectionTitle>{quiz.title}</CourseSectionTitle>
          <p className="text-white/80">
            {quiz &&
              new Intl.DateTimeFormat("en-GB", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
              }).format(new Date(quiz?.availableDate || ""))}
          </p>
        </div>

        {/* Timer Display */}
        <div
          className={cn(
            "text-xl font-bold transition-colors",
            isExpired
              ? "text-red-500"
              : timeRemaining !== null && timeRemaining < 300
                ? "text-yellow-500"
                : "text-white",
          )}
        >
          {timeRemaining !== null ? (
            <div className="text-center">
              <div className="font-mono text-2xl">
                {formatTime(timeRemaining)}
              </div>
              <div className="text-xs uppercase tracking-wide text-white/60">
                {isExpired ? "Expired" : "Time Left"}
              </div>
            </div>
          ) : (
            <div className="text-white/60">--:--</div>
          )}
        </div>
      </div>

      {/* Expired Warning */}
      {isExpired && (
        <div className="bg-red-500/20 border-red-500/50 mb-4 rounded-lg border p-4 text-center">
          <p className="text-red-400 font-semibold">
            Quiz has expired! Your answers are being auto-submitted.
          </p>
        </div>
      )}

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
          {swiperInstance &&
            quiz.quizQuestion.map((question) => (
              <SwiperSlide
                key={question.questionOrder}
                className="last:pr-[8rem]"
              >
                <QuizQuestion
                  index={question.questionOrder}
                  swiperInstance={swiperInstance}
                  question={question}
                  onSubmit={handleSubmitQuiz}
                  selectedAnswer={getSelectedAnswer(
                    question.question.questionId,
                  )}
                  onAnswerChange={handleAnswerChange}
                  isLastQuestion={
                    quiz.quizQuestion.length === question.questionOrder
                  }
                  totalQuestions={quiz.quizQuestion.length}
                />
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
              (activeIndex === 0 || isExpired) && "opacity-50",
            )}
            onClick={() => swiperInstance?.slidePrev()}
            disabled={activeIndex === 0 || isExpired}
          >
            <ArrowSvg className="h-[1.2rem] w-[1.2rem] -rotate-[135deg] fill-white" />
          </Button>

          <Button
            aria-label="next question"
            className={cn(
              "h-16 w-16 border-[1px] border-white/40 bg-gray-dark p-[1rem] transition-colors hover:bg-gray-dark/60",
              (activeIndex === quiz.quizQuestion.length - 1 || isExpired) &&
              "opacity-50",
            )}
            onClick={() => swiperInstance?.slideNext()}
            disabled={activeIndex === quiz.quizQuestion.length - 1 || isExpired}
          >
            <ArrowSvg className="h-[1.2rem] w-[1.2rem] rotate-45 fill-white" />
          </Button>
        </div>
        <ul className="absolute left-1/2 top-1/2 flex w-fit -translate-x-1/2 -translate-y-1/2 items-center gap-[0.8rem] rounded-xs bg-gray-dark p-[0.8rem] font-mono text-[1.2rem] leading-[85%]">
          {quiz.quizQuestion.map((_, i) => (
            <li
              key={i}
              className={`relative z-base grid h-[2.8rem] w-[2.8rem] place-content-center`}
            >
              <button
                onClick={() => swiperInstance?.slideTo(i)}
                disabled={isExpired}
                className={cn(isExpired && "opacity-50")}
              >
                {activeIndex === i && (
                  <motion.div
                    layoutId="pagination"
                    className="absolute inset-0 z-hidden h-full w-full rounded-xs bg-black"
                    initial={false}
                  ></motion.div>
                )}
                <span>{i + 1}</span>
              </button>
            </li>
          ))}
        </ul>
        <PrimaryButton
          className="justify-self-center"
          onClick={handleSubmitQuiz}
          disabled={isSubmitting || isExpired}
        >
          {isSubmitting
            ? "Submitting..."
            : isExpired
              ? "Expired"
              : "Finish Attempt"}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default QuizPage;
