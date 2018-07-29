import React from "react";
import "./Button.css";

export const Button = ({ onClick }) => (
  <button onClick={onClick} className="app-button-export">
    Export to pdf
  </button>
);
