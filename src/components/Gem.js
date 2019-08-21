import React from "react";

import Button from "./Button";

import "./Gem.scss";

const Gem = ({ data, saved, addOrRemoveGems }) => {
  return (
    <div className="Gem">
      <div className="Gem__info">
        <div className="Gem__header">
          <h4>
            <a href={data.homepage_uri} target="_blank">
              {data.name}
            </a>
          </h4>

          <small>version: {data.version}</small>
        </div>

        <p className="Gem__authors">
          <small>by {data.authors}</small>
        </p>

        <p className="Gem__info">{data.info}</p>
      </div>

      <div className="Gem__action">
        <Button onClick={() => addOrRemoveGems({ saved, gemData: data })}>
          {saved ? "Remove" : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default Gem;
