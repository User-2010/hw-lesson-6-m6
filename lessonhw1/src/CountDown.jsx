
import { useEffect, useState } from "react";

const CountDown = () => {
    const [count, setCount] = useState(60);
    const [isRunning, setIsRunning] = useState(false);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        if (!isRunning) {
            return;
        }

        const intervalId = setInterval(() => {
            setCount((prev) => {
                if (prev > 1) {
                    return prev - 1;
                } else {
                    setIsRunning(false);
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [isRunning]);

    const handleToggle = () => {
        if (count === 0) {
            return;
        }

        setIsRunning((prev) => !prev);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;

        if (value === "" || Number(value) >= 0) {
            setInputValue(value);
        }
    };

    const handleDecrease = () => {
        if (inputValue === "") {
            return;
        }

        const amount = Number(inputValue);

        if (!Number.isFinite(amount) || amount <= 0) {
            return;
        }

        setCount((prev) => Math.max(0, prev - amount));

        if (count - amount <= 0) {
            setIsRunning(false);
        }

        setInputValue("");
    };

    const handleReset = () => {
        setCount(60);
        setIsRunning(false);
        setInputValue("");
    };

    return (
        <div>
            <input
                type="number"
                min="0"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Введите число"
            />

            <button onClick={handleToggle} disabled={count === 0}>
                {isRunning ? "Пауза" : "Старт"}
            </button>

            <button
                onClick={handleDecrease}
                disabled={count === 0}
            >
                Уменьшить
            </button>

            <button onClick={handleReset}>
                Сброс
            </button>

            <h1>{count}</h1>
        </div>
    );
};

export default CountDown;
