import React from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../redux/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { logo, SUPPORTED_LANGUAGES } from "../utils/constant";
import { toggleSearchGpt } from "../redux/gptSlice";
import { changeLanguage } from "../redux/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.users);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          const { uid, email, displayName } = user;

          dispatch(
            addUser({ uids: uid, email: email, displayName: displayName })
          );
          navigate("/browse");
        } else {
          // User is signed out
          dispatch(removeUser());
          navigate("/");
        }
      });
    //unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    //  toggle gpt search
    dispatch(toggleSearchGpt());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div className="absolute px:0 md:px-8 py-0 md:py-2 w-screen bg-gradient-to-b from-black z-10 flex flex-col md:flex-row md:justify-between ">
      <img className="w-40 mx-auto md:mx-0" alt="logo" src={logo} />

      {user && (
        <div className="flex justify-between p-2 -mt-6 md:-mt-0">
          {showGptSearch && (
            <select
              className="md:p-2 p:0 m-0 md:m-4  bg-gray-800  text-white rounded-md"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          <button
            className=" m-0 p-2  md:p-2 md:m-4 bg-purple-800 text-white rounded-lg"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
          <button
            className="bg-red-600 m-0 md:m-4 p-2 text-white rounded-lg"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
