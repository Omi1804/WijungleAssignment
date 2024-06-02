import "./navbar.css";

interface NavbarItems {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar = ({ darkMode, toggleDarkMode }: NavbarItems) => {
  return (
    <div className="navbar">
      <div className="sec1">
        <div className="menuIcon">
          <span className="material-symbols-outlined">menu</span>
        </div>
        <div className="searchBar">
          <span className="material-symbols-outlined">search</span>
          <input type="text" className="searchInput" />
        </div>
      </div>
      <div className="sec2">
        <div className="darkmode">
          {darkMode ? (
            <span
              className="material-symbols-outlined"
              onClick={toggleDarkMode}
            >
              nightlight
            </span>
          ) : (
            <span
              className="material-symbols-outlined"
              onClick={toggleDarkMode}
            >
              light_mode
            </span>
          )}
        </div>
        <div className="avatar">
          <span className="material-symbols-outlined">account_circle</span>
          <p>Om Nigam</p>
        </div>
        <div className="setting">
          <span className="material-symbols-outlined">settings</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
