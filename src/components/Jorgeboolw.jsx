  import React, { useState } from "react";
  import { Line } from "react-chartjs-2";
  import Modal from "react-modal";

  const Graph = ({ func, a, b }) => {
    const n = 100;
    const h = (b - a) / n;
    const xValues = Array.from({ length: n + 1 }, (_, i) => a + i * h);
    const yValues = xValues.map((x) => {
      try {
        return func(x);
      } catch (e) {
        return NaN;
      }
    });

    const data = {
      labels: xValues,
      datasets: [
        {
          label: "f(x)",
          data: yValues,
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 2,
          fill: false,
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Gráfica de la Función",
        },
      },
    };

    return <Line data={data} options={options} />;
  };

  const App = () => {
    const [a, setA] = useState("");
    const [b, setB] = useState("");
    const [funcStr, setFuncStr] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [showGraph, setShowGraph] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const predefinedFunctions = {
      "Math.log(x)": "Logaritmo natural (ln(x))",
      "Math.pow(x, 2)": "x al cuadrado (x^2)",
      "Math.sin(x)": "Seno (sin(x))",
      "Math.cos(x)": "Coseno (cos(x))",
      "Math.tan(x)": "Tangente (tan(x))",
      "Math.exp(x)": "Exponencial (e^x)",
      "1 / x": "Recíproco (1/x)",
      "Math.sqrt(x)": "Raíz cuadrada (sqrt(x))",
      "Math.cbrt(x)": "Raíz cúbica (cbrt(x))",
      "Math.atan(x)": "Arcotangente (atan(x))",
      "Math.acos(x)": "Arcocoseno (acos(x))",
      "Math.asin(x)": "Arcoseno (asin(x))",
    };

    const integrateBoole = (func, a, b) => {
      const delta = (b - a) / 4;
      const x = [a, a + delta, a + 2 * delta, a + 3 * delta, b];
      const coefficients = [7, 32, 12, 32, 7];
      const integral =
        ((2 * delta) / 45) *
        x.reduce((sum, xi, i) => sum + coefficients[i] * func(xi), 0);
      return integral;
    };
    const validateFunctionString = (funcStr) => {
      try {
        new Function('x', `return ${funcStr}`);
        return true;
      } catch (err) {
        return false;
      }
    };
    
    const handleInputChange = (event) => {
      setShowGraph(false);
      return
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      const aNum = parseFloat(a);
      const bNum = parseFloat(b);
    
      if (isNaN(aNum) || isNaN(bNum)) {
        setResult('Por favor, introduce valores numéricos válidos para los límites.');
        setError(null);
        setShowGraph(false);
        return;
      }
    
      if (!validateFunctionString(funcStr)) {
        setResult('La función ingresada no es válida.');
        setError(null);
        setShowGraph(false);
        return;
      }
    
      try {
        const func = new Function('x', `return ${funcStr}`);
        const result = integrateBoole(func, aNum, bNum);
        setResult(result);
        setShowGraph(true);
      } catch (err) {
        setResult('Error al calcular la integral.');
        setError(null);
        setShowGraph(false);
      }
    };
    return (
      <div className="animate__animated animate__fadeIn">
        <h1 className="text-3xl font-bold text-center">Método de Jorge Boole</h1>
        <div className="grid grid-cols-3 p-6">
          <div className="w-full max-w-md p-8 pt-5 bg-white">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Ingresar Función:
                </label>
                <input
                  type="text"
                  value={funcStr}
             
                  onChange={(e) => setFuncStr(e.target.value) + handleInputChange()}
                  placeholder="Ejemplo: x**2"
                  className="w-full p-2 border border-gray-200 rounded"
                />

                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="w-full p-2 mt-2 text-white transition-all ease-in-out bg-blue-800 rounded hover:bg-blue-700"
                >
                  Funciones Predefinidas
                </button>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Límite inferior (a)
                </label>
                <input
                  type="text"
                  value={a}
                  onChange={(e) => setA(e.target.value) }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Límite superior (b)
                </label>
                <input
                  type="text"
                  value={b}
                  onChange={(e) => setB(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#1d1c8e] text-white p-2 rounded hover:bg-opacity-80 transition-all ease-in-out hover:scale-[103%]"
              >
                Calcular Integral
              </button>
            </form>
            {result !== null && (
              <div className="grid grid-cols-2 gap-10 p-4 mt-4 bg-gray-100 border border-gray-300 rounded">
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold">Resultado:</h2>
                  <p>{result}</p>
                </div>
                {error !== null && (
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold">Margen de error:</h3>
                    <p>{error.toFixed(2)}%</p>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center justify-center col-span-2 p-5">
            {showGraph && (
              <Graph
                func={new Function("x", `return ${funcStr}`)}
                a={parseFloat(a)}
                b={parseFloat(b)}
              />
            )}
          </div>
        </div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Sugerencias de Funciones"
          className="modal"
          overlayClassName="modal-overlay"
        >
          <h2 className="mb-4 text-lg font-semibold">Funciones Predefinidas</h2>
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(predefinedFunctions).map(([key, value]) => (
              <button
                key={key}
                onClick={() => {
                  setFuncStr(key);
                  setIsModalOpen(false);
                }}
                className="p-2 transition-all ease-in-out bg-gray-200 rounded hover:bg-gray-300"
              >
                {value}
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsModalOpen(false)}
            className="w-full p-2 mt-4 text-white transition-all ease-in-out bg-red-500 rounded hover:bg-red-700"
          >
            Cerrar
          </button>
        </Modal>
      </div>
    );
  };

  export default App;
