import React from "react";

import GemsList from "../components/GemsList";

const MyGems = ({ gems, savedGemsMap, addOrRemoveGems }) => {
  return (
    <>
      <GemsList
        gems={gems}
        savedGemsMap={savedGemsMap}
        addOrRemoveGems={addOrRemoveGems}
      />
    </>
  );
};

export default MyGems;
