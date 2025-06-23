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

interface Message {
  role: "user" | "assistant";
  content: string;
  fileName?: string;
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom when new message arrives
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-expand textarea height
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

    // Add user message
    setMessages((prev) => [
      ...prev,
      { role: "user", content: inputText.trim(), fileName: file?.name },
    ]);

    // Prepare form data
    const formData = new FormData();
    formData.append("prompt", inputText.trim());
    if (file) formData.append("file", file);

    setInputText("");
    setFile(null);
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    try {
      const response = await fetch("http://127.0.0.1/generate", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error: Unable to fetch response." },
      ]);
    }
  };

  return (
    <div
      className={cn(
        "flex h-full flex-col justify-center",
        messages.length > 0 && "justify-between",
      )}
    >
      {/* Chat window */}
      {messages.length > 0 && (
        <div className="flex flex-1 flex-col space-y-4 overflow-auto p-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[75%] whitespace-pre-wrap rounded-lg p-3 ${msg.role === "user"
                  ? "bg-blue-500 self-end text-white"
                  : "self-start bg-white text-gray-800"
                }`}
            >
              {msg.content}
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

      {/* Input area */}
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
            type="submit"
            disabled={!inputText.trim()}
          >
            Send
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default ChatPage;
