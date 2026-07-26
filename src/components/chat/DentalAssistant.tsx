"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useChat } from "ai/react";
import {
  MessageSquare,
  X,
  Send,
  User,
  ChevronRight,
  Loader2,
  Calendar,
  HelpCircle
} from "lucide-react";

const SUGGESTED_PROMPTS = [
  { text: "How much is teeth whitening?", category: "pricing" },
  { text: "Do you take emergency patients?", category: "emergency" },
  { text: "What are your opening hours?", category: "hours" },
  { text: "Do you accept PPO insurance?", category: "insurance" }
];

export default function DentalAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessageAlert, setHasNewMessageAlert] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading
  } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: "Hello! I am Aura, your virtual DentalHub assistant. I can help answer questions about our services (Whitening, Implants, Invisalign), clinical fees, insurance PPOs, or emergency pain relief guidelines. How can I help you today?"
      }
    ]
  });

  // Scroll to bottom when messages list updates
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    // Highlight notification indicator if widget is closed and new message streams
    if (!isOpen && messages.length > 1) {
      setHasNewMessageAlert(true);
    }
  }, [messages, isOpen]);

  // Click Suggested Chip
  const handleChipClick = (promptText: string) => {
    // Let's write the chip click trigger with a small timeout:
    handleInputChange({ target: { value: promptText } } as unknown as React.ChangeEvent<HTMLInputElement>);
    setTimeout(() => {
      handleSubmit();
    }, 50);
  };


  // Helper to parse markdown links: [label](href)
  const renderMessageContent = (content: string) => {
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(content)) !== null) {
      const matchIndex = match.index;
      if (matchIndex > lastIndex) {
        parts.push(content.substring(lastIndex, matchIndex));
      }
      const linkText = match[1];
      const linkUrl = match[2];

      parts.push(
        <Link
          key={matchIndex}
          href={linkUrl}
          onClick={() => setIsOpen(false)}
          className="inline-flex items-center gap-1 text-[#0F766E] hover:text-[#0D6962] font-bold underline bg-[#F0FDF4] hover:bg-[#E0FDF0] px-2.5 py-1.5 rounded-xl border border-[#0F766E]/20 text-xs my-1 shadow-sm transition-all"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>{linkText}</span>
          <ChevronRight className="w-3 h-3" />
        </Link>
      );
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex));
    }

    return parts.length > 0 ? parts : content;
  };

  const handleOpenToggle = () => {
    setIsOpen(!isOpen);
    setHasNewMessageAlert(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* 1. Chat Drawer Window */}
      {isOpen && (
        <div className="bg-white w-[350px] sm:w-[380px] h-[520px] rounded-[2.5rem] border border-slate-100 shadow-2xl flex flex-col justify-between overflow-hidden mb-4 animate-fade-in animate-slide-up">
          
          {/* Header */}
          <div className="bg-[#0F172A] text-white p-5 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              {/* Aura Avatar */}
              <div className="relative w-10 h-10 rounded-full bg-[#F0FDF4] flex items-center justify-center border-2 border-[#0F766E]">
                <User className="w-5 h-5 text-[#0F766E]" />
                {/* Online pulse dot */}
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-[#0F172A] animate-pulse"></span>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-extrabold text-sm tracking-tight text-white flex items-center gap-1">
                  <span>Aura</span>
                  <span className="inline-flex items-center text-[9px] bg-emerald-950/40 text-emerald-400 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                    Online
                  </span>
                </span>
                <span className="text-[10px] text-slate-400 font-semibold">Senior Reception Specialist</span>
              </div>
            </div>
            
            {/* Close Button */}
            <button
              onClick={handleOpenToggle}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors outline-none"
              aria-label="Close assistant chat drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-5 bg-slate-50 flex flex-col gap-4">
            {messages.map((msg) => {
              const isAssistant = msg.role === "assistant";
              return (
                <div
                  key={msg.id}
                  className={`flex ${isAssistant ? "justify-start" : "justify-end"} animate-fade-in`}
                >
                  <div
                    className={`max-w-[82%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm flex flex-col gap-1.5 ${
                      isAssistant
                        ? "bg-white text-slate-700 border border-slate-100/80 rounded-tl-sm"
                        : "bg-[#0F766E] text-white rounded-tr-sm"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">
                      {isAssistant ? renderMessageContent(msg.content) : msg.content}
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Loading text indicator */}
            {isLoading && (
              <div className="flex justify-start items-center gap-2 animate-pulse text-slate-400 text-xs font-semibold p-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#0F766E]" />
                <span>Aura is drafting message...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Suggested Prompts Chips */}
          {messages.length === 1 && !isLoading && (
            <div className="bg-slate-50 px-5 pb-2 pt-0 flex flex-wrap gap-2">
              {SUGGESTED_PROMPTS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleChipClick(p.text)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 hover:border-[#0F766E] text-slate-600 hover:text-[#0F766E] rounded-xl text-xs font-semibold text-left transition-all shadow-sm outline-none"
                >
                  <HelpCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{p.text}</span>
                </button>
              ))}
            </div>
          )}

          {/* Input Footer Form */}
          <form
            onSubmit={handleSubmit}
            className="p-4 bg-white border-t border-slate-100 flex items-center gap-3.5"
          >
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask Aura a dental query..."
              className="flex-1 bg-slate-50 focus:bg-white border border-slate-100 focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] rounded-xl px-4 py-3 text-sm transition-all outline-none"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-3 bg-[#0F766E] hover:bg-[#0D6962] text-white disabled:bg-slate-200 disabled:text-slate-400 rounded-xl transition-all shadow-sm outline-none cursor-pointer"
              aria-label="Send query"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

      {/* 2. Floating Action Button */}
      <button
        onClick={handleOpenToggle}
        className={`relative p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 outline-none cursor-pointer flex items-center justify-center group ${
          isOpen ? "bg-[#0F172A] text-white hover:bg-slate-800" : "bg-[#0F766E] text-white hover:bg-[#0D6962]"
        }`}
        aria-label="Toggle Aura Chatbot assistant"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6 animate-pulse" />}

        {/* Pulse indicator dot (New Message alert) */}
        {!isOpen && hasNewMessageAlert && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500 text-[9px] text-white font-extrabold items-center justify-center shadow-md">
              1
            </span>
          </span>
        )}
      </button>

    </div>
  );
}
