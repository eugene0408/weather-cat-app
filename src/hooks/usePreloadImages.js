import { useEffect, useState } from "react";

export const usePreloadImages = (imgUrls = []) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!imgUrls || imgUrls.length === 0) {
      setLoaded(true);
      return;
    }

    let loadedCount = 0;
    const total = imgUrls.length;

    imgUrls.forEach((url) => {
      const img = new Image();
      img.onload = handleLoad;
      img.onerror = handleLoad;

      img.src = url;
    });

    function handleLoad() {
      loadedCount += 1;
      if (loadedCount === total) {
        setLoaded(true);
      }
    }
  }, [imgUrls]);

  return loaded;
};
