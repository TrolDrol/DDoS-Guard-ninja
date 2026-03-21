import { useState, useEffect } from 'react';

export const useImageLoader = (imageUrls) => {
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const loadedImages = {};
        
        const loadPromises = Object.entries(imageUrls).map(async ([key, url]) => {
          const img = new Image();
          return new Promise((resolve, reject) => {
            img.onload = () => {
              loadedImages[key] = img;
              resolve();
            };
            img.onerror = () => reject(new Error(`Не удалось загрузить ${url}`));
            img.src = url;
          });
        });
        
        await Promise.all(loadPromises);
        setImages(loadedImages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (Object.keys(imageUrls).length > 0) {
      loadImages();
    }
  }, [JSON.stringify(imageUrls)]);

  return { images, loading, error };
};