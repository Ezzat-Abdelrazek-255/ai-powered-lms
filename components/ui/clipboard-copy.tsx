"use client";

import { CheckCircleIcon, Copy } from "lucide-react";
import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { useMounted } from "@/hooks/use-mounted";

type ClipboardCopy = CopyToClipboard.Props & { ariaLabel: string };

const ClipboardCopy = ({ ariaLabel, ...props }: ClipboardCopy) => {
  const [isCopied, setIsCopied] = useState(false);
  const isMounted = useMounted();

  const handleCopy = function() {
    setIsCopied(true);
    toast.success("Successfully Copied!");
    setTimeout(() => setIsCopied(false), 800);
  };

  const variants = {
    visible: { scale: 1 },
    hidden: { scale: 0 },
  };

  return (
    <CopyToClipboard onCopy={handleCopy} {...props}>
      <button aria-label={ariaLabel}>
        <AnimatePresence mode="popLayout">
          {isCopied ? (
            <motion.div
              className="rounded-xs px-[0.8rem] py-[0.4rem]"
              variants={variants}
              key="check"
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <CheckCircleIcon className="w-[1.6rem]" />
            </motion.div>
          ) : (
            <motion.div
              className="rounded-xs px-[0.8rem] py-[0.4rem] text-white/60 transition-colors hover:bg-white/20"
              variants={variants}
              key="copy"
              initial={isMounted ? "hidden" : false}
              animate="visible"
              exit="hidden"
            >
              <Copy className="w-[1.6rem]" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </CopyToClipboard>
  );
};

export default ClipboardCopy;
