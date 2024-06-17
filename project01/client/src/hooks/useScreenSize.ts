import { useEffect, useState } from "react";

export function useSizeLTMd() {
  const [isMediumOrLess, setIsMediumOrLess] = useState(false);
  useEffect(() => {
    function handleResize() {
      setIsMediumOrLess(window.innerWidth <= 810);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMediumOrLess;
}

export function useScreenSize() {
  const [screenSize, setScreenSize] = useState(1080);
  useEffect(() => {
    function handleResize() {
      setScreenSize(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return screenSize;
}
