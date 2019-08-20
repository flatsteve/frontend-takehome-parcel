import React, { useState } from "react";

import { API_URL } from "../constants";

import "./SearchBox.scss";

const Search = ({ updateResults }) => {
  const [searchValue, updateSearchValue] = useState("");

  const getSearchResults = () => {
    fetch(`${API_URL}?query=${searchValue}`)
      .then(res => res.json())
      .then(searchResults => {
        updateResults(searchResults);
      });
  };

  return (
    <div className="SearchBox">
      <input
        className="SearchBox__input"
        type="text"
        value={searchValue}
        onChange={e => updateSearchValue(e.target.value)}
        placeholder="e.g. rails"
      />

      <button onClick={getSearchResults}>Search</button>
    </div>
  );
};

export default Search;
