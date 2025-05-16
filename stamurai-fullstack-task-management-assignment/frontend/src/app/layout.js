import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { TasksProvider } from "@/contexts/TasksContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

import "./page.css";
import { SocketProvider } from "@/contexts/SocketContext";
import { NotificationsProvider } from "@/contexts/NotificationsContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Taskifyer",
  description: "Task management app tailored for small team",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <SocketProvider>
            <TasksProvider>
              <NotificationsProvider>
                <ToastContainer
                  position="top-center"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick={false}
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
                <Navbar />
                <div style={{ minHeight: "calc(100vh - 5.5rem)" }}>
                  {children}
                </div>
                <Footer />
              </NotificationsProvider>
            </TasksProvider>
          </SocketProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
