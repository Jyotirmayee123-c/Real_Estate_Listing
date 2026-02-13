"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, Mail, ArrowLeft, CheckCircle } from "lucide-react";

interface ForgotPasswordPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function ForgotPasswordPopup({
  isOpen,
  onClose,
  onSwitchToLogin,
}: ForgotPasswordPopupProps) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reset email sent to:", email);
    // Add your password reset logic here
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setEmail("");
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
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
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>

                {!isSubmitted ? (
                  <>
                    {/* Header */}
                    <div className="text-center mb-6 xs:mb-8">
                      <div className="bg-purple-600/20 w-16 h-16 xs:w-20 xs:h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="text-purple-400" size={32} />
                      </div>
                      <Dialog.Title
                        as="h3"
                        className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white mb-2"
                      >
                        Forgot Password?
                      </Dialog.Title>
                      <p className="text-gray-400 text-sm xs:text-base">
                        No worries, we will send you reset instructions
                      </p>
                    </div>

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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full pl-11 pr-4 py-3 bg-[#1a1a2e] border border-purple-900/30 rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition text-sm xs:text-base"
                            required
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl text-sm xs:text-base min-h-[44px] cursor-pointer"
                      >
                        Reset Password
                      </button>
                    </form>

                    {/* Back to Sign In */}
                    <button
                      onClick={onSwitchToLogin}
                      className="flex items-center justify-center gap-2 text-purple-400 hover:text-purple-300 transition mt-6 text-sm xs:text-base w-full cursor-pointer"
                    >
                      <ArrowLeft size={18} />
                      Back to Sign In
                    </button>
                  </>
                ) : (
                  <>
                    {/* Success State */}
                    <div className="text-center">
                      <div className="bg-green-600/20 w-16 h-16 xs:w-20 xs:h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="text-green-400" size={32} />
                      </div>
                      <Dialog.Title
                        as="h3"
                        className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white mb-2"
                      >
                        Check Your Email
                      </Dialog.Title>
                      <p className="text-gray-400 text-sm xs:text-base mb-6">
                        We sent a password reset link to
                      </p>
                      <p className="text-purple-400 font-medium text-sm xs:text-base mb-6 break-all">
                        {email}
                      </p>
                      <p className="text-gray-400 text-xs xs:text-sm mb-8">
                        Didnt receive the email? Check your spam folder or{" "}
                        <button
                          onClick={() => setIsSubmitted(false)}
                          className="text-purple-400 hover:text-purple-300 transition underline"
                        >
                          try another email address
                        </button>
                      </p>

                      {/* Back to Sign In Button */}
                      <button
                        onClick={onSwitchToLogin}
                        className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-lg hover:shadow-xl text-sm xs:text-base min-h-[44px] "
                      >
                        <ArrowLeft size={18} />
                        Back to Sign In
                      </button>
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}