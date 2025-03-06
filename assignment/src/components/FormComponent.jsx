import { useState } from "react";

const FormComponent = ({ setIsModalOpen, setIsTimerRunning }) => {
  const [selectedReason, setSelectedReason] = useState("completed");
  const [selectedSubReason, setSelectedSubReason] = useState("");
  const [detailedReason, setDetailedReason] = useState("");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg text-black w-full max-w-lg min-h-[400px]">
        <h2 className="text-2xl font-bold mb-4">
          Select a reason to end class
        </h2>
        <div className="space-y-2">

          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="completed"
              checked={selectedReason === "completed"}
              onChange={() => {
                setSelectedReason("completed");
                setSelectedSubReason(""); 
              }}
            />
            <span>Class completed</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="interrupted"
              checked={selectedReason === "interrupted"}
              onChange={() => setSelectedReason("interrupted")}
            />
            <span>Class interrupted/aborted</span>
          </label>

          {selectedReason === "interrupted" && (
            <div className="pl-6 space-y-2">
              {["Student didn’t show up for the class.", "Student didn’t show any interest.", "Student got disconnected.", "I got disconnected."].map((reason, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="subReason"
                    value={reason}
                    checked={selectedSubReason === reason}
                    onChange={() => setSelectedSubReason(reason)}
                  />
                  <span>{reason}</span>
                </label>
              ))}

              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="subReason"
                  value="other"
                  checked={selectedSubReason === "other"}
                  onChange={() => setSelectedSubReason("other")}
                />
                <span>Other reason</span>
              </label>

              {selectedSubReason === "other" && (
                <textarea
                  placeholder="Type your reason..."
                  className="w-full p-3 mt-2 bg-gray-100 rounded resize-none min-h-[80px] focus:outline-none"
                  value={detailedReason}
                  onChange={(e) => setDetailedReason(e.target.value)}
                />
              )}
            </div>
          )}
        </div>

        <div className="flex mt-2">
          <button
            className="px-4 py-2 mx-2 w-36 bg-red-500 text-white rounded"
            onClick={() => {
              setIsTimerRunning(false);
              setIsModalOpen(false);
            }}
          >
            End Class
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormComponent;
