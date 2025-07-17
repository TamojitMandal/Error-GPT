'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { assets } from '../assets/assets';

const ChatLabel = ({
  emoji = '💬',
  name = 'Chat name here',
  onRename,
  onDelete,
  isNewChat = false,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [hoverAudio, setHoverAudio] = useState(null);

  useEffect(() => {
    const audio = new Audio('/sounds/hover.mp3'); // Make sure this exists
    audio.volume = 0.3;
    setHoverAudio(audio);
  }, []);

  const playHoverSound = () => {
    if (hoverAudio) {
      hoverAudio.currentTime = 0;
      hoverAudio.play();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      onMouseEnter={() => {
        setDropdownVisible(true);
        playHoverSound();
      }}
      onMouseLeave={() => setDropdownVisible(false)}
      className={`relative w-full group`}
    >
      {/* Glowing pulse effect for "New Chat" */}
      {isNewChat && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.6, 0.2, 0.6],
            scale: [1, 1.04, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 rounded-xl border border-cyan-500 blur-md z-0"
        />
      )}

      <motion.div
        whileHover={{
          scale: 1.02,
          boxShadow: '0px 0px 20px rgba(94, 234, 212, 0.2)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative z-10 flex items-center justify-between p-3 rounded-xl bg-gradient-to-br from-[#111113]/70 via-[#1e1f21]/70 to-[#2a2b2f]/70 backdrop-blur-md text-white shadow-md border border-white/10 cursor-pointer"
      >
        {/* Emoji + Name */}
        <motion.div
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 max-w-[80%] overflow-hidden"
        >
          {/* Animated Emoji */}
          <motion.span
            whileHover={{ rotate: [0, -10, 10, -5, 0] }}
            transition={{ duration: 0.6 }}
            className="text-lg"
          >
            {emoji}
          </motion.span>

          {/* Chat name */}
          <p className="truncate text-sm font-medium text-white/80 group-hover:text-white transition-colors">
            {name}
          </p>
        </motion.div>

        {/* Profile Icon or 3 Dots */}
        <motion.div
          whileHover={{ scale: 1.2, rotate: [0, 5, -5, 0] }}
          className="flex items-center justify-center h-7 w-7 hover:bg-black/30 rounded-full transition-colors"
        >
          {isNewChat ? (
            <motion.div
              whileHover={{ scale: 1.3 }}
              className="h-5 w-5 bg-white rounded-full border border-cyan-300 shadow-inner"
              title="Profile"
            />
          ) : (
            <Image
              className="w-4"
              src={assets.three_dots}
              alt="Options"
              width={16}
              height={16}
            />
          )}
        </motion.div>
      </motion.div>

      {/* Dropdown Actions */}
      <AnimatePresence>
        {dropdownVisible && !isNewChat && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="absolute right-3 top-14 z-50 flex flex-col gap-1 bg-gradient-to-br from-black/80 via-zinc-900/90 to-gray-800/80 border border-white/10 backdrop-blur-md text-white shadow-xl rounded-xl p-2 w-40"
          >
            <div
              onClick={onRename}
              className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg cursor-pointer transition-all"
            >
              <Image src={assets.pencil_icon} alt="Rename" className="w-4" width={16} height={16} />
              <span>Rename</span>
            </div>
            <div
              onClick={onDelete}
              className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg cursor-pointer transition-all"
            >
              <Image src={assets.delete_icon} alt="Delete" className="w-4" width={16} height={16} />
              <span>Delete</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ChatLabel;
