import React from 'react';

/**
 * StopWatch Component
 * 
 * Displays the elapsed time in a formatted manner (mm:ss:SS)
 * 
 * @component
 * @param {Object} props - the properties of the StopWatch component
 * @param {number} props.time - the elapsed time to be displayed
 * @returns {JSX.Element} - the StopWatch component rendering the formatted time display
 */

interface StopWatchProps {
    time: number;
}

/*
  declares StopWatch as a functional component (FC),
  expects props of type StopWatchProps,
  and takes destructured prop time.
  renders the display of the stopwatch timer.
*/
const StopWatch: React.FC<StopWatchProps> = ({ time }) => {
    return (
      <div className="time-display">
        {/* appropriate math for time conversions */}
        <span>{('0' + Math.floor((time / 60000))).slice(-2)}:</span>
        <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{('0' + Math.floor((time / 10) % 100)).slice(-2)}</span>
      </div>
    );
  };
  
export default StopWatch;

