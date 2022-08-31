import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NavBarWithSearch = (props) => {
  const [searchText, setSearchText] = useState("");
  const searchValue = props.searchValue;
  useEffect(() => {
    setSearchText(searchValue || "");
  }, []);
  const navigate = useNavigate();
  const onTextChange = (value) => {
    setSearchText(value);
  };
  const onButtonClick = (e) => {
    e.preventDefault();
    if (searchText.length > 2) {
      navigate("/search", { state: { searchText } });
    }
  };
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="/">
        GoSeekho
      </a>
      <form className="form-inline">
        <div className="row align-items-center">
          <div className="col">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{ width: 500 }}
              onChange={(e) => onTextChange(e.target.value)}
              value={searchText}
            />
          </div>
          <div className="col">
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
              onClick={(e) => onButtonClick(e)}
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </nav>
  );
};

export default NavBarWithSearch;
