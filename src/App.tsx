/*
  import necessary modules and components
  className for all div tags represents corresponding CSS styling in styles.css

  NOTE: I examined the Apple stopwatch app, and used it as inspiration for this project!
*/
import React, { useEffect, useState } from 'react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';
// import './styles.css';

export default function App() {

  /*
    initizalizing state variables with useState hook
    - time: represents the current time on the stopwatch (initialized to 0)
    - running: boolean, indicates whether the stopwatch is running or stopped (initialized to false)
    - laps: an array to store lap times (initialized as an empty array)
    - buttonColor: determines the color of the start/stop button (initialized to #85D2B1)
  */
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [buttonColor, setButtonColor] = useState('#85D2B1');


  /*
    uses the useState hook to handle side effects
    - sets up an interval to update the time every 10 milliseconds when the stopwatch is running
    - clears the interval when the stopwatch is stopped
    - the dependency array [running] ensures the effect is re-run when the running state changes
  */
  useEffect(() => {
    let interval: string | number | NodeJS.Timeout;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);


  /*
    handleLap is a function that adds the current time and lap number to the laps array.
    uses the spread operator to preserve the previous lap times.
  */
  const handleLap = () => {
    setLaps((prevLaps) => [{ time, lapNumber: prevLaps.length + 1 }, ...prevLaps]);
  };

  /*
    start and stop buttons are combined into one button since there is no need for a stop button
    when the stopwatch isn't even running.
    when start is pressed, it becomes the stop button, and vice versa.
    handleStartStop is a function that toggles the running state and updates the button color accordingly.
  */
  const handleStartStop = () => {
    if (running) {
      setRunning(false);
      setButtonColor('#85D2B1'); //reset button color when stopped
    } else {
      setRunning(true);
      setButtonColor('#D41243'); //change button color when started
    }
  };

  /*
    handleReset resets the stopwatch by setting time to 0, clearing laps, and stopping the stopwatch
  */
  const handleReset = () => {
    setTime(0);
    setLaps([]);
    setRunning(false);
    setButtonColor('#85D2B1'); // Reset button color
  };

  return (
    <>
      <div className="container">
        <h1>StopWatch App</h1>

        
        {/* The StopWatch component is used to display the current time, receiving the time prop. */}
        <StopWatch time={time} />

        {/* The StopWatchButton component is used for the start/stop button.
        Props include buttonColor, running, and onClick function.
        The button text dynamically changes based on whether the stopwatch is running. */}
        <div className="buttons">

          <StopWatchButton
            buttonColor={buttonColor}
            running={running}
            onClick={handleStartStop}
          >
            {running ? 'Stop' : 'Start'}
          </StopWatchButton>

          {/* Additional buttons for resetting and capturing lap times. */}
          <StopWatchButton onClick={handleReset}>Reset</StopWatchButton>
          <StopWatchButton onClick={handleLap}>Lap</StopWatchButton>

        </div>

        {/* Checks if there are laps recorded before rendering the lap times table.
        If there are laps, a table is displayed with rows for lap number and lap time. */}

        {laps.length > 0 && (
          <div className="lap-times">
            <table>
              <thead>
                <tr>
                </tr>
              </thead>
              <tbody>
                {laps.map(({ time, lapNumber }) => (
                  <tr key={lapNumber}>
                    <td>Lap: {lapNumber}</td>
                    {/* extra td tags for the sake of design and UI */}
                    <td></td>
                    <td></td>
                    <td></td>
                    {/* implements formatTime function */}
                    <td>{formatTime(time)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </>
  );
}

// defines helper function to format time in mm:ss:SS format for laps
function formatTime(milliseconds: number) {

  /*
    divides the total milliseconds by 60000 to convert them into mins, then % 60 takes the remainder when 
    divided by 60 to ensure that the mins stay within the 0 to 59 range
    Math.floor: rounds down the result to the nearest integer, ensuring that we get a whole number for mins
  */
  const minutes = Math.floor((milliseconds / 60000) % 60);

  /*
    similar calculation
  */
  const seconds = Math.floor((milliseconds / 1000) % 60);

  /*
    similar calculation
  */
  const centiseconds = Math.floor((milliseconds / 10) % 100);

  /*
    EXPLAIN!!
  */
  return (
    ('0' + minutes).slice(-2) +
    ':' +
    ('0' + seconds).slice(-2) +
    ':' +
    ('0' + centiseconds).slice(-2)
  );
}