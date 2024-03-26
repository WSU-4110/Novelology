import React from 'react';
import ReactPlayer from 'react-player';

const PostIDComponent = ({props} ) => {

  const { text, image, video, other, audio, fileName } = props;
 
  return (
    <>
      <div class=''>
         {image && <img className="w-20" src={image} alt="Image" />}
         {video && <ReactPlayer url={video} controls loop />}
      
        {audio && <ReactPlayer url={audio} controls loop />}
        {text && text.startsWith("http") ? (
        <p>
          <a href={text} target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        </p>
      ) : (
        <>
        <div dangerouslySetInnerHTML={{ __html: text }}/>
           
        </>
     
      )}

      </div>
     
      
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

      
    </>
  );
};

export default  PostIDComponent;