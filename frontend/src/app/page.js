'use client';

import { useState } from "react";
import Image from "next/image";
import { assets } from "../../assets/assets";
import Sidebar from "../../comonents/Sidebar";
import PromtBox from "../../comonents/Promtbox";
import Message from "../../comonents/Message";

export default function Home() {
  const [expand, setExpand] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex h-screen bg-gradient-to-br from-black via-[#1a1a1d] to-black text-white overflow-hidden font-sans">
      {/* Sidebar */}
      <Sidebar expand={expand} setExpand={setExpand} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8 relative backdrop-blur-md bg-white/5 border-l border-white/10 overflow-y-auto">

        {/* Mobile Top Bar */}
        <div className="md:hidden absolute px-4 top-6 flex items-center justify-between w-full z-10">
          <Image
            src={assets.menu_icon}
            alt="Menu"
            width={24}
            height={24}
            onClick={() => setExpand(!expand)}
            className={`cursor-pointer transition-transform duration-300 hover:scale-110 ${expand ? 'rotate-180' : ''}`}
          />
          <Image
            src={assets.chat_icon}
            alt="Chat"
            width={24}
            height={24}
            className="opacity-70 hover:opacity-100 transition-opacity duration-200"
          />
        </div>

        {/* Message Section */}
        <div className="w-full max-w-2xl mt-24 space-y-4 px-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center text-center bg-white/10 p-6 rounded-xl border border-white/20 shadow-md transition-all duration-500 ease-in-out hover:shadow-white/20">
              <div className="flex items-center gap-3">
                <Image
                  src={assets.logo_icon}
                  alt="Logo"
                  width={64}
                  height={64}
                  className="h-16 w-16 hover:scale-105 transition-transform duration-300"
                />
                <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-md">
                  Hi, I'm ErrorGpt
                </p>
              </div>
              <p className="text-sm mt-3 text-white/70">How can I help you today?</p>
            </div>
          ) : (
            <div className="space-y-4 transition-all duration-300 ease-in">
              {messages.map((msg, index) => (
                <Message key={index} role={msg.role} content={msg.content} />
              ))}
            </div>
          )}
        </div>

        {/* Prompt Box */}
        <div className="w-full max-w-2xl mt-auto">
          <PromtBox
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setMessages={setMessages}
          />
        </div>

        {/* Footer Note */}
        <p className="text-xs absolute bottom-2 text-gray-400 tracking-wide">
          AI generated, for reference only
        </p>
      </div>
    </div>
  );
}
