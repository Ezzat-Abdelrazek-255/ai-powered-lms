"use client";
import PrimaryButton from "@/components/ui/primary-button";
import { createClient } from "@/libs/supabase/client";
import { getUserMetadata } from "@/utils";
import { useRouter } from "@bprogress/next/app";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CreateAttempt = ({
  quizId,
  courseId,
}: {
  quizId: string | undefined;
  courseId: string;
}) => {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = async function() {
    try {
      setIsLoading(true);
      const user = await getUserMetadata(supabase);
      const { data, error } = await supabase
        .from("attempt")
        .insert({
          student_id: user.id,
          quiz_id: quizId,
        })
        .select()
        .single();

      if (error) throw error;

      router.push(`/course/${courseId}/quizzes/${data.attempt_id}`);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      if (error instanceof Error)
        toast.error("Attempt failed. Please try again.");
    }
  };

  return (
    <PrimaryButton
      onClick={handleClick}
      isLoading={isLoading}
      loadingText="Loading Quiz"
      variant="secondary"
      className="ml-auto w-fit disabled:bg-black/80"
    >
      Attempt
    </PrimaryButton>
  );
};

export default CreateAttempt;
