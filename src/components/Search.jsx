import React from "react";

const Search = ({ handleInput, searchValue, fetchData }) => {
    return (
        <div className="searchBar">
            <input className="input"
                placeholder='Search by City or Zip Code...'
                onChange={handleInput}
                value={searchValue}
                onKeyPress={fetchData}
            />
        </div>
    );
};

export default Search;
