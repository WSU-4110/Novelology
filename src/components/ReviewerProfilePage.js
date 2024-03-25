import React from 'react';
import NavigationBar from './NavigationBar';

export default function ReviewerProfilePage() {
  const [userDetails, setUserDetails] = React.useState({
    username: "UserName",
    followers: 100,
    following: 150,
    bio: "Bio Description",
    genres: ["Genre1", "Genre2", "Genre3"]
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavigationBar />
      
      {/* You might want to change this background or keep it subtle */}
      <div className="bg-gray-300 h-96 w-full">
        {/* Profile Cover Image */}
      </div>

      <div className="flex justify-center mt-[-3rem]">
        {/* For user image, using maroon as a border or shadow could be nice */}
        <div className="h-40 w-40 rounded-full bg-gray-400 border-4 border-maroon shadow-lg">
          {/* User Profile Image */}
        </div>
      </div>

      <div className="flex flex-col items-center mt-4 space-y-2">
        <h1 className="text-4xl font-bold text-maroon">{userDetails.username}</h1>
        <p className="text-maroon">@{userDetails.username}</p>
        <div className="text-white bg-maroon px-3 py-1 rounded-full shadow-md">
          Reviewer
        </div>
        <div className="flex space-x-3">
          {userDetails.genres.map((genre, index) => (
            <span key={index} className="text-maroon bg-gray-200 px-3 py-1 rounded-full shadow">
              {genre}
            </span>
          ))}
        </div>
        <div className="flex space-x-5 text-maroon">
          <span>{userDetails.followers} Followers</span>
          <span>{userDetails.following} Following</span>
        </div>
        <p className="text-maroon">{userDetails.bio}</p>
      </div>

      <div className="px-6 py-4 flex justify-center space-x-10 border-t border-maroon">
        <button className="font-semibold text-lg text-maroon">Books Reviewed</button>
        <button className="font-semibold text-lg text-maroon">Activity</button>
        <button className="font-semibold text-lg text-maroon">Posts</button>
      </div>

      <div className="flex flex-wrap justify-center gap-6 p-6">
        {/* About Column */}
        <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-lg border border-maroon">
          <h3 className="text-xl font-bold mb-4 text-maroon">About</h3>
          <p><strong>Gender:</strong> Male</p>
          <p><strong>Born:</strong> June 28, 1980</p>
          <p><strong>Location:</strong> Detroit, Michigan</p>
          <p><strong>Email:</strong> reviewer@example.com</p>
        </div>

        {/* Activity Column */}
        <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-lg border border-maroon">
          <h3 className="text-xl font-bold mb-4 text-maroon">Your Activity</h3>
          <div className="mb-2 text-maroon">Recent Activity 1</div>
          <div className="text-maroon">Recent Activity 2</div>
        </div>

        {/* Top Reviews Column */}
        <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-lg border border-maroon">
          <h3 className="text-xl font-bold mb-4 text-maroon">Top Reviews</h3>
          <div className="mb-2 text-maroon">Review 1</div>
          <div className="text-maroon">Review 2</div>
        </div>
      </div>
    </div>
  );
}