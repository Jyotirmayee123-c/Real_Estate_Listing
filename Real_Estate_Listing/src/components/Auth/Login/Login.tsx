"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react"; // Added Loader2 for loading state
import { motion } from "framer-motion";
import { loginUser } from '@/app/api/auth';
import { toast } from 'react-hot-toast'; // Added for notifications

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignup: () => void;
  onSwitchToForgotPassword: () => void;
}

export default function LoginPopup({
  isOpen,
  onClose,
  onSwitchToSignup,
  onSwitchToForgotPassword,
}: LoginPopupProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false); 
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({}); 
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});
    
    // Basic validation
    if (!formData.email.trim()) {
      setErrors(prev => ({ ...prev, email: "Email is required" }));
      return;
    }
    
    if (!formData.password) {
      setErrors(prev => ({ ...prev, password: "Password is required" }));
      return;
    }

    setIsLoading(true);

    try {
      const response = await loginUser({
        email: formData.email,
        password: formData.password
      });

      // Handle successful login
      console.log("Login successful:", response);
      
      // Show success message
      toast.success("Login successful!");
      
      // Store token if remember me is checked
      if (formData.rememberMe && response.token) {
        localStorage.setItem('authToken', response.token);
        // You might also want to store user data
        localStorage.setItem('user', JSON.stringify(response.user));
      } else if (response.token) {
        // Store in session storage if not remember me
        sessionStorage.setItem('authToken', response.token);
        sessionStorage.setItem('user', JSON.stringify(response.user));
      }
      
      // Close the popup
      onClose();
      
      // You might want to redirect or update global auth state here
      // window.location.reload(); // Or use a context/state management

    } catch (error: any) {
      console.error("Login error:", error);
      
      // Handle specific error messages from API
      if (error.response?.data?.message) {
        const message = error.response.data.message.toLowerCase();
        
        if (message.includes("email") || message.includes("user")) {
          setErrors(prev => ({ ...prev, email: error.response.data.message }));
        } else if (message.includes("password")) {
          setErrors(prev => ({ ...prev, password: error.response.data.message }));
        } else {
          setErrors(prev => ({ ...prev, general: error.response.data.message }));
        }
        
        toast.error(error.response.data.message);
      } else if (error.message) {
        setErrors(prev => ({ ...prev, general: error.message }));
        toast.error(error.message);
      } else {
        setErrors(prev => ({ ...prev, general: "Login failed. Please try again." }));
        toast.error("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#252544] p-6 xs:p-8 sm:p-10 shadow-2xl transition-all border border-purple-900/30">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                  disabled={isLoading} // Disable close while loading
                >
                  <X size={24} />
                </button>

                {/* Header */}
                <Dialog.Title
                  as="h3"
                  className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white text-center mb-2"
                >
                  Welcome Back
                </Dialog.Title>
                <p className="text-gray-400 text-center text-sm xs:text-base mb-6 xs:mb-8">
                  Sign in to your Kalinga Homes account
                </p>

                {/* General Error Message */}
                {errors.general && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-red-400 text-sm text-center">{errors.general}</p>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className={`w-full pl-11 pr-4 py-3 bg-[#1a1a2e] border ${
                          errors.email ? 'border-red-500' : 'border-purple-900/30'
                        } rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition text-sm xs:text-base`}
                        required
                        disabled={isLoading}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-red-400 text-sm">{errors.email}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className={`w-full pl-11 pr-11 py-3 bg-[#1a1a2e] border ${
                          errors.password ? 'border-red-500' : 'border-purple-900/30'
                        } rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition text-sm xs:text-base`}
                        required
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-400 transition"
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-red-400 text-sm">{errors.password}</p>
                    )}
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="w-4 h-4 rounded border-purple-900/30 bg-[#1a1a2e] text-purple-600 focus:ring-2 focus:ring-purple-500/20"
                        disabled={isLoading}
                      />
                      <span className="text-gray-300">Remember me</span>
                    </label>
                    <button
                      type="button"
                      onClick={onSwitchToForgotPassword}
                      className="text-purple-400 hover:text-purple-300 transition cursor-pointer"
                      disabled={isLoading}
                    >
                      Forgot Password?
                    </button>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full ${
                      isLoading 
                        ? 'bg-purple-700 cursor-not-allowed' 
                        : 'bg-purple-600 hover:bg-purple-700 active:bg-purple-800'
                    } text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl text-sm xs:text-base min-h-[44px] flex items-center justify-center`}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin mr-2" size={20} />
                        Signing In...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-purple-900/30"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-[#252544] text-gray-400">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 bg-[#1a1a2e] hover:bg-[#252544] border border-purple-900/30 text-white py-3 rounded-lg transition text-sm">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-[#1a1a2e] hover:bg-[#252544] border border-purple-900/30 text-white py-3 rounded-lg transition text-sm">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </button>
                </div>
                {/* Sign Up Link */}
                <p className="text-center text-gray-400 text-sm mt-6">
                  Dont have an account?{" "}
                  <button
                    onClick={onSwitchToSignup}
                    className="text-purple-400 hover:text-purple-300 font-medium transition cursor-pointer"
                    disabled={isLoading}
                  >
                    Sign Up
                  </button>
                </p>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}