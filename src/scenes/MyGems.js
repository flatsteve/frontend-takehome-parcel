import React from "react";
import { Link } from "react-router-dom";

import EmptyState from "../components/EmptyState";
import GemsList from "../components/GemsList";

const MyGems = ({ gems, savedGemsMap, addOrRemoveGems }) => {
  if (gems.length === 0) {
    return (
      <div className="container">
        <EmptyState title="You don't have any saved gems...">
          <p>
            Head back to the <Link to="/">search page</Link> to add some. Once
            you've done that they will appear here.
          </p>
        </EmptyState>
      </div>
    );
  }

  return (
    <GemsList
      gems={gems}
      savedGemsMap={savedGemsMap}
      addOrRemoveGems={addOrRemoveGems}
    />
  );
};

export default MyGems;
