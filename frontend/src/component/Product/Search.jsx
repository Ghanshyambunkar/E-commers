import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Search.css';

function Search() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate(); 

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const trimmedKeyword = keyword.trim();

    if (trimmedKeyword) {
      navigate(`/products/${trimmedKeyword}`); 
    } else {
      navigate('/products');
    }
  };

  return (
    <form className="searchBox" onSubmit={searchSubmitHandler}>
      <input
        type="text"
        placeholder="Search a Product..."
        onChange={(e) => setKeyword(e.target.value)}
      />
      <input type="submit" value="Search" />
    </form>
  );
}

export default Search;
