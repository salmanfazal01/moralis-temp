import { useEffect, useState } from "react";
import useScrollPosition from "./useScrollPosition";

const useDocRead = (_read, delay = 100) => {
  const [read, setRead] = useState(_read);
  const scrollPosition = useScrollPosition();

  useEffect(() => {
    setTimeout(() => {
      if (!read) {
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.offsetHeight;

        if (
          documentHeight <= windowHeight ||
          scrollPosition > (documentHeight - windowHeight) / 3
        ) {
          setRead(true);
        }
      }
    }, delay);
  }, [scrollPosition, read]);

  return read;
};

export default useDocRead;
