import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css"


function NavBar({ onSearch }) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    onSearch(event.target.value.toLowerCase());
  };

  return (
    <div>
    <nav>
      <Link to="/">Artworks</Link>
      <Link to="/favourites">Favourites</Link>
      <span onClick={handleSearchClick} style={{ cursor: 'pointer' }}>Search</span></nav>
            {showSearch && (
        <div className="search-overlay">
        <input
          className="search-input"
          type="text"
          placeholder="Search by artist name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      )}
      {showSearch && <div className="dark-background" onClick={handleSearchClick}></div>}
    </div>
  );
}

export default NavBar;