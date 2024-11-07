import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestion from "./GptMovieSuggestion";
import { BG_URL } from "../utils/constant";

const GptSearch = () => {
  return (
    <>
      <div className="absolute -z-10 ">
        <img className="h-screen object-cover  w-screen" src={BG_URL} alt="logo" />
      </div>
      <div className="">
        <div className="">
          <GptSearchBar />
          <GptMovieSuggestion />
        </div>
      </div>
    </>
  );
};

export default GptSearch;
