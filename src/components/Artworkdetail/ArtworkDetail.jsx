import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { generateArtwork } from "./../../services/openServices";
import "./ArtworkDetail.css";

const URL = "https://artworkbackend.adaptable.app/artworks";
const FAVOURITES_URL = "https://artworkbackend.adaptable.app/favourites";
const COMMENTS_URL = "https://artworkbackend.adaptable.app/comments";

function ArtworkDetail() {
  const { id } = useParams();
  const [artwork, setArtwork] = useState({});
  const [isFavourite, setIsFavourite] = useState(false);

  const [comments, setComments] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [editMode, setEditMode] = useState(false);

  const [generatedArtwork, setGeneratedArtwork] = useState(null);
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
      console.log(res.data);
      setComments(res.data[0] || null);
      console.log(comments);
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
      await getComments();
      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToArtist = () => {
    const artistUrl = artwork.artist_title.toLowerCase().split(" ").join("-");
    navigate(`/artist/${artistUrl}`);
  };

  const handleGenerateArtwork = async () => {
    try {
      const prompt = `Create a new artwork inspired by ${artwork.title} by 
      ${artwork.artist_display}, created in ${artwork.date_start}.`;
      const url = await generateArtwork(prompt);
      setGeneratedArtwork(url);
    } catch (error) {
      console.log("Error generating artwork: ", error);
    }
  };

  return (
    <div>
      <hr></hr>
      <div className="artwork-detail-container">
        <div className="artwork-img-container">
          <img
            src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
            alt={artwork.title}
          />
        </div>
        <p className="artwork-title">{artwork.title}</p>
        <p className="artwork-date">
          {artwork.date_start} - {artwork.date_end}
        </p>
        <span onClick={navigateToArtist} className="artwork-artist">
          {artwork.artist_display}
        </span>
        <p
          className="artwork-description"
          dangerouslySetInnerHTML={{ __html: artwork.description }}
        ></p>
        <div className="buttons-container">
          <button onClick={toggleFavourite}>
            {isFavourite ? "Unfavourite" : "Favourite"}
          </button>
        </div>
        <button className="rainbow-button" onClick={handleGenerateArtwork}>
          AI-mpressionist It!
        </button>
        {generatedArtwork && (
          <div className="generated-artwork-container">
            <p>AI-mpressionist Recreation is here!</p>
            <img src={generatedArtwork} alt="Generated Artwork" />
          </div>
        )}
        <div className="comments-section">
          <hr></hr>

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
      </div>
    </div>
  );
}

export default ArtworkDetail;
