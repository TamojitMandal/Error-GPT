'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { assets } from '../assets/assets';

const PromtBox = ({ isLoading, setIsLoading }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);

    setTimeout(() => {
      console.log('Prompt submitted:', prompt);
      setIsLoading(false);
      setPrompt('');
    }, 1000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl p-4 rounded-3xl mt-4 transition-all bg-gradient-to-br from-black/60 to-gray-900/40 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/30 animate-fade-in"
    >
      {/* Input Textarea */}
      <textarea
        rows={2}
        placeholder="Message ErrorGpt"
        className="outline-none w-full resize-none overflow-hidden break-words bg-transparent text-white placeholder-white/40 text-sm"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={isLoading}
      />

      {/* Options + Send */}
      <div className="flex items-center justify-between text-sm mt-3">
        {/* Tags */}
        <div className="flex items-center gap-2">
          <p className="flex items-center gap-2 text-xs border border-white/10 px-3 py-1 rounded-full cursor-pointer bg-white/5 hover:bg-white/10 transition backdrop-blur-md hover:scale-105 duration-200 ease-out">
            <Image className="h-5 w-5" src={assets.deepthink_icon} alt="DeepThink" />
            DeepThink (R1)
          </p>
          <p className="flex items-center gap-2 text-xs border border-white/10 px-3 py-1 rounded-full cursor-pointer bg-white/5 hover:bg-white/10 transition backdrop-blur-md hover:scale-105 duration-200 ease-out">
            <Image className="h-5 w-5" src={assets.search_icon} alt="Search" />
            Search
          </p>
        </div>

        {/* Send Controls */}
        <div className="flex items-center gap-3">
          <Image
            className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out"
            src={assets.pin_icon}
            alt="Pin"
          />
          <button
            type="submit"
            disabled={!prompt || isLoading}
            className={`rounded-full p-2 transition-transform duration-300 ease-in-out ${
              prompt && !isLoading
                ? 'bg-gradient-to-tr from-purple-600 via-pink-500 to-red-500 hover:scale-110 hover:shadow-md hover:shadow-pink-500/50'
                : 'bg-gray-600/40 cursor-not-allowed'
            }`}
          >
            <Image
              className="w-3.5 aspect-square"
              src={
                prompt && !isLoading
                  ? assets.arrow_icon
                  : assets.arrow_icon_dull
              }
              alt="Send"
            />
          </button>
        </div>
      </div>
    </form>
  );
};

export default PromtBox;
