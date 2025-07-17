// app/layout.js
import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import Providers from "./providers"; // ⬅️ new

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "ErrorGPT",
  description: "Your personal ChatGPT",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
