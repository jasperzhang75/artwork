import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const URL = "http://localhost:5005/artworks";


function ArtworkDetail() {
    const { id } = useParams()
    const [artwork, setArtwork] = useState({})

    const getArtworkDetail = async () => {
        try {
          const res = await axios.get(URL + `/${id}`);
          setArtwork(res.data);
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(() => {
        getArtworkDetail();
      }, []);

  return (

    <div>
        <img
              src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
              alt={artwork.title}
            />
            <p>{artwork.title}</p>
            <p>{artwork.date_start} - {artwork.date_end}</p>
            <p>{artwork.artist_display}</p>
            <p>{artwork.description}</p>
            <button>Like</button>
    </div>
  )
}

export default ArtworkDetail