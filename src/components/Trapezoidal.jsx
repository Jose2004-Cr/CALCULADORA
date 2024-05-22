import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import Modal from 'react-modal';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Registrar componentes de chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

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
                label: 'f(x)',
                data: yValues,
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2,
                fill: false,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Gráfica de la Función',
            },
        },
    };

    return <Line data={data} options={options} />;
};

const App = () => {
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [funcStr, setFuncStr] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [showGraph, setShowGraph] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const predefinedFunctions = {
        'Math.log(x)': 'Logaritmo natural (ln(x))',
        'Math.pow(x, 3)': 'x al cubo (x^3)',
        'Math.sin(x)': 'Seno (sin(x))',
        'Math.exp(x)': 'Exponencial (e^x)',
        'Math.sqrt(x)': 'Raíz cuadrada (sqrt(x))',
    };

    const integrateTrapezoidal = (func, a, b) => {
        const n = 100; // Número de subintervalos
        const h = (b - a) / n; // Ancho de cada subintervalo
        let sum = (func(a) + func(b)) / 2; // Suma inicial
        for (let i = 1; i < n; i++) {
            // Suma de los valores de la función en los puntos interiores
            sum += func(a + i * h);
        }
        return sum * h; // Multiplicar por el ancho del intervalo
    };

    const calculateError = (computed, reference) => {
        return Math.abs((computed - reference) / reference) * 100;
    };

    const handleInputChange = () => {
        setShowGraph(false);
    };

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

        if (!funcStr) {
            setResult('Por favor, introduce una función.');
            setError(null);
            setShowGraph(false);
            return;
        }

        try {
            const func = new Function('x', `return ${funcStr}`);
            const result = integrateTrapezoidal(func, aNum, bNum);
            setResult(result);

            // No calcular error si no hay valor de referencia
            setError(null);

            setShowGraph(true);
        } catch (err) {
            setResult('Error al calcular la integral.');
            setError(null);
            setShowGraph(false);
        }
    };

    return (
        <div className="animate__animated animate__fadeIn">
            <h1 className="text-3xl font-bold text-center">Método Trapezoidal</h1>
            <div className="grid grid-cols-3 p-6">
                <div className="w-full max-w-md p-8 pt-5 bg-white">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Ingresa la función:
                            </label>
                            <input
                                type="text"
                                value={funcStr}
                                onChange={(e) => {
                                    setFuncStr(e.target.value);
                                    handleInputChange();
                                }}
                                placeholder="Ejemplo: x**2"
                                className="w-full p-2 border border-gray-300 rounded"
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
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Límite inferior (a)
                            </label>
                            <input
                                type="text"
                                value={a}
                                onChange={(e) => setA(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
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
                            className="w-full bg-[#192785] text-white p-2 rounded hover:bg-opacity-80 transition-all ease-in-out hover:scale-[103%]"
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
                            {/* Error no calculado */}
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-center col-span-2 p-5">
                    {showGraph && (
                        <Graph
                            func={new Function('x', `return ${funcStr}`)}
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
