import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOutUser, getCurrentUserId } from "../auth";
import { getCurrentUsername } from "../database";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function fetchUsername() {
      const currentUserId = getCurrentUserId();
      const currentUsername = await getCurrentUsername(currentUserId);
      setUsername(currentUsername);
    }

    fetchUsername();
  }, []);

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("bestsellers");
      await signOutUser();
      console.log("Log Out successful!");
      navigate("/");
    } catch (error) {
      console.error("Log Out failed:", error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.bannercontainer}>
        <header style={styles.header}>
          <h1 style={styles.title}>MyBookList</h1>
        </header>

        <div style={styles.dropdownContainer}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FontAwesomeIcon icon={faUser} style={{ marginRight: "5px" }} />
            <span>{username}</span>
            <button onClick={handleDropdownToggle}>▼</button>
          </div>
          {dropdownVisible && (
            <ul style={styles.dropdownMenu}>
              <li
                style={styles.dropdownMenuItem}
                onMouseEnter={(e) => {
                  e.target.style.color = "blue";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "black";
                }}
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          )}
        </div>

        <nav style={styles.menu}>
          <ul style={styles.menuList}>
            <li
              style={{
                ...styles.menuItem,
                ...(location.pathname === "/"),
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#123456";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "rgb(104, 124, 186 )";
              }}
            >
              <Link to="/home" style={styles.link}>
                Home
              </Link>
            </li>
            <li
              style={{
                ...styles.menuItem,
                ...(location.pathname === "search"),
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#123456";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "rgb(104, 124, 186)";
              }}
            >
              <Link to="/search" style={styles.link}>
                Search
              </Link>
            </li>
            <li
              style={{
                ...styles.menuItem,
                ...(location.pathname === "booklist"),
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#123456";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "rgb(104, 124, 186)";
              }}
            >
              <Link to="/booklist" style={styles.link}>
                My Book List
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div style={styles.content}>{children}</div>

      <footer style={styles.footer}>
        <p style={styles.footerText}>
          “The soul, fortunately, has an interpreter - often an unconscious but
          still a faithful interpreter - in the eye.” ― Charlotte Brontë, Jane
          Eyre
        </p>
      </footer>
    </div>
  );
};

export default Layout;

const styles = {
  container: {
    backgroundColor: "rgb(219, 238, 255)",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  bannercontainer: {
    height: "150px",
    backgroundColor: "rgb(148, 188, 178)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  title: {
    fontStyle: "italic",
    color: "white",
    textShadow: "black 1px 1px 3px",
    fontSize: "40px",
    margin: "40px",
  },

  dropdownContainer: {
    backgroundColor: "rgb(19, 102, 175)",
    borderRadius: "5px",
    position: "absolute",
    top: "20px",
    right: "20px",
    color: "white",
    padding: "10px",
  },

  dropdownMenu: {
    position: "absolute",
    top: "100%",
    right: 0,
    zIndex: 1,
    backgroundColor: "white",
    border: "1px solid #333",
    borderRadius: "5px",
  },
  dropdownMenuItem: {
    cursor: "pointer",
    padding: "5px 0",
    color: "blue",
    listStyleType: "none",
    margin: "10px",
  },

  menu: {
    backgroundColor: "rgb(104, 124, 186)",
    padding: "0.5vw",
    positon: "center",
  },
  menuList: {
    listStyleType: "none",
    padding: "5px",
    display: "flex",
    justifyContent: "space-around",
  },
  menuItem: {
    margin: "0 10px",
    color: "white",
    fontStyle: "italic",
    fontSize: "20px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  menuItemHover: {
    backgroundColor: "white",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    padding: "10px",
  },
  content: {
    flex: 1,
    padding: "20px",
  },
  footer: {
    backgroundColor: "#fff",
    padding: "10px",
    textAlign: "center",
  },
  footerText: {
    color: "#333",
    fontSize: "14px",
    fontStyle: "italic",
  },
};
