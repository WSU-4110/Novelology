import React from 'react';
import ReactPlayer from 'react-player';
const FileRenderer = ({file}) => {
	const fileType = getFileType(file)
	const fileURL = URL.createObjectURL(file)
	if (fileType === 'image'){
		return(
			<img src={fileURL} className="max-w-xs"alt='Uploaded Image'/>
		)
	}
	else if (fileType === 'video'){
		return(
			<ReactPlayer url={fileURL} controls loop />
		)
	}
	else if (fileType === 'audio'){
		return(
			<ReactPlayer url={fileURL} controls loop />
		)
	}
	else {
		return(
			<a href={fileURL}><img src='./images.png'></img> </a>
		)
	}

}

export function getFileType(file) {
	if (file.type.startsWith('image/')){
		return 'image'
	}
	else if (file.type.startsWith('video/')){
		return 'video'
	}
	else if (file.type.startsWith('audio/')){
		return 'audio'
	}
	else {
		return 'other'
	}
}

export default FileRenderer;