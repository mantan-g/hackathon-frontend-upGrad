"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight, Play, ExternalLink, X } from "lucide-react";
import { cn } from "@/utils/util";

interface Asset {
  title: string;
  description: string;
  type: string;
  gDriveUrl: string;
  youtubeUrl?: string;
}

export default function CourseAccordion({ courses }: any) {
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const toggleCourse = (courseId: string) => {
    if (expandedCourse === courseId) {
      // Collapse course (and all modules/assets)
      setExpandedCourse(null);
      setExpandedModule(null);
      setPlayingVideo(null);
    } else {
      // Expand course
      setExpandedCourse(courseId);
      setExpandedModule(null);
      setPlayingVideo(null);
    }
  };

  const toggleModule = (moduleId: string) => {
    if (expandedModule === moduleId) {
      // Collapse module
      setExpandedModule(null);
      setPlayingVideo(null);
    } else {
      // Expand module
      setExpandedModule(moduleId);
      setPlayingVideo(null);
    }
  };

  const handlePlayVideo = (videoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log({ videoId });
    setPlayingVideo(videoId);
  };

  const handleCloseVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPlayingVideo(null);
  };

  // {renderAssets(module.asset)}

  const extractFileId = (url: any, type: any) => {
    console.log({ type });
    if (!url) return null;
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4 relative">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Learning Courses
        </h1>
        <p className="text-gray-600">
          Expand courses to explore modules and video content
        </p>
      </div>

      <div>
        <a href="/" className="text-sm text-blue-500 pt-2">
          Back to home
        </a>
      </div>

      {/* Video Player Modal */}
      {playingVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Video Player
              </h3>
              <button
                onClick={handleCloseVideo}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="aspect-video">
              <iframe
                src={`https://drive.google.com/file/d/${playingVideo}/preview`}
                width="640"
                height="480"
                allow="autoplay"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {courses.map((course: any) => (
        <div key={course._id} className="overflow-hidden">
          {/* Course Level */}
          <div
            className={cn(
              "bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-lg transition-all duration-300 cursor-pointer hover:shadow-xl",
              expandedCourse === course._id ? "rounded-b-none" : ""
            )}
            onClick={() => toggleCourse(course._id)}
          >
            <div className="p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-1">{course.title}</h2>
                  <p className="text-purple-100 opacity-90">
                    {course.description}
                  </p>
                  <div className="mt-2 text-sm text-purple-100 opacity-75">
                    {course.module.length} modules available
                  </div>
                </div>
                <div className="ml-4 transition-transform duration-200">
                  {expandedCourse === course._id ? (
                    <ChevronDown className="w-6 h-6" />
                  ) : (
                    <ChevronRight className="w-6 h-6" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Modules Container */}
          {expandedCourse === course._id && (
            <div className="bg-white border-l-4 border-r-4 border-b-4 border-purple-200 rounded-b-lg">
              {course.module.map((module: any, moduleIndex: any) => (
                <div
                  key={module._id}
                  className="border-b border-gray-100 last:border-b-0"
                >
                  {/* Module Level */}
                  <div
                    className={cn(
                      "p-4 bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 cursor-pointer transition-all duration-200",
                      moduleIndex === 0 ? "rounded-t-lg" : "",
                      expandedModule === module._id ? "" : "hover:shadow-md"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleModule(module._id);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                          {module.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {module.description}
                        </p>
                        <div className="mt-1 text-xs text-purple-600 font-medium">
                          {module.asset.length} video
                          {module.asset.length !== 1 ? "s" : ""}
                        </div>
                      </div>
                      <div className="ml-4 transition-transform duration-200">
                        {expandedModule === module._id ? (
                          <ChevronDown className="w-5 h-5 text-purple-600" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-purple-600" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Assets Container */}
                  {expandedModule === module._id && (
                    <div className="bg-gray-50">
                      {module.asset.map((asset: any, assetIndex: any) => (
                        <div
                          key={`${module._id}-asset-${assetIndex}`}
                          className="p-4 ml-4 bg-white border-l-2 border-purple-200 hover:border-purple-400 transition-colors duration-200"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                              <Play className="w-4 h-4 text-white fill-current" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-md font-medium text-gray-900 mb-2">
                                {asset.title}
                              </h4>
                              <p className="text-gray-600 text-sm mb-3">
                                {asset.description}
                              </p>

                              <div className="flex flex-col sm:flex-row gap-2">
                                {asset?.type === "video" && (
                                  <button
                                    onClick={(e) =>
                                      handlePlayVideo(
                                        extractFileId(
                                          asset?.gDriveUrl ?? "",
                                          asset?.type
                                        ),
                                        e
                                      )
                                    }
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-red-600 border border-red-600 rounded-md hover:bg-red-700 hover:border-red-700 transition-colors duration-200"
                                  >
                                    <Play className="w-4 h-4 mr-2 fill-current" />
                                    Play Video
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
