import { Program } from "@/types/program";
import Image from "next/image";

interface ProgramCardProps {
  program: Program;
  onViewProgram?: (program: Program) => void;
  onDownloadSyllabus?: (program: Program) => void;
  onAIGlimpse?: (program: Program) => void;
  index?: number;
}

export default function ProgramCard({
  program,
  onViewProgram,
  onDownloadSyllabus,
  onAIGlimpse,
  index = 0,
}: ProgramCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Program Image */}
      <div className="relative h-48 w-full">
        <Image
          src={program.imgUrl}
          alt={program.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {index === 0 && (
          <div className="absolute top-4 left-4">
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Bestseller
            </span>
          </div>
        )}
      </div>

      {/* Program Content */}
      <div className="p-6">
        {/* Microsoft Badge */}
        <div className="flex items-center mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-green-500 rounded"></div>
            <span className="text-sm font-medium text-gray-700">upGrad</span>
          </div>
        </div>

        {/* Program Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {program.name}
        </h3>

        {/* Program Description */}
        <p className="text-blue-600 text-sm mb-4 line-clamp-2">
          {program.description}
        </p>

        {/* Program Details */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-sm text-gray-600">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Certification
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {program.courses.length} Course
            {program.courses.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* AI Glimpse Feature - Eye-catching CTA */}
        <div
          onClick={() => onAIGlimpse?.(program)}
          className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4 mb-6 hover:from-purple-100 hover:to-blue-100 transition-all duration-300 cursor-pointer group hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
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
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-yellow-900">✨</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm group-hover:text-purple-700 transition-colors">
                  Get AI Glimpse of this Program
                </h4>
                <p className="text-xs text-gray-600 group-hover:text-gray-700">
                  Discover what makes this program perfect for your career goals
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                className="w-4 h-4 text-purple-500 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
          <div className="mt-2 text-xs text-purple-600 font-medium"></div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={() => onViewProgram?.(program)}
            className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
          >
            View Program
          </button>
          <button
            onClick={() => onDownloadSyllabus?.(program)}
            className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200 flex items-center justify-center"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Syllabus
          </button>
        </div>
      </div>
    </div>
  );
}
