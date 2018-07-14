import React from "react";
import "./Button.css";

export const Button = ({ exportToPdf }) => (
  <button onClick={exportToPdf} className="app-button-export">
    Export to pdf
  </button>
);
