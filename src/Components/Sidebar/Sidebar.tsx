import "./sidebar.css";

const Sidebar = ({ darkMode }) => {
  return (
    <div className={`sideBar ${darkMode ? "dark" : ""}`}>
      <div className="companyLogo">
        <span className="material-symbols-outlined">diamond</span>
        <p>Company</p>
      </div>
      <div className="menusList">
        <h3 className="menuheading">MAIN MENUS</h3>
        <ul className="navLinks">
          <li className="link">
            <span className="material-symbols-outlined">dashboard</span>
            <p>Dashboard</p>
          </li>
          <li className="link">
            <span className="material-symbols-outlined">account_circle</span>
            <p>User Management</p>
          </li>
          <li className="link">
            <span className="material-symbols-outlined">bar_chart</span>
            <p>Analytics</p>
          </li>
          <li className="link">
            <span className="material-symbols-outlined">shopping_cart</span>
            <p>Orders</p>
          </li>
          <li className="link">
            <span className="material-symbols-outlined">inventory</span>
            <p>Inventory</p>
          </li>
          <li className="link">
            <span className="material-symbols-outlined">payment</span>
            <p>Transactions</p>
          </li>
          <li className="link">
            <span className="material-symbols-outlined">support</span>
            <p>Support</p>
          </li>
          <li className="link">
            <span className="material-symbols-outlined">settings</span>
            <p>Settings</p>
          </li>
          <li className="link">
            <span className="material-symbols-outlined">notifications</span>
            <p>Notifications</p>
          </li>
          <li className="link">
            <span className="material-symbols-outlined">report</span>
            <p>Reports</p>
          </li>
          <li className="link">
            <span className="material-symbols-outlined">security</span>
            <p>Security</p>
          </li>
          <li className="link">
            <span className="material-symbols-outlined">logout</span>
            <p>Logout</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
