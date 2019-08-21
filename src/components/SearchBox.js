import React, { useState, useEffect } from "react";

import Button from "./Button";
import EmptyState from "./EmptyState";

import { API_URL } from "../constants";

import "./SearchBox.scss";

const Search = ({ updateResults }) => {
  const [submitted, updateSubmitted] = useState(false);
  const [noResults, updateNoResults] = useState(false);
  const [loading, updateLoading] = useState(false);
  const [searchValue, updateSearchValue] = useState("");

  // Cleanup on un-mount
  useEffect(() => {
    return () => updateResults([]);
  }, []);

  const getSearchResults = e => {
    e.preventDefault();

    updateResults([]);
    updateLoading(true);
    updateSubmitted(false);
    updateNoResults(false);

    fetch(`${API_URL}?query=${searchValue}`)
      .then(res => res.json())
      .then(searchResults => {
        if (searchResults.length === 0) {
          return updateNoResults(true);
        }

        updateResults(searchResults);
      })
      .finally(() => {
        updateLoading(false);
        updateSubmitted(true);
      });
  };

  const renderEmptyMessage = () => {
    if (loading) {
      return <p>Loading RubyGems...</p>;
    }

    if (!submitted) {
      return (
        <EmptyState title="Lets get started...">
          <p>
            Enter the name of the RubyGem you are looking for in the input
            above, hit "Search Gems" and we'll do the rest.
          </p>
        </EmptyState>
      );
    }

    if (noResults) {
      return (
        <EmptyState title="Oops, no gems found...">
          <p>
            We couldn't find any results for that search term. Maybe check the
            spelling or try a new search.
          </p>
        </EmptyState>
      );
    }

    return null;
  };

  return (
    <>
      <form onSubmit={getSearchResults} className="SearchBox">
        <input
          className="SearchBox__input"
          type="text"
          value={searchValue}
          onChange={e => updateSearchValue(e.target.value)}
          placeholder="e.g. rake"
          tabIndex="1"
        />

        <Button type="submit" tabIndex="2" disabled={!searchValue || loading}>
          Search Gems
        </Button>
      </form>

      <div className="SearchBox__message">{renderEmptyMessage()}</div>
    </>
  );
};

export default Search;
