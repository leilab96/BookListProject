import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../database";
import { getCurrentUserId } from "../auth";
import Layout from "../custom_items/Layout";
import { Link } from "react-router-dom";

const ViewDetails = () => {
  const params = useParams();
  const docId = params.id;
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const userId = getCurrentUserId();
        const bookDetails = await getBookById(userId, docId);
        setBook(bookDetails);
      } catch (error) {
        console.error("Error fetching book details:", error.message);
      }
    };

    fetchBookDetails();
  }, []);

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <div style={styles.container}>
        <Link to={`/booklist`}>
          <button
            style={styles.button}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#123456";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#195DA6";
            }}
          >
            Back to MyBookList
          </button>
        </Link>

        <div style={styles.bookDetails}>
          <div style={styles.bookCoverContainer}>
            <img src={book.cover} alt={book.title} style={styles.bookCover} />
          </div>
          <div style={styles.bookInfo}>
            <h2 style={styles.bookTitle}>{book.title}</h2>
            <h3 style={styles.bookAuthor}>{book.author}</h3>
            <p style={styles.bookDescription}>{book.description}</p>
          </div>
        </div>
        <div style={styles.review}>
          <h3>Review</h3>
          <p>{book.review}</p>
        </div>
      </div>
    </Layout>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: "20px",
  },
  bookDetails: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    border: "2px solid #195DA6",
    borderRadius: "5px",
    padding: "20px",
    width: "80%",
    justifyContent: "center",
    margin: "0 auto",
  },
  bookCoverContainer: {
    marginRight: "20px",
  },
  bookCover: {
    width: "300px",
    height: "400px",
  },
  bookInfo: {
    flex: 0.8,
    textAlign: "justify",
  },
  bookTitle: {
    fontSize: "24px",
    marginBottom: "10px",
  },

  bookAuthor: {
    fontSize: "18px",
    marginBottom: "10px",
  },

  bookDescription: {
    fontSize: "16px",
  },
  review: {
    marginTop: "20px",
    border: "2px solid #195DA6",
    borderRadius: "5px",
    padding: "30px",
    width: "80%",
    justifyContent: "center",
    margin: "0 auto",
    textAlign: "justify",
  },
  button: {
    padding: "10px 10px",
    backgroundColor: "#195DA6",
    color: "#FFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    float: "left",
  },
};

export default ViewDetails;
