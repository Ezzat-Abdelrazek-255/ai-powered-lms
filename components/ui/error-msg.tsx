import { cn } from "@/utils";
import React from "react";
import { motion } from "framer-motion";

const ErrorMsg = ({
  errorMsg,
  className,
}: {
  errorMsg: string;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      className={cn(
        "scale-0 animate-shake rounded-xs bg-red/20 py-[1.2rem] font-semibold text-red",
        className,
      )}
    >
      <span>{errorMsg}</span>
    </motion.div>
  );
};

export default ErrorMsg;
