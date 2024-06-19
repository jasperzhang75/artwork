import { useParams, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const URL = "https://artwork-backend.onrender.com/artworks";
const FAVOURITES_URL = "https://artwork-backend.onrender.com/favourites";
const COMMENTS_URL = "https://artwork-backend.onrender.com/comments";

function ArtworkDetail() {
  const { id } = useParams();
  const [artwork, setArtwork] = useState({});
  const [isFavourite, setIsFavourite] = useState(false);
  const [comments, setComments] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

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
      const res = await axios.get(FAVOURITES_URL + `?artworkId=${id}`);
      console.log(res.data);
      setIsFavourite(res.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getComments = async () => {
    try {
      const res = await axios.get(`${COMMENTS_URL}?artworkId=${id}`);
      console.log(res.data)
      setComments(res.data[0]||null);
      console.log(comments)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArtworkDetail();
    checkFavouriteStatus();
    getComments();
  }, [id]);

  const toggleFavourite = async () => {
    try {
      if (isFavourite) {
        await axios.delete(FAVOURITES_URL + `/${isFavourite.id}`);
      } else {
        await axios.post(FAVOURITES_URL, {
          artworkId: Number(id),
          image_id: `${artwork.image_id}`,
        });
      }
      checkFavouriteStatus();
    } catch (error) {
      console.log(error);
    }
  };

  const saveComment = async () => {
    try {
      if (comments) {
        await axios.put(`${COMMENTS_URL}/${comments.id}`, {
          id: comments.id,
          artworkId: id,
          text: newComment,
        });
      } else {
        await axios.post(COMMENTS_URL, {
          artworkId: Number(id),
          text: newComment,
        });
      }
      await getComments()
      //setComments(newComment);
      // setNewComment("");
      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToArtist = () => {
    const artistUrl = artwork.artist_title.toLowerCase().split(" ").join("-");
    navigate(`/artist/${artistUrl}`);
  };

  return (
    <div>
      <img
        src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
        alt={artwork.title}
      />
      <p>{artwork.title}</p>
      <p>
        {artwork.date_start} - {artwork.date_end}
      </p>
      <span onClick={navigateToArtist} style={{ cursor: "pointer", textDecoration: "underline", color: "blue" }}>
          {artwork.artist_display}</span>
      <p>{artwork.description}</p>
      <button onClick={toggleFavourite}>
        {isFavourite ? "Unfavourite" : "Favourite"}
      </button>
      <h2>Comment</h2>
      {editMode ? (
        <>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add or edit your comment"
          />
          <button onClick={saveComment}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </>
      ) : (
        <>
<p>{comments ? comments.text : "No comments yet"}</p>
          <button
            onClick={() => {
              setNewComment(comments ? comments.text : "");
              setEditMode(true);
            }}
          >
            {comments ? "Edit" : "Add a Comment"}
          </button>
        </>
      )}
    </div>
  );
}

export default ArtworkDetail;
