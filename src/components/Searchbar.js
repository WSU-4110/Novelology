import React, { useState } from 'react';

function Searchbar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.length > 0) {
    onSearch(query);
    } else {
      console.log("Attempted empty user search.")
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={query} onChange={handleChange} placeholder="Search users..." />
      <button type="submit">Search</button>

      {/* Add the Link to the UserPage component */}
      
    </form>
  );
}

export default Searchbar;