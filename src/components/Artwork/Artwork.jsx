import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Artwork.css"

const URL = "https://artwork-backend.onrender.com/artworks";

function Artwork() {
  const [artworks, setArtworks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getArtwork = async () => {
    try {
      const res = await axios.get(URL);
      setArtworks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArtwork();
  }, []);

  const filteredArtworks = artworks.filter((artwork) =>
    artwork.artist_display.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="artwork-container">
      <p>Featured Artworks</p>
      <input
        type="text"
        placeholder="Search Artist"
        className="artwork-search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="artwork-grid">
      {filteredArtworks.map((artwork) => (
          <div key={artwork.id} className="artwork-item">
          
          <Link to={`/artwork/${artwork.id}`}>
            <img
              src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
              alt={artwork.title}
              loading="lazy"
            /></Link>
            <p>{artwork.title}</p>
            <p>{artwork.artist_title}</p>
          
        </div>
      ))}
    </div>
    </div>
  );
}

export default Artwork;
