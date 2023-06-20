import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../custom_items/Layout.jsx";
import { NYT_API_KEY } from "../../db_config.jsx";
import defaultCover from "../assets/default-book.png";
import BookResults from "../custom_items/BookResults.jsx";

const HomePage = () => {
  const [bestsellers, setBestsellers] = useState([]);

  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        const storedBestsellers = localStorage.getItem("bestsellers");

        if (storedBestsellers) {
          const parsedBestsellers = JSON.parse(storedBestsellers);
          setBestsellers(parsedBestsellers);
        } else {
          const nytApiKey = NYT_API_KEY; // Replace with your New York Times API key

          const nytResponse = await axios.get(
            "https://api.nytimes.com/svc/books/v3/lists.json",
            {
              params: {
                list: "hardcover-fiction", // Specify the list you want to fetch (e.g., hardcover-fiction)
                "api-key": nytApiKey,
              },
            }
          );

          if (nytResponse.status === 200) {
            const books = nytResponse.data.results.map(async (book) => {
              const title = book.book_details[0].title;
              const author = book.book_details[0].author;
              const isbn = book.isbns[0].isbn13;

              const googleResponse = await axios.get(
                `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
              );

              if (googleResponse.status === 200) {
                const googleBook = googleResponse.data.items[0];
                const cover =
                  googleBook.volumeInfo.imageLinks?.thumbnail || defaultCover;
                const title = book.book_details[0].title;
                const author = book.book_details[0].author;
                const description =
                  googleBook.volumeInfo.description ||
                  "No description is available.";
                const id = googleBook.id;
                console.log(id);

                return {
                  id,
                  title,
                  author,
                  description,
                  cover,
                };
              } else {
                return null;
              }
            });

            const booksWithImages = await Promise.all(books);
            const filteredBooks = booksWithImages.filter(
              (book) => book !== null
            );
            setBestsellers(filteredBooks);

            localStorage.setItem("bestsellers", JSON.stringify(filteredBooks));
          } else {
            throw new Error("Failed to fetch bestsellers");
          }
        }
      } catch (error) {
        console.error("Error fetching bestsellers:", error.message);
      }
    };

    fetchBestsellers();
  }, []);

  return (
    <Layout>
      <div style={styles.container}>
        <h1 style={styles.heading}>New York Times Bestsellers</h1>
        <ul style={styles.booksContainer}>
          {bestsellers.map((book) => (
            <BookResults key={book.id} book={book} />
          ))}
        </ul>
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
  booksContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    justifyContent: "center",
  },
};

export default HomePage;
