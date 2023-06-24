import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Layout from "../custom_items/Layout.jsx";
import defaultCover from "../assets/default-book.png";
import BookResults from "../custom_items/BookResults.jsx";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);
  const [isSearchCompleted, setIsSearchCompleted] = useState(false);
  const API_ENDPOINT = "https://www.googleapis.com/books/v1/volumes";
  const inputRef = useRef(null);

  const fetchBooks = async (searchTerm) => {
    try {
      const response = await axios.get(API_ENDPOINT, {
        params: {
          q: searchTerm,
          filter: "ebooks",
          printType: "books",
          langRestrict: "en",
        },
      });

      if (response.status === 200) {
        const books = response.data.items.map((item) => {
          const volumeInfo = item.volumeInfo;
          const cover = volumeInfo.imageLinks?.thumbnail || defaultCover;
          const description =
            volumeInfo.description || "No description is available.";
          return {
            id: item.id,
            title: volumeInfo.title,
            author: volumeInfo.authors ? volumeInfo.authors[0] : "",
            cover: cover,
            description: description,
          };
        });

        return books;
      } else {
        throw new Error("Failed to fetch books");
      }
    } catch (error) {
      console.error("Error fetching books:", error.message);
      throw error;
    }
  };

  const handleSearch = async () => {
    setSearchTerm(inputRef.current.value);
    setIsSearchPerformed(true);
    setIsSearchCompleted(false);
  };

  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        const fetchedBooks = await fetchBooks(searchTerm);
        if (fetchedBooks.length === 0) {
          console.log("No books found");
        }
        setBooks(fetchedBooks);
        setIsSearchCompleted(true);
      } catch (error) {
        console.error("Search error:", error.message);
        setBooks([]);
        setIsSearchCompleted(true);
      }
    };

    if (isSearchPerformed) {
      fetchBooksData();
    }
  }, [searchTerm, isSearchPerformed]);

  return (
    <Layout>
      <div style={styles.container}>
        <h1 style={styles.heading}>Search Page</h1>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Enter your search term"
            ref={inputRef}
            style={styles.input}
          />
          <button
            onClick={handleSearch}
            style={styles.button}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#123456";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#195DA6";
            }}
          >
            Search
          </button>
        </div>
        {isSearchCompleted && books.length === 0 ? (
          <p style={styles.noBooksMessage}>No books found.</p>
        ) : (
          <ul style={styles.booksContainer}>
            {books.map((book) => (
              <BookResults key={book.id} book={book} />
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
  },
  heading: {
    color: "#195DA6",
    fontSize: "24px",
    marginBottom: "10px",
  },
  searchContainer: {
    display: "flex",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    marginRight: "10px",
    width: "300px",
  },
  button: {
    padding: "10px 10px",
    backgroundColor: "#195DA6",
    color: "#FFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },

  booksContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    justifyContent: "center",
  },

  noBooksMessage: {
    color: "red",
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: "16px",
  },
};

export default SearchPage;
