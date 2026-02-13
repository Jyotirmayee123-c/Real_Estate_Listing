"use client";

import { useState } from "react";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import ForgotPassword from "../ForgotPassword/ForgotPassword";

type AuthView = "login" | "signup" | "forgot-password" | null;

interface AuthManagerProps {
  initialView?: AuthView;
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthManager({
  initialView = "login",
  isOpen,
  onClose,
}: AuthManagerProps) {
  const [currentView, setCurrentView] = useState<AuthView>(initialView);

  const handleClose = () => {
    onClose();
    // Reset to initial view after a short delay
    setTimeout(() => setCurrentView(initialView), 300);
  };

  const switchToLogin = () => setCurrentView("login");
  const switchToSignup = () => setCurrentView("signup");
  const switchToForgotPassword = () => setCurrentView("forgot-password");

  return (
    <>
      <Login
        isOpen={isOpen && currentView === "login"}
        onClose={handleClose}
        onSwitchToSignup={switchToSignup}
        onSwitchToForgotPassword={switchToForgotPassword}
      />

      <SignUp
        isOpen={isOpen && currentView === "signup"}
        onClose={handleClose}
        onSwitchToLogin={switchToLogin}
      />

      <ForgotPassword
        isOpen={isOpen && currentView === "forgot-password"}
        onClose={handleClose}
        onSwitchToLogin={switchToLogin}
      />
    </>
  );
}