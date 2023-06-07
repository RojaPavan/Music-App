import "./App.css";
import React, { useState } from "react";

function App() {
  const [tracks, setTracks] = useState([]);
  const [keyWord, setKeyWord] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getTracks = async () => {
    setIsLoading(true);
    let data = await fetch(
      `https://v1.nocodeapi.com/roja/spotify/kdnJzdvqjLeDQUDU/search?q=${
        keyWord === "" ? "trending" : keyWord
      }&type=track`
    );
    let convertedData = await data.json();
    // console.log(convertedData.tracks.items);
    setTracks(convertedData.tracks.items);
    setIsLoading(false);
  };

  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Music App
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          ></button>
          <div
            className="collapse navbar-collapse d-flex justify-content-center"
            id="navbarSupportedContent"
          >
            <input
              value={keyWord}
              onChange={(e) => {
                setKeyWord(e.target.value);
              }}
              className="form-control me-2 w-75"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button onClick={getTracks} className="btn btn-outline-success">
              Search
            </button>
          </div>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          {tracks.map((element) => {
            return (
              <div key={element.id} className="col-lg-3 col-md-6 py-2">
                <div className="card">
                  <img
                    src={element.album.images[0].url}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{element.name}</h5>
                    <p className="card-text">
                      Artist:{element.album.artists[0].name}
                    </p>
                    <p>Release Date:{element.album.release_date}</p>
                    <audio src={element.preview_url} controls className="w-100">
                      {" "}
                    </audio>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={`row ${isLoading ? "py-2" : "d-none"}`}>
        <div className="col-12 py-5 text-center">
          <div
            className="spinner-border"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
      <div className={`row ${keyWord === "" ? "" : "d-none"}`}>
        <div className="col-12 py-5 text-center">
          <h1>🎵 Music 🎼</h1>
        </div>
      </div>
      <div className="row"></div>
    </>
  );
}

export default App;
