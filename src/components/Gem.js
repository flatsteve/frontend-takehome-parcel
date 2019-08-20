import React from "react";

import "./Gem.scss";

const Gem = ({ data, saved, addOrRemoveGems }) => {
  return (
    <div className="Gem">
      <h4>
        <a href={data.homepage_uri} target="_blank">
          {data.name}
        </a>{" "}
        <small>{data.version}</small>
      </h4>

      <p className="Gem__info">{data.info}</p>

      <button onClick={() => addOrRemoveGems({ saved, gemData: data })}>
        {saved ? "Remove gem" : "Save gem"}
      </button>
    </div>
  );
};

export default Gem;
