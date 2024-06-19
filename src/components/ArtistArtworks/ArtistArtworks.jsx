import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ARTIST_API = "https://www.wikiart.org/en/App/Painting/PaintingsByArtist?artistUrl=";

function ArtistArtworks() {
  const { artistUrl } = useParams();
  const [artworks, setArtworks] = useState([]);

  const getArtistArtworks = async () => {
    try {
      const res = await axios.get(`${ARTIST_API}${artistUrl}&json=2`);
      setArtworks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArtistArtworks();
  }, [artistUrl]);

  return (
    <div>
      <h1>Artworks by {artistUrl.replace("-", " ")}</h1>
      <div className="artwork-grid">
        {artworks.map((artwork) => (
          <img key={artwork.contentId} src={artwork.image} alt={artwork.title} />
        ))}
      </div>
    </div>
  );
}

export default ArtistArtworks;
