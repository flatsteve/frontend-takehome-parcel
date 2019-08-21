import React, { useState, useEffect } from "react";

import Button from "./Button";
import EmptyState from "./EmptyState";

import { API_URL } from "../constants";

import "./SearchBox.scss";

const Search = ({ updateResults, gems }) => {
  const [error, updateError] = useState(false);
  const [submitted, updateSubmitted] = useState(false);
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
    updateError(false);
    updateSubmitted(false);

    fetch(`${API_URL}?query=${searchValue}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error();
        }
      })
      .then(searchResults => {
        updateResults(searchResults);
      })
      .catch(() => {
        updateError(true);
      })
      .finally(() => {
        updateLoading(false);
        updateSubmitted(true);
      });
  };

  const renderEmptyMessage = () => {
    if (loading) {
      return <h3 className="SearchBox__loading">Loading RubyGems...</h3>;
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

    if (error) {
      return (
        <EmptyState title="Somethings went wrong...">
          <p>
            There was a problem submitting your search. Please refresh the page
            and try again.
          </p>
        </EmptyState>
      );
    }

    if (gems.length === 0) {
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
        <div className="container">
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
        </div>
      </form>

      <div className="SearchBox__message">{renderEmptyMessage()}</div>
    </>
  );
};

export default Search;
