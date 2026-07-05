import { useState, useRef, useEffect } from "react";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [history, setHistory] = useState([]);
  const [justCalculated, setJustCalculated] = useState(false);
  const historyEndRef = useRef(null);

  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleNumber = (value) => {
    if (justCalculated) {
      // After result, start fresh
      setDisplay(value);
      setExpression(value);
      setJustCalculated(false);
    } else {
      const newDisplay = display === "0" ? value : display + value;
      setDisplay(newDisplay);
      setExpression((prev) => prev + value);
    }
  };

  const handleOperator = (op) => {
    setJustCalculated(false);
    const lastChar = expression.slice(-1);
    const isOperator = ["+", "-", "*", "/"].includes(lastChar);

    if (isOperator) {
      // Replace last operator
      setExpression((prev) => prev.slice(0, -1) + op);
    } else {
      setExpression((prev) => prev + op);
    }
    setDisplay(op);
  };

  const handleDecimal = () => {
    if (justCalculated) {
      setDisplay("0.");
      setExpression("0.");
      setJustCalculated(false);
      return;
    }
    // Only add decimal if current number doesn't have one
    const parts = expression.split(/[\+\-\*\/]/);
    const current = parts[parts.length - 1];
    if (!current.includes(".")) {
      setDisplay((prev) => prev + ".");
      setExpression((prev) => prev + ".");
    }
  };

  const handleBackspace = () => {
    if (justCalculated) {
      handleClear();
      return;
    }
    if (expression.length <= 1) {
      setDisplay("0");
      setExpression("");
    } else {
      const newExpr = expression.slice(0, -1);
      setExpression(newExpr);
      const lastChar = newExpr.slice(-1);
      setDisplay(lastChar || "0");
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setExpression("");
    setJustCalculated(false);
  };

  const handleCalculate = () => {
    if (!expression) return;
    try {
      // eslint-disable-next-line no-eval
      const result = eval(expression);
      const resultStr = parseFloat(result.toFixed(10)).toString();

      // Build human-readable history entry
      const opMap = { "+": "+", "-": "−", "*": "×", "/": "÷" };
      const readable = expression.replace(/[\+\-\*\/]/g, (m) => ` ${opMap[m] || m} `);

      setHistory((prev) => [
        ...prev,
        { expr: readable, result: resultStr },
      ]);

      setDisplay(resultStr);
      setExpression(resultStr);
      setJustCalculated(true);
    } catch {
      setDisplay("Error");
      setExpression("");
      setJustCalculated(true);
    }
  };

  const opLabel = { "*": "×", "/": "÷", "+": "+", "-": "−" };

  const Button = ({ label, onClick, variant = "num" }) => {
    const base =
      "rounded-xl text-lg font-semibold h-14 flex items-center justify-center cursor-pointer select-none transition-all duration-150 active:scale-95";
    const variants = {
      num: "bg-slate-700 hover:bg-slate-600 text-white",
      op: "bg-amber-500 hover:bg-amber-400 text-white",
      eq: "bg-emerald-500 hover:bg-emerald-400 text-white",
      clear: "bg-rose-500 hover:bg-rose-400 text-white",
      back: "bg-slate-600 hover:bg-slate-500 text-amber-300",
    };
    return (
      <button onClick={onClick} className={`${base} ${variants[variant]}`}>
        {label}
      </button>
    );
  };

  const displayExpr = expression || "0";

  return (
    <div className="max-w-sm mx-auto select-none">
      {/* History Panel */}
      {history.length > 0 && (
        <div className="bg-slate-900 rounded-xl mb-3 p-3 max-h-36 overflow-y-auto">
          <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider">History</p>
          {history.map((h, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-1 border-b border-slate-800 last:border-0"
            >
              <span className="text-slate-400 text-sm truncate max-w-[60%]">{h.expr}</span>
              <span className="text-white font-bold text-sm">= {h.result}</span>
            </div>
          ))}
          <div ref={historyEndRef} />
        </div>
      )}

      {/* Calculator Body */}
      <div className="bg-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Display */}
        <div className="px-5 pt-5 pb-3 text-right">
          <p className="text-slate-400 text-sm h-5 truncate">
            {justCalculated ? "" : displayExpr.length > 20 ? "..." + displayExpr.slice(-18) : displayExpr}
          </p>
          <p className="text-white text-4xl font-light mt-1 truncate">
            {display.length > 12 ? display.slice(0, 12) + "…" : display}
          </p>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-2 p-4">
          {/* Row 1 */}
          <Button label="C" onClick={handleClear} variant="clear" />
          <Button label="⌫" onClick={handleBackspace} variant="back" />
          <Button label="%" onClick={() => handleOperator("%")} variant="op" />
          <Button label="÷" onClick={() => handleOperator("/")} variant="op" />

          {/* Row 2 */}
          <Button label="7" onClick={() => handleNumber("7")} />
          <Button label="8" onClick={() => handleNumber("8")} />
          <Button label="9" onClick={() => handleNumber("9")} />
          <Button label="×" onClick={() => handleOperator("*")} variant="op" />

          {/* Row 3 */}
          <Button label="4" onClick={() => handleNumber("4")} />
          <Button label="5" onClick={() => handleNumber("5")} />
          <Button label="6" onClick={() => handleNumber("6")} />
          <Button label="−" onClick={() => handleOperator("-")} variant="op" />

          {/* Row 4 */}
          <Button label="1" onClick={() => handleNumber("1")} />
          <Button label="2" onClick={() => handleNumber("2")} />
          <Button label="3" onClick={() => handleNumber("3")} />
          <Button label="+" onClick={() => handleOperator("+")} variant="op" />

          {/* Row 5 */}
          <button
            onClick={() => handleNumber("0")}
            className="col-span-2 rounded-xl text-lg font-semibold h-14 flex items-center justify-center cursor-pointer select-none transition-all duration-150 active:scale-95 bg-slate-700 hover:bg-slate-600 text-white w-full"
          >
            0
          </button>
          <Button label="." onClick={handleDecimal} />
          <Button label="=" onClick={handleCalculate} variant="eq" />
        </div>

        {/* Clear History */}
        {history.length > 0 && (
          <button
            onClick={() => setHistory([])}
            className="w-full text-xs text-slate-500 hover:text-rose-400 py-2 transition-colors"
          >
            Clear History
          </button>
        )}
      </div>
    </div>
  );
};

export default Calculator;
