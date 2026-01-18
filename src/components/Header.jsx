// eslint-disable-next-line

import React, { useState } from "react";


function Header({ toggleDarkMode, isDarkMode }) {
  return (
    <header style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
      <h2>Checkly</h2>
      <button onClick={toggleDarkMode}>
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
}

export default Header;
