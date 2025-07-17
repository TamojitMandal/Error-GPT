<<<<<<< HEAD
import Hero from "@/components/hero";
=======
"use client";

import { useState } from "react";
>>>>>>> 817c712d5d6019e8fd9b85171464a844a33534f7
import Image from "next/image";
import { motion } from "framer-motion";
import { assets } from "../../assets/assets";
import Sidebar from "../../comonents/Sidebar";
import PromtBox from "../../comonents/Promtbox";
import Message from "../../comonents/Message";

export default function Home() {
<<<<<<< HEAD
  return (
    <Hero />
=======
  const [expand, setExpand] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex h-screen bg-gradient-to-br from-black via-[#1a1a1d] to-black text-white overflow-hidden font-sans relative">
      {/* Sidebar */}
      <Sidebar expand={expand} setExpand={setExpand} />

      {/* Floating open button for mobile when sidebar is collapsed */}
      {/* {!expand && (
        <button
          onClick={() => setExpand(true)}
          className="md:hidden fixed top-4 left-4 z-50 bg-white/10 backdrop-blur-md p-2 rounded-xl shadow-lg hover:scale-105 transition-all"
        >
          <Image
            src={assets.menu_icon}
            alt="Open Sidebar"
            width={24}
            height={24}
          />
        </button>
      )} */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col px-4 pb-6 pt-20 md:pt-10 relative backdrop-blur-lg bg-white/5 border-l border-white/10 overflow-y-auto">
        <div className="md:hidden absolute top-4 right-4 px-4 z-20 flex items-center justify-end w-full pointer-events-none">
          <Image
            src={assets.chat_icon}
            alt="Chat"
            width={24}
            height={24}
            className="opacity-70 hover:opacity-100 transition-opacity duration-200 pointer-events-auto"
          />
        </div>

        {/* Message Section */}
        <div className="w-full max-w-2xl mx-auto mt-10 space-y-4 px-2 sm:px-4">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center text-center bg-white/10 p-6 rounded-xl border border-white/20 shadow-xl backdrop-blur-md"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={assets.logo_icon}
                  alt="Logo"
                  width={64}
                  height={64}
                  className="h-16 w-16 hover:scale-105 transition-transform duration-300"
                />
                <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-md">
                  Hi, I&apos;m ErrorGpt
                </p>
              </div>
              <p className="text-sm mt-3 text-white/70">
                How can I help you today?
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Message role={msg.role} content={msg.content} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Prompt Box */}
        <div className="w-full max-w-2xl mx-auto mt-auto px-2 sm:px-4 pt-6">
          <PromtBox
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setMessages={setMessages}
          />
        </div>

        {/* Footer Note */}
        <p className="text-xs text-center text-gray-400 tracking-wide mt-4">
          AI generated, for reference only
        </p>
      </div>
    </div>
>>>>>>> 817c712d5d6019e8fd9b85171464a844a33534f7
  );
}
