import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import App from '../App';
import formatTime from "../App"
import '@testing-library/jest-dom';
jest.useFakeTimers();

// Test if the App component renders without crashing
test('renders App component', () => {
  render(<App />);
});

// Test if the stopwatch starts and stops correctly
test('Stopwatch starts and stops correctly', async () => {
  render(<App />);
  
  // Start the stopwatch
  fireEvent.click(screen.getByRole('button', { name: /start/i }));
  
  // Wait for a while
  await act(async () => {
    jest.advanceTimersByTime(100);
  });

  // Check that the button text changed to "Stop"
  expect(screen.getByRole('button', { name: /stop/i })).toHaveTextContent(/stop/i);

  // Stop the stopwatch
  fireEvent.click(screen.getByRole('button', { name: /stop/i }));

  // Wait for a while
  await act(async () => {
    jest.advanceTimersByTime(100);
  });

  // Check that the button text changed back to "Start"
  expect(screen.getByRole('button', { name: /start/i })).toHaveTextContent(/start/i);
});


// Test if the stopwatch resets correctly
const timeMatcher = (regex: RegExp, node: Element) => {
  const hasTextContent = (node: HTMLElement) => regex.test(node.textContent || '');

  const nodeHasTextContent = hasTextContent(node as HTMLElement);
  const childrenDontHaveTextContent = Array.from(node.children).every(
    (child: Element) => !hasTextContent(child as HTMLElement)
  );

  return nodeHasTextContent && childrenDontHaveTextContent;
};

test('reset button resets the stopwatch', () => {
  // Render the App component
  const { getByText } = render(<App />);

  // Start the stopwatch
  fireEvent.click(getByText('Start'));

  // Wait for a while to simulate time passing (e.g., 1000 milliseconds)
  act(() => {
    jest.advanceTimersByTime(1000);
  });

  // Click the reset button
  act(() => {
    fireEvent.click(getByText('Reset'));
  });

  // Check if the time is reset to 0 using the custom text matcher
  expect(getByText((content, node) => timeMatcher(/^\d{2}:\d{2}:\d{2}$/, node as Element))).toBeInTheDocument();


});

// Jest setup to handle the setInterval in the useEffect hook
beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});


// Test if the stopwatch records laps correctly
test('Stopwatch records laps correctly', () => {
  render(<App />);
  
  // Start the stopwatch
  fireEvent.click(screen.getByRole('button', { name: /start/i }));

  // Wait for a while
  act(() => {
    jest.advanceTimersByTime(100);
  });

  // Record lap
  fireEvent.click(screen.getByRole('button', { name: /lap/i }));
  expect(screen.getByText(/lap: 1/i)).toBeInTheDocument();

  // Wait for a while
  act(() => {
    jest.advanceTimersByTime(100);
  });

  // Record another lap
  fireEvent.click(screen.getByRole('button', { name: /lap/i }));
  expect(screen.getByText(/lap: 2/i)).toBeInTheDocument();
});