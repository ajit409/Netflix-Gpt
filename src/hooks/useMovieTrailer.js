import  { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { API_OPTIONS } from '../utils/constant';
import { addTrailerVideo } from '../redux/movieSlice';

const useMovieTrailer = () => {
    const dispatch=useDispatch()
    // fetching trailer video and updating trailer video
    const getMovieVideos = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US",
        API_OPTIONS
      );
  
      const json = await data.json();  
      const filterData = json.results.filter((video) => video.type === "Trailer");  
      const trailer = filterData.length ? filterData[0] : json.results[0];
      dispatch(addTrailerVideo(trailer))
    };
  
    useEffect(() => {
      getMovieVideos();
    }, []);
}

export default useMovieTrailer;