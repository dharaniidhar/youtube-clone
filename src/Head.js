import React, { useEffect, useState } from "react";
import {
  HAMBURGER_MENU,
  YOUTUBE_LOGO,
  USER_PP,
  YOUTUBE_SEARCH_SUGGESTIONS_API,
} from "./utils/constants";
import { toggleMenu } from "./utils/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { cacheResults } from "./utils/searchSlice";
const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchCache = useSelector((store) => store.search);
  useEffect(() => {
    const timer = setTimeout(getSearchSuggestion, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestion = async () => {
    if (searchCache[searchQuery]) setSuggestions(searchCache[searchQuery]);
    else {
      const data = await fetch(
        `${YOUTUBE_SEARCH_SUGGESTIONS_API}${searchQuery}`
      );
      const json = await data.json();
      setSuggestions(json[1]);
    }
    dispatch(cacheResults({ searchQuery: suggestions }));
  };
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className="grid grid-flow-col shadow-lg p-2 mx-2 items-center ">
      <div className="flex col-span-1 items-center h-14">
        <img
          src={HAMBURGER_MENU}
          alt="hamburger_menu"
          className="h-6 ml-2 cursor-pointer"
          onClick={() => {
            toggleMenuHandler();
          }}
        />
        <img src={YOUTUBE_LOGO} alt="youtube-logo" className="h-14" />
      </div>
      <div className="col-span-10 flex pl-60 relative">
        <input
          type="text"
          className="w-7/12 rounded-l-full border border-gray-300 px-4 py-2"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          onFocus={() => {
            setShowSuggestions(true);
          }}
          onBlur={() => {
            setShowSuggestions(false);
          }}
        />
        <div className="fixed mt-11 rounded-lg w-[530px] bg-white shadow-lg">
          <ul>
            {showSuggestions &&
              suggestions.map((suggestion) => (
                <li className="py-2 px-3 hover:bg-gray-100 hover:rounded-lg">
                  {suggestion}
                </li>
              ))}
          </ul>
        </div>
        <button className="rounded-r-full border border-gray-400 p-2 bg-gray-200 ">
          🔍
        </button>
      </div>
      <div className="col-span-1 justify-self-end pr-5">
        <img src={USER_PP} alt="user profile" className="h-10" />
      </div>
    </div>
  );
};
export default Head;
/*
 let greaterThanDuration = true;
  async function debounce() {
    if (!greaterThanDuration) return;
    const timer = setTimeout(async () => {
      const data = await fetch(
        `${YOUTUBE_SEARCH_SUGGESTIONS_API}${searchQuery}`
      );
      const json = await data.json();
      console.log(json);
    }, 200);
    clearTimeout(timer);
    greaterThanDuration = true;
  }
  */
