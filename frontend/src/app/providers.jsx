// app/providers.jsx
"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/store";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <div className="min-h-screen flex justify-center items-center bg-[#fffbea] text-black">
            <p className="text-lg font-bold animate-pulse">Loading...</p>
          </div>
        }
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
