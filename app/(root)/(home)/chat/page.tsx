"use client";

import { Input } from "@/components/ui/input";
import PrimaryButton from "@/components/ui/primary-button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/utils";
import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  FormEvent,
} from "react";

interface QuizQuestion {
  number: number;
  question: string;
  type: "Multiple Choice" | "True False" | "Short Answer" | "Essay";
  options: string[];
}

interface Message {
  role: "user" | "assistant";
  content?: string;
  fileName?: string;
  title?: string;
  paragraphs?: string[];
  quizQuestions?: QuizQuestion[];
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() && !file) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: inputText.trim(), fileName: file?.name },
    ]);

    const formData = new FormData();
    formData.append("text", inputText.trim());
    if (file) formData.append("file", file);

    setInputText("");
    setFile(null);
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    try {
      setIsLoading(true);
      const response = await fetch("http://127.0.0.1:5000/generate", {
        method: "POST",
        body: formData,
      });

      const contentType = response.headers.get("Content-Type");

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log("✅ JSON Response:", data);

        // Detect and render quiz questions if present
        const quizItems =
          data?.response?.[0]?.paragraphs?.[0]?.response?.[0]?.paragraphs;
        const isQuizFormat = Array.isArray(quizItems) && quizItems[0]?.question;

        if (isQuizFormat) {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: "Here are your generated quiz questions:",
              title: "Quiz",
              quizQuestions: quizItems,
            },
          ]);
        } else if (Array.isArray(data.response)) {
          data.response.forEach(
            (item: { title: string; paragraphs: string[] }) =>
              setMessages((prev) => [
                ...prev,
                {
                  role: "assistant",
                  title: item.title,
                  paragraphs: item.paragraphs,
                },
              ]),
          );
        } else if (data.download_url) {
          window.open(`http://127.0.0.1:5000${data.download_url}`, "_blank");
        }
      } else {
        // It's a file (PDF, DOCX, PPTX)
        const blob = await response.blob();
        const fileURL = URL.createObjectURL(blob);

        let filename = "downloaded_file";
        const contentDisposition = response.headers.get("Content-Disposition");
        if (contentDisposition && contentDisposition.includes("filename=")) {
          filename = contentDisposition
            .split("filename=")[1]
            .replaceAll('"', "")
            .trim();
        }

        const a = document.createElement("a");
        a.href = fileURL;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(fileURL);

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `Generated file: ${filename} (download started)`,
            title: "File Ready",
          },
        ]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "There was an error, Please try again",
          title: "Error",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "flex h-full flex-col justify-center",
        messages.length > 0 && "justify-between",
      )}
    >
      {messages.length > 0 && (
        <div className="mx-auto flex w-1/2 flex-1 flex-col space-y-8 overflow-auto py-[4rem]">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[75%] whitespace-pre-wrap rounded-sm py-3 ${
                msg.role === "user"
                  ? "self-end bg-gray-light p-[1.6rem] text-white"
                  : "self-start bg-transparent"
              }`}
            >
              <div>
                {msg.title && (
                  <h2 className="mb-[0.8rem] text-[2.4rem] font-bold">
                    {msg.title}
                  </h2>
                )}

                {msg.quizQuestions ? (
                  <ul className="space-y-4 text-[1.6rem]">
                    {msg.quizQuestions.map((q) => (
                      <li key={q.number}>
                        <p className="font-semibold">
                          {q.number}. {q.question}{" "}
                          <span className="text-sm italic text-gray-500">
                            ({q.type})
                          </span>
                        </p>
                        {q.options.length > 0 && (
                          <ul className="ml-4 mt-2 list-disc space-y-1">
                            {q.options.map((opt, i) => (
                              <li key={i}>{opt}</li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : msg.paragraphs ? (
                  <div className="space-y-4 text-[1.6rem] leading-[150%]">
                    {msg.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-[1.6rem] leading-[150%]">{msg.content}</p>
                )}
              </div>

              {msg.fileName && (
                <div className="mt-2 text-sm italic">
                  Attached file: {msg.fileName}
                </div>
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className={cn(
          "mx-auto flex w-1/2 items-end gap-[1.6rem] rounded-sm border border-black bg-beige p-[1.6rem]",
          messages.length > 0 && "justify-self-end",
        )}
      >
        <div className="relative w-full">
          <Textarea
            ref={textareaRef}
            value={inputText}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="h-full text-[1.6rem]"
            rows={1}
            name="text"
          />
        </div>
        <div className="flex flex-shrink flex-col gap-[0.4rem]">
          <Input
            type="file"
            accept="*"
            onChange={handleFileChange}
            variant="outline"
            className="h-auto py-[0.8rem] text-[1rem]"
            name="file"
          />
          <PrimaryButton
            variant="secondary"
            isLoading={isLoading}
            type="submit"
            loadingText="Thinking..."
            disabled={!inputText.trim() && !file}
          >
            Send
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default ChatPage;
