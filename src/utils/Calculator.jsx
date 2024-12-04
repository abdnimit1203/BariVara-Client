import  { useState } from "react";

const Calculator = () => {
  const [input, setInput] = useState(""); // Stores the current input

  // Handle button click
  const handleClick = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  // Handle clear button
  const handleClear = () => {
    setInput("");
  };

  // Handle equal button and calculate the result
  const handleCalculate = () => {
    try {
      setInput(eval(input).toString());
    } catch (error) {
      setInput("Error");
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-slate-600 p-6 rounded-lg shadow-lg shadow-slate-500 ">
      <div className="mb-4">
        <input
          type="text"
          value={input}
          readOnly
          className="w-full p-4 text-right text-2xl bg-gray-100 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        <button
          onClick={() => handleClick("1")}
          className="p-4 text-xl bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          1
        </button>
        <button
          onClick={() => handleClick("2")}
          className="p-4 text-xl bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          2
        </button>
        <button
          onClick={() => handleClick("3")}
          className="p-4 text-xl bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          3
        </button>
        <button
          onClick={() => handleClick("+")}
          className="p-4 text-xl bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          +
        </button>

        <button
          onClick={() => handleClick("4")}
          className="p-4 text-xl bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          4
        </button>
        <button
          onClick={() => handleClick("5")}
          className="p-4 text-xl bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          5
        </button>
        <button
          onClick={() => handleClick("6")}
          className="p-4 text-xl bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          6
        </button>
        <button
          onClick={() => handleClick("-")}
          className="p-4 text-xl bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          -
        </button>

        <button
          onClick={() => handleClick("7")}
          className="p-4 text-xl bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          7
        </button>
        <button
          onClick={() => handleClick("8")}
          className="p-4 text-xl bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          8
        </button>
        <button
          onClick={() => handleClick("9")}
          className="p-4 text-xl bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          9
        </button>
        <button
          onClick={() => handleClick("*")}
          className="p-4 text-xl bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          ×
        </button>

        <button
          onClick={() => handleClick("0")}
          className="p-4 text-xl bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          0
        </button>
        <button
          onClick={handleClear}
          className="p-4 text-xl bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          C
        </button>
        <button
          onClick={handleCalculate}
          className="p-4 text-xl bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          =
        </button>
        <button
          onClick={() => handleClick("/")}
          className="p-4 text-xl bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
         ÷
        </button>
      </div>
    </div>
  );
};

export default Calculator;
