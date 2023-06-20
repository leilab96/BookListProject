import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
};

const BookItem = ({ book, onDeleteBook }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleEllipsisClick = () => {
    setShowMenu(!showMenu);
  };

  const handleReadReviewClick = () => {
    console.log("read");
  };

  return (
    <div style={styles.container}>
      <div style={styles.bookItem}>
        <div style={styles.bookHeader}>
          <div style={styles.menuContainer}>
            <FontAwesomeIcon
              icon={faEllipsisV}
              onClick={handleEllipsisClick}
              style={styles.ellipsisIcon}
            />
            {showMenu && (
              <ul style={styles.menuOptions}>
                <li
                  style={styles.menuOption}
                  onMouseEnter={(e) => {
                    e.target.style.color = "blue";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "black";
                  }}
                  onClick={() => onDeleteBook(book.id)}
                >
                  Delete Book
                </li>
              </ul>
            )}
          </div>
        </div>
        <div style={styles.bookContent}>
          <div style={styles.bookCoverContainer}>
            <img src={book.cover} alt={book.title} style={styles.bookCover} />
          </div>
          <div style={styles.bookInfo}>
            <h3 style={styles.bookTitle}>{book.title}</h3>
            {book.review ? (
              <>
                <p style={styles.bookReview}>
                  {truncateText(book.review, 400)}
                </p>
                <div style={styles.buttonContainer}>
                  <Link to={`/booklist/${book.documentId}/details`}>
                    <button
                      style={styles.button}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#123456";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#195DA6";
                      }}
                    >
                      Read More
                    </button>
                  </Link>

                  <Link to={`/booklist/${book.documentId}/review/edit`}>
                    <button
                      style={styles.button}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#123456";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#195DA6";
                      }}
                    >
                      Edit Review
                    </button>
                  </Link>
                </div>
              </>
            ) : (
              <Link to={`/booklist/${book.documentId}/review/edit`}>
                <button
                  style={styles.button}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#123456";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#195DA6";
                  }}
                >
                  Create Review
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "20px",
  },
  bookItem: {
    width: "70%",
    padding: "10px",
    marginBottom: "1s0px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  bookHeader: {
    display: "flex",
    justifyContent: "flex-end",
  },
  menuContainer: {
    position: "relative",
  },
  ellipsisIcon: {
    cursor: "pointer",
  },
  menuOptions: {
    position: "absolute",
    top: "100%",
    right: 0,
    zIndex: 1,
    backgroundColor: "white",
    border: "1px solid #ddd",
    borderRadius: "5px",
    listStyle: "none",
    padding: "10px",
    textAlign: "left",
    width: "150px",
  },
  menuOption: {
    cursor: "pointer",
    marginBottom: "5px",
    padding: "10px",
  },

  bookContent: {
    display: "flex",
    alignItems: "center",
  },
  bookCoverContainer: {
    marginRight: "10px",
  },
  bookCover: {
    width: "180px",
    height: "275px",
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontWeight: "bold",
    marginBottom: "10px",
  },
  bookReview: {
    margin: "50px",
    textAlign: "justify",
  },

  button: {
    padding: "10px 10px",
    backgroundColor: "#195DA6",
    color: "#FFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
  },
};

export default BookItem;
