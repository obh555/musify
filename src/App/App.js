import { useState, useEffect, Fragment } from "react";
import SearchBar from "../SearchBar/SearchBar";
import MediaPlayer from "../MediaPlayer/MediaPlayer";
import Playlist from "../Playlist/Playlist";
import Musify from "../Utilities/index";
import Login from "../Login/Login";
import "./App.css";

function App() {
  const [token, setToken] = useState(null);
  const [searchResult, setSearchResult] = useState([])
  useEffect(() => setToken(Musify.getAccessToken()), []);

  function handleSearch(result){
    setSearchResult(result)
  }

  return (
    <Fragment>
      {token && (
        <div className="App">
          <h1>Welcome to Musify!!!</h1>
          <SearchBar token={token}  onHandleSearch={handleSearch}/>
          <MediaPlayer />
          <Playlist />
        </div>
      )}
      {!token && <Login />}
    </Fragment>
  );
}

export default App;
