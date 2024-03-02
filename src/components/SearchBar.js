import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Call the onSearch callback with the updated query
  };
  return (
    <div className="container mx-auto p-4">
      <div className="relative rounded-full bg-gray-200 p-2"> 
        <input
          type="search"
          name="search"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleChange}
          className="bg-transparent pl-4 pr-8 text-gray-700 focus:outline-none w-full"
        />
        
      </div>
    </div>
  );
};

export default SearchBar;
