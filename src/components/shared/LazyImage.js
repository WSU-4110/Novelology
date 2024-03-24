import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import React, { useRef, useEffect, useState } from 'react';

const LazyImage = ({ src, alt, placeholder, width, height, className }) => {
  const imgRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const observer = useRef(null);

  // IntersectionObserver is a browser API that allows you to observe when an element comes into view.
  useEffect(() => {
    // If the browser does not support IntersectionObserver, we will load the image immediately.
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.current.unobserve(entry.target);
        }
      });
    });

    // If the image is in the viewport, we will load the image immediately.
    if (imgRef.current) {
      observer.current.observe(imgRef.current);
    }


    // Clean up the observer when the component is unmounted.
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


// Set the default value for the placeholder prop.
LazyImage.defaultProps = {
  placeholder: faSpinner 
};

export default LazyImage;
