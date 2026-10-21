
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PlanProvider } from "@/context/PlanContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description:
    "Pick a lift, plan your workout, and track your training with FitLog.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PlanProvider>
          <Navbar />
          {children}
          <Footer />

          <ToastContainer
            position="bottom-right"
            autoClose={2500}
            theme="dark"
            newestOnTop
          />
        </PlanProvider>
      </body>
    </html>
  );
}
