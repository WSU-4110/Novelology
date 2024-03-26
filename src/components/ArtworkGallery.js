import React from 'react';
import { useNavigate } from 'react-router-dom';

    
function ArtworkGallery() {

    const navigate = useNavigate(); // useNavigate hook for navigation

    const navigateToUpload = () => {
        navigate('/upload-artwork');

    };
    
    return (
        <div className="w-full md:w-1/2 lg:w-2/3 bg-white p-4 rounded-lg shadow-lg border border-maroon relative">
            {/* Upload Button in the top right corner */}
            <button 
                className="absolute top-0 right-0 m-4 bg-maroon text-white px-2 py-1 text-sm rounded-lg shadow hover:bg-maroon-dark"
                onClick={navigateToUpload} >
                Upload Artwork
            </button>

            <h3 className="text-xl font-bold mb-4 text-maroon">Artwork Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Placeholder for Artwork Image 1 */}
                <div className="h-48 overflow-hidden rounded-lg shadow-lg bg-gray-200 flex items-center justify-center aspect-square">
                    <span className="text-maroon">Image 1</span>
                </div>
                {/* Placeholder for Artwork Image 2 */}
                <div className="h-48 overflow-hidden rounded-lg shadow-lg bg-gray-200 flex items-center justify-center aspect-square">
                    <span className="text-maroon">Image 2</span>
                </div>
                {/* Placeholder for Artwork Image 3 */}
                <div className="h-48 overflow-hidden rounded-lg shadow-lg bg-gray-200 flex items-center justify-center aspect-square">
                    <span className="text-maroon">Image 3</span>
                </div>
                {/* Placeholder for Artwork Image 4 */}
                <div className="h-48 overflow-hidden rounded-lg shadow-lg bg-gray-200 flex items-center justify-center aspect-square">
                    <span className="text-maroon">Image 4</span>
                </div>
                {/* Placeholder for Artwork Image 5 */}
                <div className="h-48 overflow-hidden rounded-lg shadow-lg bg-gray-200 flex items-center justify-center aspect-square">
                    <span className="text-maroon">Image 5</span>
                </div>
                {/* Placeholder for Artwork Image 6 */}
                <div className="h-48 overflow-hidden rounded-lg shadow-lg bg-gray-200 flex items-center justify-center aspect-square">
                    <span className="text-maroon">Image 6</span>
                </div>
            </div>
        </div>
    );
}

export default ArtworkGallery;
