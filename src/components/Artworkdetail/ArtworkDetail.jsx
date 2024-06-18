import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const URL = "https://artwork-backend.onrender.com/artworks";
const FAVOURITES_URL = "http://localhost:5005/favourites"

function ArtworkDetail() {
    const { id } = useParams()
    const [artwork, setArtwork] = useState({})
    const [isFavourite,setIsFavourite] = useState(false)

    const getArtworkDetail = async () => {
        try {
          const res = await axios.get(URL + `/${id}`);
          setArtwork(res.data);
        } catch (error) {
          console.log(error);
        }
      };

      const checkFavouriteStatus = async () => {
        try {
          const res = await axios.get(FAVOURITES_URL+`/${id}`);
          setIsFavourite(res.data.isFavourite);
        } catch (error) {
          console.log(error);
        }
      }; 

      useEffect(() => {
        getArtworkDetail();
        checkFavouriteStatus()
      }, [id]);

      const toggleFavourite = async () => {
        try {
          if (isFavourite) {
            await axios.delete(FAVOURITES_URL+`/${id}`);
          } else {
            await axios.post(FAVOURITES_URL, {isFavourite: true , artworkId: id, id: id, image_id: `${artwork.image_id}` });
          }
          setIsFavourite(!isFavourite);
        } catch (error) {
          console.log(error);
        }
      };

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
            <button onClick={toggleFavourite}>{isFavourite ? 'Unfavourite' : 'Favourite'}</button>
    </div>
  )
}

export default ArtworkDetail