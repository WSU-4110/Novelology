import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import React, { useRef, useEffect, useState } from 'react';

const LazyImage = ({ src, alt, placeholder, width, height, className }) => {
  const imgRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const observer = useRef(null);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.current.unobserve(entry.target);
        }
      });
    });

    if (imgRef.current) {
      observer.current.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.current.unobserve(imgRef.current);
      }
    };
  }, []);

  return (
    <img
      ref={imgRef}
      src={isVisible ? src : placeholder.iconName}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};

LazyImage.defaultProps = {
  placeholder: faSpinner 
};

export default LazyImage;
