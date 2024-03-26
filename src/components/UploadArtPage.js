import React from 'react';

function UploadArtPage() {
  const handleFileChange = (event) => {
    // Handle file upload event
    console.log(event.target.files);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full md:w-1/2 lg:w-2/3 bg-white p-4 rounded-lg shadow-lg border-4 border-maroon">
        <h3 className="text-xl font-bold mb-4 text-maroon">Upload Your Artwork</h3>
        
        {/* Option 1: Use Camera */}
        <div className="mb-4">
          <label htmlFor="use-camera" className="text-maroon font-semibold mb-2 inline-block">Use Camera</label>
          <button id="use-camera" className="w-full bg-maroon text-white px-3 py-2 rounded shadow hover:bg-maroon-dark transition duration-300">Open Camera</button>
        </div>
        
        {/* Option 2: Upload from Computer */}
        <div className="mb-4">
          <label htmlFor="file-upload" className="text-maroon font-semibold mb-2 inline-block">Upload from Computer</label>
          <input 
            id="file-upload" 
            type="file" 
            onChange={handleFileChange} 
            className="w-full text-maroon px-3 py-2 border border-maroon rounded shadow cursor-pointer"
          />
        </div>
        
        {/* Option 3: Upload from Camera Roll */}
        <div className="mb-4">
          <label htmlFor="camera-roll-upload" className="text-maroon font-semibold mb-2 inline-block">Upload from Camera Roll</label>
          <input 
            id="camera-roll-upload" 
            type="file" 
            accept="image/*"
            capture="camera"
            onChange={handleFileChange} 
            className="w-full text-maroon px-3 py-2 border border-maroon rounded shadow cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default UploadArtPage;
