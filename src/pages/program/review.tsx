import React, { useEffect, useState } from "react";
import { FileText, Play, HelpCircle } from "lucide-react";
import "@/app/globals.css";

const ProgramReview: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<string>("article");
  const [data, setData] = useState<any>([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);

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

  const getVideoId = (url: string) => {
    if (!url) return null;
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

  const handleOptionChange = (
    questionIndex: number,
    option: string,
    correct: string
  ) => {
    const updatedAnswers: any = [...selectedAnswers];
    updatedAnswers[questionIndex] = option;
    setSelectedAnswers(updatedAnswers);
    if (option === correct) {
      setScore(score + 10);
    }
  };

  const handleQuizSubmit = () => {
    setShowScore(true);
  };

  const renderContent = () => {
    const item = data[currentIndex];
    if (!item) return null;

    switch (selectedType) {
      case "article":
        return <p>{item.article.content}</p>;
      case "video":
        return (
          <iframe
            src={`https://drive.google.com/file/d/${getVideoId(
              item.video.gDriveUrl
            )}/preview`}
            width="100%"
            height="100%"
            allow="autoplay"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        );
      case "quiz":
        return (
          <div className="overflow-y-auto max-h-96 w-full">
            {item.quiz.output.map((q: any, index: number) => (
              <div key={index} className="mb-4">
                <p>{q.question}</p>
                <ul>
                  {Object.entries(q.options).map(([key, value]) => (
                    <li key={key} className="mb-2">
                      <label>
                        <input
                          type="radio"
                          name={`quiz-${index}`}
                          value={key}
                          checked={selectedAnswers[index] === key}
                          onChange={() =>
                            handleOptionChange(index, key, q.correct)
                          }
                          className="mr-2"
                          disabled={showScore}
                        />
                        {`${key}: ${value}`}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="flex space-x-4">
              <button
                disabled={showScore}
                onClick={() => !showScore && handleQuizSubmit()}
                className={`mt-4 px-4 py-2 ${
                  showScore ? "bg-gray-500" : "bg-blue-500"
                } text-white rounded`}
              >
                Continue
              </button>

              <button
                disabled={!showScore}
                onClick={() => {
                  setShowScore(false);
                  setScore(0);
                  setSelectedAnswers([]);
                }}
                className={`mt-4 px-4 py-2 ${
                  !showScore ? "bg-gray-500" : "bg-blue-500"
                } text-white rounded`}
              >
                Reset
              </button>
            </div>
            {showScore && (
              <div className="mt-4 p-4 bg-gray-100 rounded">
                <p>
                  Your score: {score} /{" "}
                  {data[currentIndex].quiz.output.length * 10}
                </p>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setShowScore(false);
      setScore(0);
      setSelectedAnswers([]);
      setSelectedType("article");
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setShowScore(false);
      setScore(0);
      setSelectedAnswers([]);
      setSelectedType("article");
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    setSelectedType("article");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <div className="flex justify-between items-center w-4xl px-3 py-2">
        <a href="/" className="text-sm text-blue-500 pt-2">
          Back to home
        </a>

        <a href="/program/detail" className="text-sm text-blue-500 pt-2">
          View Full Curriculum
        </a>
      </div>
      <div className="w-full max-w-4xl border rounded-lg shadow-lg h-[600px] relative">
        <div className="flex justify-between items-center p-4 border-b h-[15%]">
          <h1 className="text-xl font-bold">Program Preview</h1>
          <h2 className="text-lg">Preview Module {currentIndex + 1} </h2>
        </div>
        <div className="flex h-[85%] w-full">
          <div className="w-1/4 p-6 border-r border-gray-300 h-full">
            <div className="flex flex-col w-full h-[90%]">
              <div
                className={`flex items-center cursor-pointer mb-2 p-3 ${
                  selectedType === "article" ? "bg-gray-200" : ""
                }`}
                onClick={() => {
                  setShowScore(false);
                  setScore(0);
                  setSelectedAnswers([]);
                  setSelectedType("article");
                }}
              >
                <FileText className="mr-2" />
                Article
              </div>
              <div
                className={`flex items-center cursor-pointer mb-2 p-3 ${
                  selectedType === "video" ? "bg-gray-200" : ""
                }`}
                onClick={() => {
                  setShowScore(false);
                  setScore(0);
                  setSelectedAnswers([]);
                  setSelectedType("video");
                }}
              >
                <Play className="mr-2" />
                Video
              </div>
              <div
                className={`flex items-center cursor-pointer p-3 ${
                  selectedType === "quiz" ? "bg-gray-200" : ""
                }`}
                onClick={() => {
                  setShowScore(false);
                  setScore(0);
                  setSelectedAnswers([]);
                  setSelectedType("quiz");
                }}
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
                  className="px-4 py-2 bg-blue-500 text-white rounded"
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
      <p className="text-sm text-gray-500 pt-2">
        Note: The articles, videos and quizzes are generated by AI using
        existing program curriculum.
      </p>
    </div>
  );
};

export default ProgramReview;
