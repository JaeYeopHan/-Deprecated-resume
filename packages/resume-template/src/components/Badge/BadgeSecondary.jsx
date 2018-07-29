import React from "react";

export const BadgeSecondary = ({ contents, activeLanguage, onClick }) => {
  const isActive = contents === activeLanguage;
  const classes = isActive ? "badge secondary" : "badge";
  const style = { margin: `4px` };

  return (
    <span className={classes} style={style} onClick={() => onClick(contents)}>
      {contents}
    </span>
  );
};
