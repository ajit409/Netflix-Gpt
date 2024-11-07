import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import { BG_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessages, setErrorMessages] = useState({});

  const email = useRef(null);

  const name = useRef(null);
  const password = useRef(null);

  const handleButtonClick = (e) => {
    e.preventDefault();

    // Validation
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessages(message);
    if (Object.keys(message).length > 0) return; // Only return if there are validation errors

    if (!isSignInForm) {
      // Signup logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;

          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              "https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName }));
              navigate("/browse"); // Redirect to Browse page
            })
            .catch((error) => {
              setErrorMessages({ profile: error.message });
            });
        })
        .catch((error) => {
          setErrorMessages({ auth: `${error.code} ${error.message}` });
        });
    } else {
      // Sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const { uid, email, displayName } = userCredential.user;
          dispatch(addUser({ uid, email, displayName }));
          navigate("/browse"); // Redirect to Browse page
        })
        .catch((error) => {
          setErrorMessages({ auth: `${error.code} ${error.message}` });
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessages({}); // Clear error messages when switching forms
  };

  return (
    <div>
      <Header />
      <div className="absolute  h-full">
        <img src={BG_URL} className=" h-screen md:w-screen object-cover  " alt="logo" />
      </div>
      <form
        className="absolute p-12 bg-black w-full md:w-3/12 my-36 mx-auto right-0 left-0 text-white bg-opacity-80 rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="font-bold text-3xl py-2">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        <div>
          {!isSignInForm && (
            <input
              className="p-2 my-3 w-screen md:w-full bg-gray-600"
              type="text"
              placeholder="Full Name"
              ref={name}
            />
          )}
        </div>

        <div>
          <input
            className="p-2 my-3 w-full bg-gray-600"
            type="text"
            ref={email}
            placeholder="Email Address"
          />
          {errorMessages.email && (
            <p className="text-red-600 -mt-2">{errorMessages.email}</p>
          )}
        </div>

        <div>
          <input
            className="p-2 my-3 w-full bg-gray-600"
            type="password"
            ref={password}
            placeholder="Password"
          />
          {errorMessages.password && (
            <p className="text-red-600 -mt-2">{errorMessages.password}</p>
          )}
        </div>

        <button
          className="p-2 my-4 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="py-2 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New To Netflix? Sign Up Now"
            : "Already Registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
