import { useState } from "react";
import { generateArtwork, generatePoem } from "./../../services/openServices";

function AIMpressionist() {
  const [theme, setTheme] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [poem, setPoem] = useState("");

  const handleGenerate = async () => {
    if (theme) {
      try {
        const promptForImage = `Create an impressionist painting inspired by the theme: ${theme}.`;
        const imageUrl = await generateArtwork(promptForImage);
        setImageUrl(imageUrl);

        const promptForPoem = `Create a poem inspired by the theme: "${theme}".`;
        const poem = await generatePoem(promptForPoem);
        setPoem(poem);
      } catch (error) {
        console.error("Error generating content: ", error);
      }
    }
  };

  return (
    <div>
      <h1>AI-mpressionist</h1>
      <div>
        <h2>Enter a Theme</h2>
        <input
          type="text"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="Enter a theme"
        />
        <button onClick={handleGenerate}>Generate Image and Poem</button>
      </div>
      {imageUrl && (
        <div>
          <h3>Generated Artwork</h3>
          <img src={imageUrl} alt="Generated Artwork" />
        </div>
      )}
      {poem && (
        <div>
          <h3>Generated Poem</h3>
          <p>{poem}</p>
        </div>
      )}
    </div>
  );
}

export default AIMpressionist;
