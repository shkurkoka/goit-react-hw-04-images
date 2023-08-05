import React from "react";

const Searchbar = ({ onSubmit }) => {
    return (
        <header className="searchbar">
            <form className="SearchForm" onSubmit={onSubmit}>
                <button type="submit" className="SearchForm-button">
                    <span className="SearchForm-button-label">Search</span>
                </button>

                <input
                    className="SearchForm-input"
                    name="search"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
                </form>
        </header>
    )
}

export default Searchbar;