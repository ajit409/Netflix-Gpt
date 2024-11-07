import React from "react";
import MovieList from "./MovieList";

const GptMovieSuggestion = ({ movies = [] }) => {
  return (
    <div className="p-4 m-4 ">
      <div className="flex ">
        {movies.map((movie) => (
          
          <MovieList key={movie.id} posterPath={movie.poster_path} />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestion;
