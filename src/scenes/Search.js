import React from "react";

import SearchBox from "../components/SearchBox";
import GemsList from "../components/GemsList";

const Search = ({
  updateSearchResults,
  gems,
  savedGemsMap,
  addOrRemoveGems
}) => {
  return (
    <>
      <SearchBox gems={gems} updateResults={updateSearchResults} />

      <GemsList
        gems={gems}
        savedGemsMap={savedGemsMap}
        addOrRemoveGems={addOrRemoveGems}
      />
    </>
  );
};

export default Search;
