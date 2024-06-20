
import './App.css'
import Artwork from './components/Artwork/Artwork.jsx'
import { Routes, Route } from "react-router-dom";
import ArtworkDetail from './components/Artworkdetail/ArtworkDetail.jsx';
import Favourites from './components/Favourites/Favourites.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import ArtistArtworks from './components/ArtistArtworks/ArtistArtworks'
import ArtistArtworkDetail from './components/ArtistArtworkDetail/ArtistArtworkDetail'; 
import AIMpressionist from './components/AIMpressionist/AIMpressionist';

function App() {
  
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Artwork />} />
      <Route path="/artwork/:id" element={<ArtworkDetail />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/artist/:artistUrl" element={<ArtistArtworks />} />
      <Route path="/artist-artwork/:contentId" element={<ArtistArtworkDetail />} />
      <Route path="/ai-mpressionist" element={<AIMpressionist />} />
    </Routes>
    </>
  )
}

export default App
