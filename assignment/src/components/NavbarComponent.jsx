import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import FormComponent from "./FormComponent";

export default function Navbar() {
  const [timeLeft, setTimeLeft] = useState(600);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  useEffect(() => {
    if (timeLeft <= 0 || !isTimerRunning) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isTimerRunning]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center relative">
      <div className="flex items-center flex-row">
  <p className="text-xl font-bold">Assignment |</p>
  <p className="text-lg font-bold hidden md:block">&nbsp;Trial Lesson [Grade 1-3]</p>
  <p className="text-lg font-bold md:hidden">&nbsp;Codignal</p>
</div>
      <div className="hidden md:flex items-center space-x-4">
        <span>{formatTime(timeLeft)}</span>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-red-500 px-4 py-2 rounded"
        >
          End Class
        </button>
      </div>
      <div className="md:hidden">
        <button className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-16 right-2 h-40 w-52 bg-blue-600 text-white flex flex-col justify-evenly rounded-2xl items-center md:hidden p-4 shadow-lg z-50">
          <span className="mb-2">{formatTime(timeLeft)}</span>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-500 cursor-pointer px-4 py-2 rounded"
          >
            End Class
          </button>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded shadow-lg text-black w-full max-w-lg h-auto min-h-[300px]">
            <h2 className="text-3xl font-bold mb-4">
              Select a reason to end class
            </h2>
            <FormComponent
              setIsModalOpen={setIsModalOpen}
              setIsTimerRunning={setIsTimerRunning}
            />
          </div>
        </div>
      )}
    </nav>
  );
}
