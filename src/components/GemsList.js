import React from "react";

import Gem from "./Gem";

import "./GemList.scss";

const GemsList = ({ gems, savedGemsMap, addOrRemoveGems }) => {
  if (!gems.length) {
    return null;
  }

  return (
    <div className="GemList" data-testid="gems-list">
      {gems.map(gemData => (
        <Gem
          key={gemData.sha}
          data={gemData}
          saved={savedGemsMap[gemData.sha]}
          addOrRemoveGems={addOrRemoveGems}
        />
      ))}
    </div>
  );
};

export default GemsList;
