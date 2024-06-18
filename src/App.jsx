
import './App.css'
import Artwork from './components/Artwork/Artwork.jsx'
import { Routes, Route } from "react-router-dom";
import ArtworkDetail from './components/Artworkdetail/ArtworkDetail.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Artwork />} />
        <Route path="/artwork/:id" element={<ArtworkDetail />} />
      </Routes>
    </>
  )
}

export default App
