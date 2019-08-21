import React from "react";

import "./EmptyState.scss";

const EmptyState = ({ children, title }) => {
  return (
    <div className="EmptyState">
      {title && <h3 className="EmptyState__title">{title}</h3>}

      {children}
    </div>
  );
};

export default EmptyState;
