import React from 'react';
import ReactPlayer from 'react-player';

const PostIDComponent = ({props} ) => {

  const { text, image, video, other, audio, fileName } = props;
 
  return (
    <>
  
      {image && <img className="w-20" src={image} alt="Image" />}
      
      {text && text.startsWith("http") ? (
        <p>
          <a href={text} target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        </p>
      ) : (
        <p>{text}</p>
      )}

      {/* {other && (
        <div>
          <a href={other}>
            <img src="./images.png" alt="Other File" />
          </a>
          <span className="reverse file">
            <p>{fileName}</p>
          </span>
        </div>
      )} */}

      {video && <ReactPlayer url={video} controls loop />}
      
      {audio && <ReactPlayer url={audio} controls loop />}
    </>
  );
};

export default  PostIDComponent;