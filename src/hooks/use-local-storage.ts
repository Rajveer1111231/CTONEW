"use client";

import { useState, useEffect } from "react";

// Helper function to handle Date serialization/deserialization
function replacer(key: string, value: any) {
  if (value instanceof Date) {
    return value.toISOString();
  }
  return value;
}

function reviver(key: string, value: any) {
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)) {
    const date = new Date(value);
    if (!isNaN(date.getTime())) { // Check if it's a valid date
      return date;
    }
  }
  return value;
}

function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue, using reviver for Date objects
      return item ? JSON.parse(item, reviver) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.error("Error reading from local storage:", error);
      return initialValue;
    }
  });

  // useEffect to update local storage when the state changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        // Store json, using replacer for Date objects
        window.localStorage.setItem(key, JSON.stringify(storedValue, replacer));
      } catch (error) {
        console.error("Error writing to local storage:", error);
      }
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;