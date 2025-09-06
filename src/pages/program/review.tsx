import React, { useEffect, useState } from "react";
import { FileText, Play, HelpCircle } from "lucide-react";
import "@/app/globals.css";

const ProgramReview: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<string>("article");
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const program = JSON.parse(
      sessionStorage.getItem("selectedProgram") || "{}"
    );
    if (!program) {
      window.location.href = "/";
      return;
    }

    setData(program.overView || []);
  }, []);

  const renderContent = () => {
    const item = data[currentIndex];
    if (!item) return null;

    switch (selectedType) {
      case "article":
        return <p>{item.article.content}</p>;
      case "video":
        return (
          <iframe
            src={`https://drive.google.com/file/d/${item.video.gDriveUrl}/preview`}
            width="100%"
            height="100%"
            allow="autoplay"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        );
      case "quiz":
        return (
          <div>
            <p>{item.quiz.question}</p>
            <ul>
              {Object.entries(item.quiz.options || {}).map(([key, value]) => (
                <li key={key} className="mb-2">
                  <label>
                    <input
                      type="radio"
                      name="quiz"
                      value={key}
                      className="mr-2"
                    />
                    {`${key}: ${value}`}
                  </label>
                </li>
              ))}
            </ul>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
              Submit
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    setSelectedType("article");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <div className="w-full max-w-4xl border rounded-lg shadow-lg h-[600px] relative">
        <div className="flex justify-between items-center p-4 border-b h-[15%]">
          <h1 className="text-xl font-bold">Program Review</h1>
          <h2 className="text-lg">Topic 2 Title</h2>
        </div>
        <div className="flex h-[85%] w-full">
          <div className="w-1/4 p-6 border-r border-gray-300 h-full">
            <div className="flex flex-col w-full h-[90%]">
              <div
                className="flex items-center cursor-pointer mb-2 p-3"
                onClick={() => setSelectedType("article")}
              >
                <FileText className="mr-2" />
                Article
              </div>
              <div
                className="flex items-center cursor-pointer mb-2 p-3"
                onClick={() => setSelectedType("video")}
              >
                <Play className="mr-2" />
                Video
              </div>
              <div
                className="flex items-center cursor-pointer p-3"
                onClick={() => setSelectedType("quiz")}
              >
                <HelpCircle className="mr-2" />
                Quiz
              </div>
            </div>
            <div className="flex">
              <div className="flex justify-between items-center">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Previous
                </button>
                <div className="border-t border-gray-300 flex-grow mx-4 r-0"></div>
                <button
                  onClick={handleNext}
                  disabled={currentIndex === data.length - 1}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          <div className="w-3/4 h-full p-4 flex flex-col justify-between relative border-l border-gray-300">
            <div className="flex-grow mb-4 overflow-hidden">
              <div className="w-full h-full flex">{renderContent()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramReview;
