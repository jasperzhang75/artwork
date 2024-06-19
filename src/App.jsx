
import './App.css'
import Artwork from './components/Artwork/Artwork.jsx'
import { Routes, Route } from "react-router-dom";
import ArtworkDetail from './components/Artworkdetail/ArtworkDetail.jsx';
import Favourites from './components/Favourites/Favourites.jsx';
import Navbar from './components/Navbar/navbar.jsx';
import { useState } from 'react';


function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  return (
    <>
    <Navbar onSearch={handleSearch} />
    <Routes>
      <Route path="/" element={<Artwork searchTerm={searchTerm} />} />
      <Route path="/artwork/:id" element={<ArtworkDetail />} />
      <Route path="/favourites" element={<Favourites />} />
    </Routes>
    </>
  )
}

export default App
