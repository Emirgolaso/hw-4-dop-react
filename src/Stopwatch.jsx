import React, { useState, useEffect } from 'react';
import './style.css';

const Stopwatch = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 0.1);
      }, 100);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  const handleStartStop = () => {
    setIsActive(prevIsActive => !prevIsActive);
  };

  const handleReset = () => {
    setSeconds(0);
    setIsActive(false);
  };

  const handleLap = () => {
    setLaps(prevLaps => [seconds.toFixed(1), ...prevLaps]); 
  };

  return (
    <div className='secund'>
      <h1>Секундомер</h1>
      <p>{(seconds.toFixed(1))} s</p>
      <button className='start' onClick={handleStartStop}>{isActive ? 'Стоп' : 'Старт'}</button>
      <button className='reset' onClick={handleReset}>заново</button>
      <button className='inter' onClick={handleLap}>добавить в интервал (результатов)</button>

      {laps.length > 0 && (
        <div className='second'>
          <h2>Результаты интервал</h2>
          <ul>
            {laps.map((lap, index) => (
              <li key={index}>{lap} секунда</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Stopwatch;
