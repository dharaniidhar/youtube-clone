import React from "react";

const Button = ({ name }) => {
  return (
    <button className="rounded-lg bg-gray-200 px-4 py-2 m-2">{name}</button>
  );
};

export default Button;
