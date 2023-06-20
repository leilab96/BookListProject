import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCurrentUserId } from "../auth";
import { updateReview, getReview, getBookById } from "../database";
import Layout from "../custom_items/Layout";

const EditReview = () => {
  const param = useParams();
  const bookId = param.id;
  const [book, setBook] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const userId = getCurrentUserId();
  const [review, setReview] = useState("");

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const bookDetails = await getBookById(userId, bookId);
        setBook(bookDetails);
        const existingReview = await getReview(userId, bookId);
        setReview(existingReview);
      } catch (error) {
        console.error("Error fetching review:", error);
      }
    };

    fetchReview();
  }, [userId, bookId]);

  const handleSaveReview = async () => {
    const newReview = inputRef.current.value;
    await updateReview(userId, bookId, newReview);
    navigate("/booklist");
  };

  const handleCancelReview = () => {
    navigate("/booklist");
  };

  return (
    <Layout>
      <div style={styles.container}>
        <h2 style={styles.heading}>
          {review !== "" ? "Edit Review" : "Create Review"}
        </h2>
        <div style={styles.bookCoverContainer}>
          <img src={book.cover} alt={book.title} style={styles.bookCover} />
        </div>
        <div style={styles.bookInfo}>
          <h2 style={styles.bookTitle}>{book.title}</h2>
          <h3 style={styles.bookAuthor}>{book.author}</h3>
        </div>
        <p style={styles.bookDescription}>{book.description}</p>
        <textarea
          ref={inputRef}
          style={styles.textarea}
          defaultValue={review}
        />
        <div style={styles.buttonContainer}>
          <button onClick={handleSaveReview} style={styles.saveButton}>
            Save
          </button>
          <button onClick={handleCancelReview} style={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </div>
    </Layout>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "30px",
    color: "#195DA6",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  bookCoverContainer: {
    marginBottom: "10px",
  },
  bookInfo: {
    marginBottom: "20px",
  },
  bookTitle: {
    color: "black",
  },
  bookAuthor: {
    color: "black",
    marginTop: "5px",
    textAlign: "center",
  },
  bookDescription: {
    width: "70%",
    textAlign: "justify",
    margin: "20px",
  },
  textarea: {
    width: "500px",
    height: "200px",
    padding: "10px",
    marginBottom: "20px",
    border: "1px solid #195DA6",
    borderRadius: "5px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  saveButton: {
    padding: "10px 20px",
    backgroundColor: "#195DA6",
    color: "#FFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
  },
  cancelButton: {
    padding: "10px 20px",
    backgroundColor: "#FFF",
    color: "#195DA6",
    border: "1px solid #195DA6",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default EditReview;
