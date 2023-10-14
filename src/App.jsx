import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { useContext } from "react";
import { BookmarkContext } from "./context/Context";
import { DeleteFunctionality, getStorage, setStorage } from "./utils/methods";

const App = () => {
  let [LsCollection, setLsCollection] = useState([]);
  let { state, dispatch } = useContext(BookmarkContext);
  let [searchplace, setSearchPlace] = useState("");
  let [country, setCountry] = useState();
  let [temperature, setTemperatureinC] = useState();
  let [statusCode, setStatusCode] = useState();
  let [place, setPlace] = useState();
  let [error, setError] = useState();

  // api fetching Part
  let fetching = async () => {
    try {
      let api = "https://weatherapi-com.p.rapidapi.com/current.json";
      let response = await axios.get(api, {
        params: { q: searchplace },
        headers: {
          "X-RapidAPI-Key":
            "ff0c1b880fmsh0a8b9d811a6a542p1ad59ajsn62635496ea72",
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
      });

      if (response.status !== 200) {
        setError(true);
      } else {
        let locationofCountry = response.data.location.country;
        let temp = response.data.current.temp_c;
        let status = response.status;
        let placeName = response.data.location.name;

        setCountry(locationofCountry);
        setTemperatureinC(temp);
        setStatusCode(status);
        setPlace(placeName);
        setError(false);
      }
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  let handleValue = (e) => {
    let value = e.target.value;
    setSearchPlace(value);
  };
  let handleSearch = () => {
    if (searchplace.length === 0) {
      alert("write place name");
      return;
    }

    fetching();

    setSearchPlace("");
  };

  let handleBookmark = () => {
    // dispatch({ type: "setBookmark", payload: place });
    setStorage(place);
    let data = getStorage();
    setLsCollection(data);
    console.log("this is Ls collection ", LsCollection);
  };

  useEffect(() => {
    let data = getStorage();
    setLsCollection(data);
  }, []);

  let handleAdd = (place) => {
    setSearchPlace(place);
  };

  let handleDelete = (op) => {
    DeleteFunctionality(op);
    let data = getStorage();
    setLsCollection(data);
  };

  return (
    <div className="appContainer">
      <div className="weatherContainer">
        <h1 className="headingTitle">NepWeather App</h1>
        <div className="inputWrapper">
          <input
            value={searchplace}
            onChange={handleValue}
            className="inputBox"
            placeholder="Enter the Place"
            type="text"
          />
          <button onClick={handleSearch} className="searchBtn">
            Search
          </button>
        </div>
        <div className="Results">
          {error ? (
            <h1>No Location found</h1>
          ) : (
            // { searchplace<0?
            <>
              <h3>Country : {country}</h3>
              <h3>Temperature : {temperature}</h3>
              <h3>Place:{place}</h3>
              <button onClick={handleBookmark} className="bookmarkBtn">
                Bookmark
              </button>
            </>
          )}
        </div>
      </div>
      <div className="bookmarkContainer">
        <h1 className="headingTitle">Bookmarks</h1>
        <div className="bookmarkList">
          <ul>
            {LsCollection.map((item) => {
              return (
                <li>
                  {item.place}
                  <button
                    onClick={() => handleAdd(item.place)}
                    className="addBtn"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="deleteBtn"
                  >
                    del
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
