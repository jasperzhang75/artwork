import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const URL = "https://artwork-backend.onrender.com/artworks";

function Artwork() {
  const [artworks, setArtworks] = useState([]);

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

  return (
    <div>
      {artworks.map((artwork) => (
        <div key={artwork.id}>
          <Link to={`/artwork/${artwork.id}`}>
            <img
              src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
              alt={artwork.title}
              loading="lazy"
            />
            <p>{artwork.title}</p>
            <p>{artwork.artist_title}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Artwork;
