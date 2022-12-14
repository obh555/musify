import Button from "@mui/material/Button";
import Musify from "../../utils";
import axios from "axios";

export default function SearchButton({ selected, onTracksChange }) {
  const handleClick = async (selected, onTracksChange) => {
    const headers = Musify.setHeaders();
    const [seedArtist, seedTrack] = selected.reduce(
      ([artists, tracks], result) =>
        result.type === "artist"
          ? [artists + (artists.length > 0 ? "," : "") + result.id, tracks]
          : [artists, tracks + (tracks.length > 0 ? "," : "") + result.id],
      ["", ""]
    );
    const { data } = await axios.get(
      `https://api.spotify.com/v1/recommendations?limit=15&seed_artists=${seedArtist}&seed_tracks=${seedTrack}`,
      headers
    );
    onTracksChange(data.tracks.filter((track) => track.preview_url));
  };

  return (
    <Button
      variant="contained"
      onClick={() => handleClick(selected, onTracksChange)}
      sx={{
        mx: 0.25,
        my: 1.5,
        borderRadius: 7,
        fontWeight: "bold",
        color: "white",
        backgroundColor: "#495057",
        borderColor: "#6C757D",
        "&:hover": {
          backgroundColor: "#6C757D",
        },
      }}
    >
      Search
    </Button>
  );
}
