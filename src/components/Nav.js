import React from "react";
import { Link, NavLink } from "react-router-dom";

import "./Nav.scss";

const Nav = ({ savedGems }) => {
  return (
    <div className="Nav">
      <div className="Nav__container">
        <div className="Nav__title">
          <Link to="/">
            <h1>Gem Search</h1>
          </Link>

          <p>The RubyGem search engine</p>
        </div>

        <div className="Nav__links">
          <NavLink to="/" exact={true} activeClassName="Nav__link--active">
            Search
          </NavLink>

          <NavLink
            data-testid="my-gems-link"
            to="/my-gems"
            exact={true}
            activeClassName="Nav__link--active"
          >
            My Gems ({savedGems.length})
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Nav;
