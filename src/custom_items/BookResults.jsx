import React, { useState } from "react";
import { truncateText } from "./BookItem";
import { getCurrentUserId } from "../auth";
import { getBookList, addBookToUser } from "../database.jsx";

const BookResults = ({ book }) => {
  const [message, setMessage] = useState("");
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const handleAddToBookList = async (book) => {
    try {
      const userId = getCurrentUserId();
      if (userId) {
        const userBookList = await getBookList(userId);
        const isBookAlreadyAdded = userBookList.some((b) => b.id === book.id);

        if (isBookAlreadyAdded) {
          setMessage("Book is already added");
          setIsMessageVisible(true);
          setTimeout(() => {
            setIsMessageVisible(false);
          }, 1000);
        } else {
          await addBookToUser(userId, book);
          setMessage(`${book.title} was added to your book list`);
          setIsMessageVisible(true);
          setTimeout(() => {
            setIsMessageVisible(false);
          }, 1000);
          console.log("Book added to user's book list:", book, userId);
        }
      }
    } catch (error) {
      console.error("Error adding book to user's book list:", error.message);
    }
  };
  return (
    <div>
      <div style={styles.messageContainer}>
        {isMessageVisible && (
          <div style={styles.messageBox}>
            <p style={styles.messageText}>{message}</p>
          </div>
        )}
      </div>
      <div key={book.id} style={styles.bookItem}>
        <img src={book.cover} alt={book.title} style={styles.bookImage} />
        <h2 style={styles.bookTitle}>{truncateText(book.title, 30)}</h2>
        <h3 style={styles.bookAuthor}>{book.author}</h3>
        <p style={styles.description}>{truncateText(book.description, 100)}</p>

        <button
          style={styles.button}
          onClick={() => handleAddToBookList(book)}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#123456";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#195DA6";
          }}
        >
          + Add Book To Your List
        </button>
      </div>
    </div>
  );
};

const styles = {
  bookItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    maxWidth: "300px",
    height: "500px",
  },
  coverImage: {
    width: "150px",
    height: "200px",
    marginBottom: "10px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#195DA6",
    color: "#FFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  bookAuthor: {
    fontSize: "14px",
    padding: "10px 20px",
  },
  bookTitle: {
    padding: "10px",
    fontSize: "18px",
  },
  description: {
    textAlign: "justify",
    padding: "10px",
  },
  messageContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    zIndex: 999,
  },
  messageBox: {
    backgroundColor: "green",
    padding: "10px",
    borderRadius: "5px",
    marginTop: "20px",
  },
  messageText: {
    color: "#FFF",
    fontSize: "16px",
    fontWeight: "bold",
    textAlign: "center",
  },
};

export default BookResults;
