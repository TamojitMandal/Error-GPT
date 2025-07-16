'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';
import ChatLabel from './ChatLabel';

const Sidebar = ({ expand, setExpand }) => {
  const [isOpen, setIsOpen] = useState({ id: 0, open: false });

  return (
    <motion.div
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`flex flex-col justify-between backdrop-blur-2xl bg-gradient-to-br from-black/50 via-zinc-900/60 to-black/50 shadow-2xl border-r border-white/10 pt-7 transition-all z-50 max-md:absolute max-md:h-screen text-white ${
        expand ? 'p-4 w-64' : 'md:w-20 w-20 max-md:overflow-hidden'
      }`}
    >
      {/* Top Section */}
      <div>
        {/* Logo and Toggle Button */}
        <div
          className={`${
            expand ? 'flex flex-row gap-10' : 'flex flex-col items-center gap-8'
          }`}
        >
          {expand ? (
            <Image className="w-36" src={assets.logo_text} alt="Logo Text" />
          ) : (
            <Image className="w-10" src={assets.logo_icon} alt="Logo Icon" />
          )}

          <motion.div
            whileHover={{ scale: 1.1 }}
            onClick={() => setExpand(!expand)}
            className="group relative flex items-center justify-center hover:bg-white/10 transition-all duration-300 h-9 w-9 aspect-square rounded-lg cursor-pointer"
          >
            <Image
              className="md:hidden"
              src={assets.menu_icon}
              alt="Menu Icon"
            />
            <Image
              className="hidden md:block w-7"
              src={expand ? assets.sidebar_close_icon : assets.sidebar_icon}
              alt="Sidebar Toggle"
            />
          </motion.div>
        </div>

        {/* New Chat Button */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0px 0px 20px rgba(255,255,255,0.4)' }}
          className={`mt-8 flex items-center justify-center cursor-pointer transition-all ${
            expand
              ? 'bg-gradient-to-r from-white/10 via-white/5 to-white/10 hover:opacity-90 rounded-2xl gap-2 p-2.5 w-full backdrop-blur-md'
              : 'group relative h-10 w-10 mx-auto hover:bg-white/10 rounded-lg'
          }`}
        >
          <Image
            className={expand ? 'w-6' : 'w-7'}
            src={expand ? assets.chat_icon : assets.chat_icon_dull}
            alt="New Chat Icon"
          />
          {!expand && (
            <div className="absolute w-max -top-12 -right-12 opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none">
              New Chat
              <div className="w-3 h-3 absolute bg-black rotate-45 left-4 -bottom-1.5"></div>
            </div>
          )}
          {expand && <p className="text-white font-medium">New Chat</p>}
        </motion.button>

        {/* Recent Chats Section */}
        <div className={`mt-10 ${expand ? 'block' : 'hidden'}`}>
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-sm uppercase tracking-widest text-white/60 mb-2"
          >
            Recents
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-2"
          >
            <ChatLabel openMenu={isOpen} setOpenMenu={setIsOpen} isNewChat={false} />
          </motion.div>
        </div>
      </div>

      {/* Bottom Section - Profile */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="mb-4"
      >
        <div
          className={`flex items-center gap-3 text-white/70 text-sm p-2 cursor-pointer ${
            expand ? 'hover:bg-white/10 rounded-lg' : 'justify-center w-full'
          }`}
        >
          <motion.div
            whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
            className="flex items-center"
          >
            <Image className="w-7" src={assets.profile_icon} alt="Profile Icon" />
          </motion.div>
          {expand && <span>My Profile</span>}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;
