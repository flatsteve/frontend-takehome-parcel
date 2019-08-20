import React from "react";

import Gem from "./Gem";

const GemsList = ({ gems, savedGemsMap, addOrRemoveGems }) => {
  if (!gems.length) {
    return null;
  }

  return gems.map(gemData => (
    <Gem
      key={gemData.sha}
      data={gemData}
      saved={savedGemsMap[gemData.sha]}
      addOrRemoveGems={addOrRemoveGems}
    />
  ));
};

export default GemsList;
