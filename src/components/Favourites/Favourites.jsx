import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Favourites.css"

const FAVOURITES_URL = "https://artwork-backend.onrender.com/favourites";

function Favourites() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const getFavourites = async () => {
      try {
        const res = await axios.get(FAVOURITES_URL);
        setFavourites(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFavourites();
  }, []);

  const getClassByIndex = (index) => {
    if (index % 5 === 0) return "large";
    if (index % 3 === 0) return "medium";
    return "small";
  };

  return (
    <div className="favourites-container">
      <h1>Favourite Artworks</h1>
      {favourites.length > 0 ? (
        <div className="favourites-grid">
          {favourites.map((artwork, index) => (
            <div key={artwork.id} className={`favourite-item ${getClassByIndex(index)}`}>
              <Link to={`/artwork/${artwork.artworkId}`}>
                <img
                  src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
                  alt={artwork.title}
                />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <h1>No favourite artworks yet.</h1>
      )}
    </div>
  );
}

export default Favourites;
