import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Search from "./scenes/Search";
import MyGems from "./scenes/MyGems";

import "./styles/styles.scss";

const App = () => {
  const [searchResults, updateSearchResults] = useState([]);
  const [savedGemsMap, updateSavedGemsHash] = useState({});
  const [savedGems, updateSavedGems] = useState(
    JSON.parse(localStorage.getItem("saved_gems")) || []
  );

  // Whenever savedGems changes persist to local storage and update hash map
  // to allow quickly checking if a gem is saved or not
  useEffect(() => {
    const gemsHash = savedGems.reduce((map, gem) => {
      map[gem.sha] = gem.name;
      return map;
    }, {});

    updateSavedGemsHash(gemsHash);

    localStorage.setItem("saved_gems", JSON.stringify(savedGems));
  }, [savedGems]);

  const addOrRemoveGems = ({ saved, gemData }) => {
    if (saved) {
      return updateSavedGems(savedGems.filter(gem => gem.sha !== gemData.sha));
    }

    updateSavedGems([...savedGems, gemData]);
  };

  return (
    <BrowserRouter>
      <Nav savedGems={savedGems} />
      <Route
        path="/"
        exact
        render={() => (
          <Search
            gems={searchResults}
            savedGemsMap={savedGemsMap}
            updateSearchResults={updateSearchResults}
            addOrRemoveGems={addOrRemoveGems}
          />
        )}
      />

      <Route
        path="/my-gems"
        exact
        render={() => (
          <MyGems
            gems={savedGems}
            savedGemsMap={savedGemsMap}
            addOrRemoveGems={addOrRemoveGems}
          />
        )}
      />
    </BrowserRouter>
  );
};

export default App;
