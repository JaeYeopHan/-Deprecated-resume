import React from "react";

export const BadgeSecondary = ({ contents, onClick }) => (
  <span
    className="badge secondary"
    style={{ margin: `4px` }}
    onClick={() => onClick(contents)}
  >
    {contents}
  </span>
);
