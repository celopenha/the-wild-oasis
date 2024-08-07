import { useEffect } from "react";
import { useRef } from "react";

const useOutsideClick = (handler, listenCapturing = true) => {
  const ref = useRef();
  
  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };
    document.addEventListener("click", handleClick, listenCapturing);

    return () => document.removeEventListener("click", handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return ref;
}

export default useOutsideClick;