import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import TextEditor from './TextEditor'; 

const AnimatedText = ({ content, fade, isLoading, onContentChange }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isErasing, setIsErasing] = useState(false);

  useEffect(() => {
    if (fade) {
      setIsErasing(true);
      setTimeout(() => {
        setDisplayedText('');
        setIsErasing(false);
      }, 1000); 
    } else {
      let index = 0;
      const interval = setInterval(() => {
        setDisplayedText((prev) => prev + content.charAt(index));
        index += 1;
        if (index >= content.length) {
          clearInterval(interval);
        }
      }, 50);
    }
  }, [content, fade]);

  return (
    <div
      className={`relative p-4 bg-white border rounded-md min-h-[200px] overflow-hidden ${
        isErasing ? 'animate-fade-out' : 'animate-fade-in'
      }`}
    >
      {isLoading ? (
        <Skeleton count={5} height={20} />
      ) : (
        <TextEditor content={displayedText} onChange={onContentChange} />
      )}
    </div>
  );
};

export default AnimatedText;
