import React, { useEffect, useState } from "react";
import MovieList from "./MovieList";
import lang from "../utils/languageConstant";
import { useSelector } from "react-redux";

const GptSearchBar = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const langKey = useSelector((store) => store.config.lang);

  useEffect(() => {
    getMovies();
  }, [searchTerm]); // Trigger API call when searchTerm changes

  async function getMovies() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=f602fffab527600166787b2f5bd04e74&query=${searchTerm}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (Array.isArray(data.results)) {
        // Check if data.results is an array
        setMovies(data.results);
      } else {
        console.error("Unexpected data format:", data);
        setMovies([]); // Safely reset to an empty array
      }
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      setMovies([]); // Safely reset to an empty array
    }
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <div className="pt-[35%] md:pt-[10%] flex justify-center">
        <form className="bg-black mx-4 md:mx-0 w-full md:w-1/3 grid">
          <input
            type="text"
            autoComplete="off"
            className="px-4 py-2 m-4 col-span-9 z-[20]"
            placeholder={lang[langKey].gptSearchPlaceholder}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </form>
      </div>
      <div
        className={`mt-[2%] h-screen ${
          searchTerm ? "bg-gradient-to-b from-gray-100/60 to-transparent" : ""
        }`}
      >
        <MovieList movies={movies} />
      </div>
    </div>
  );
};

export default GptSearchBar;
