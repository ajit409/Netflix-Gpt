import { useDispatch, useSelector } from "react-redux";
import { addNowPlayMovies } from "../redux/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constant";


const useNowPlayingMovies=()=>{
    const dispatch=useDispatch()
 const nowPlayingMovies=useSelector((store)=>store.movies.nowPlayingMovies)
const getNowPlayMovies= async ()=>{
  const data= await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', API_OPTIONS)
  const json=await data.json();
  
dispatch(addNowPlayMovies(json.results))

}

useEffect(()=>{
 if(!nowPlayingMovies)  getNowPlayMovies()
},[])
}

export default  useNowPlayingMovies;