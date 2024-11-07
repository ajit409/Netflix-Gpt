import {  useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ id }) => {
  const trailerVideo=useSelector((store)=>store.movies.addTrailerVideo)
  useMovieTrailer();
  
  return (
    <div className="">
      <iframe
       className="w-screen aspect-video "
        src={"https://www.youtube.com/embed/67vbA5ZJdKQ?si=aVablYLi0zjopNZI"+trailerVideo?.id+"?&autoplay=1"}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
