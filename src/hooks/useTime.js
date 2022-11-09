import React, { useMemo } from "react";

const useTime = () => {
  const [date, setDate] = React.useState(new Date()); // Save the current date to be able to trigger an update

  useMemo(() => {
    const timer = setInterval(() => {
      // Creates an interval which will update the current data every minute
      // This will trigger a rerender every component that uses the useDate hook.
      setDate(new Date());
    }, 60 * 1000);
    return () => {
      clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
    };
  }, []);

  return date;
};

export default useTime;
