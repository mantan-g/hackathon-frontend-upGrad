"use client";

import { useState, useEffect } from "react";
import { Program } from "@/types/program";
import { useEmailStorage } from "@/hooks/useLocalStorage";
import EmailPopup from "@/components/EmailPopup";
import ProgramCard from "@/components/ProgramCard";
import axiosInstance from "@/utils/axiosInstance";

export default function ProgramsPage() {
  const { email, hasEmail, saveEmail, clearEmail, isLoading } =
    useEmailStorage();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoadingPrograms, setIsLoadingPrograms] = useState(false);

  // Load programs (replace with actual API call)
  useEffect(() => {
    const loadPrograms = async () => {
      setIsLoadingPrograms(true);
      try {
        const response = await axiosInstance.get("/program/programList");
        setPrograms(response.data?.result || []);
      } catch (error) {
        console.error("Error loading programs:", error);
      } finally {
        setIsLoadingPrograms(false);
      }
    };

    loadPrograms();
  }, []);

  const handleEmailSubmit = (newEmail: string) => {
    saveEmail(newEmail);
  };

  const handleViewProgram = (program: Program) => {
    console.log("View program:", program.name);
    // Implement navigation to program details
  };

  const handleDownloadSyllabus = (program: Program) => {
    console.log("Download syllabus for:", program.name);
    // Implement syllabus download
  };

  const handleAIGlimpse = (program: Program) => {
    console.log("AI Glimpse for:", program.name);
    // Implement AI glimpse functionality - could open modal, navigate to AI analysis page, etc.
    // This is where the business magic happens!
  };

  const handleClearEmail = () => {
    clearEmail();
    localStorage.removeItem("selectedProgram");
    sessionStorage.removeItem("selectedProgram");
  };

  // Show loading spinner while checking localStorage
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left Side - AI Feature */}
            <div className="flex-1">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-3 max-w-md relative overflow-hidden hover:from-purple-100 hover:to-blue-100 transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-900">
                      🚀 NEW: AI-Powered Program Insights
                    </h3>
                    <p className="text-purple-600 text-xs">
                      Get personalized recommendations in seconds
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - User Authentication */}
            <div className="flex-1 flex justify-end">
              {hasEmail ? (
                <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-center space-x-3 max-w-sm shadow-sm">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      Welcome!
                    </p>
                    <p className="text-xs text-blue-600 truncate">{email}</p>
                  </div>
                  <button
                    onClick={handleClearEmail}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
                    title="Logout"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-center space-x-3 shadow-sm">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Guest User
                    </p>
                    <p className="text-xs text-gray-500">
                      Please provide email to continue
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            upGrad Programs
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advance your career with industry-recognized certifications. Choose
            from our comprehensive programs designed to help you master the
            latest technologies.
          </p>
        </div>

        {/* Programs Grid */}
        {isLoadingPrograms ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <ProgramCard
                key={program._id}
                program={program}
                onViewProgram={handleViewProgram}
                onDownloadSyllabus={handleDownloadSyllabus}
                onAIGlimpse={handleAIGlimpse}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoadingPrograms && programs.length === 0 && (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-24 h-24 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No Programs Available
            </h3>
            <p className="text-gray-500">
              Check back later for new certification programs.
            </p>
          </div>
        )}
      </div>

      {/* Email Popup - shows if no email in localStorage - renders over all content */}
      {!hasEmail && <EmailPopup onEmailSubmit={handleEmailSubmit} />}
    </div>
  );
}
