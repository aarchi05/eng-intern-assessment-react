import React from 'react'

/*
  defines an interface StopWatchButtonProps that specifies the expected props for the StopWatchButton component.
  - buttonColor?: string; -> An optional prop for specifying the background color of the button
  - running?: boolean; -> An optional prop indicating whether the stopwatch is currently running
  - onClick: () => void; -> A required prop representing the function to be executed when the button is clicked. 
    It is a function that takes no arguments and returns nothing (void)
*/
interface StopWatchButtonProps {
    buttonColor?: string;
    running?: boolean;
    onClick: () => void;
}

/*
  declares a constant StopWatchButton as a FC.
  the component accepts props of type StopWatchButtonProps.
  destructures the props (buttonColor, onClick, and children) directly in the function parameter list
*/
const StopWatchButton: React.FC<StopWatchButtonProps> = ({
    buttonColor,
    onClick,
    children,
  }) => {
    /*
      defines structure for StopWatchButton component
      represents a button element with an optional inline style for setting the background color based on the buttonColor prop
      onClick prop specifies the function to be called when the button is clicked.
      {children} represents the content between the opening and closing tags of the StopWatchButton component - button text
    */
    return (
      <button style={{ backgroundColor: buttonColor }} onClick={onClick}>
        {children}
      </button>
    );
  };
  
export default StopWatchButton;
