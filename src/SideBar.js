import React from "react";
import { useSelector } from "react-redux";
const SideBar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  if (!isMenuOpen) return null;
  return (
    <div className="col-span-1 border border-solid">
      <ul>
        <li>Home</li>
        <li>Shorts</li>
        <li>Subscriptions</li>
      </ul>
    </div>
  );
};
export default SideBar;
