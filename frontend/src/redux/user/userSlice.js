import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  chatCount: 0,
  chats: [],
  messageCount: 0,
  lastMessageDate: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.loading = false;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOut: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
    startChat: (state) => {
      state.loading = true;
      state.error = null;
    },
    setChat: (state, action) => {
      const { chat, prompt, reply } = action.payload;

      state.chatCount += 1;
      state.chats.push({
        chatId: chat,
        prompt,
        message: reply,
      });

      state.loading = false;
    },

    sendMessage: (state) => {
      const now = new Date();
      const last = state.lastMessageDate
        ? new Date(state.lastMessageDate)
        : null;

      if (
        !last ||
        now.getMonth() !== last.getMonth() ||
        now.getFullYear() !== last.getFullYear()
      ) {
        state.messageCount = 1;
        state.lastMessageDate = now.toISOString();
      } else {
        if (state.messageCount < 15) {
          state.messageCount += 1;
          state.lastMessageDate = now.toISOString();
        } else {
          state.error =
            "Monthly message limit reached (15). Try again next month.";
        }
      }
    },
    resetMonthlyLimit: (state) => {
      state.messageCount = 0;
      state.lastMessageDate = new Date().toISOString();
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  signOut,
  startChat,
  setChat,
  sendMessage,
  resetMonthlyLimit,
} = userSlice.actions;

export default userSlice.reducer;
