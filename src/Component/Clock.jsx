import React, { useState, useEffect, useRef } from 'react';

function Clock({ selectedCountry }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [paused, setPaused] = useState(false);

  // Use a ref to store the latest selectedCountry value
  const selectedCountryRef = useRef(selectedCountry);

  useEffect(() => {
    // Update the ref value whenever selectedCountry prop changes
    selectedCountryRef.current = selectedCountry;
  }, [selectedCountry]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!paused) {
        fetch(`http://worldtimeapi.org/api/timezone/${selectedCountryRef.current}`)
          .then(response => response.json())
          .then(data => {
            const apiDateTime = new Date(data.utc_datetime);
            const offset = apiDateTime.getTimezoneOffset();
            const adjustedTime = new Date(apiDateTime.getTime() - (offset * 60 * 1000));
            setCurrentTime(adjustedTime);
          })
          .catch(error => console.error('Error fetching time:', error));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [paused]);

  const handlePauseStartClick = () => {
    setPaused(prevPaused => !prevPaused);
  };

  return (
    <>
    <div className="clock">
      <span>{currentTime.toLocaleTimeString()}</span>
    </div>
    <button className='pause-start' onClick={handlePauseStartClick}>{paused ? 'Start' : 'Pause'}</button>
    </>
  );
}

export default Clock;
