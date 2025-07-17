'use client';

import { assets } from "../assets/assets";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Message = ({ role, content }) => {
  const isUser = role === 'user';
  const displayContent = !isUser ? "Hi I am ErrorGpt" : content;

  const [show, setShow] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex flex-col items-center w-full max-w-3xl text-sm px-4">
      <div className={`flex flex-col w-full mb-8 ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`group relative flex items-start max-w-2xl py-4 px-5 rounded-xl border border-white/10 
          shadow-xl backdrop-blur-md transition-all duration-500 
          ${isUser
            ? 'bg-gradient-to-br from-[#2a2a3c] to-[#3c3c5a]'
            : 'bg-gradient-to-br from-[#111111cc] to-[#1a1a1acc] gap-3'
          } 
          ${show ? (isUser ? 'translate-x-0 opacity-100' : 'translate-x-0 opacity-100') : (isUser ? 'translate-x-8 opacity-0' : '-translate-x-8 opacity-0')}
          `}
        >
          {/* Hover Actions */}
          <div
            className={`opacity-0 group-hover:opacity-100 absolute transition-all ${
              isUser ? '-left-16 top-2.5' : 'left-9 -bottom-6'
            }`}
          >
            <div className="flex items-center gap-2 opacity-70">
              {isUser ? (
                <>
                  <Image className="w-4 cursor-pointer" src={assets.copy_icon} alt="Copy" />
                  <Image className="w-4.5 cursor-pointer" src={assets.pencil_icon} alt="Edit" />
                </>
              ) : (
                <>
                  <Image className="w-4.5 cursor-pointer" src={assets.copy_icon} alt="Copy" />
                  <Image className="w-4 cursor-pointer" src={assets.regenerate_icon} alt="Regenerate" />
                  <Image className="w-4 cursor-pointer" src={assets.like_icon} alt="Like" />
                  <Image className="w-4 cursor-pointer" src={assets.dislike_icon} alt="Dislike" />
                </>
              )}
            </div>
          </div>

          {/* Message Body */}
          {isUser ? (
            <span className="text-white/90">{displayContent}</span>
          ) : (
            <>
              {/* Custom Icon (no image) */}
              <div className="h-9 w-9 flex items-center justify-center bg-gradient-to-br from-[#222] to-[#333] text-white text-xs font-bold rounded-full border border-white/20">
                EG
              </div>
              <div className="space-y-4 w-full overflow-auto text-white/90">
                {displayContent}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
