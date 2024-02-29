import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import React, { useRef, useEffect, useState, useCallback } from 'react';

const LazyImage = ({ src, alt, placeholder }) => {
  const imgRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const observer = useRef(null);

  const handleIntersect = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.current.unobserve(entry.target);
      }
    });
  }, []);

  useEffect(() => {
    observer.current = new IntersectionObserver(handleIntersect, { threshold: 0.1 });

    if (imgRef.current) {
      observer.current.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.current.unobserve(imgRef.current);
      }
    };
  }, [handleIntersect]);

  return (
    <img
      ref={imgRef}
      src={isVisible ? src : placeholder.iconName}
      alt={alt}
      loading="lazy"
    />
  );
};

LazyImage.defaultProps = {
  placeholder: faSpinner
};

export default LazyImage;
