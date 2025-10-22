import { useState, useEffect } from "react";

export const useReanimate = (...deps) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(false);
    const timeout = setTimeout(() => setAnimate(true), 0);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return animate;
};
