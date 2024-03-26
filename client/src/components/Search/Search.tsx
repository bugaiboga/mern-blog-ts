import React, { useState } from "react";

import searchIcon from "../../assets/icons/search-icon.svg";

const Search = () => {
  return (
    <div className="search">
      <img className="search__icon" src={searchIcon} alt="Search Icon" />
      <input className="search__input" placeholder="Search..." />
    </div>
  );
};

export default Search;
