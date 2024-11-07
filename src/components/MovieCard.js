import React from "react";
import { IMG_CDN_URL } from "../utils/constant";

const MovieCard = ({ posterPath }) => {

  return (
    <div className="w-40 md:w-44  pr-2  ">
      <img alt="moviecard" src={IMG_CDN_URL + posterPath} />
    </div>
  );
};

export default MovieCard;
