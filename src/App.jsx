import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import BookListPage from "./pages/BookListPage";
import EditReview from "./pages/EditReview";
import ViewDetails from "./pages/ViewDetails";
import Protected from "./protected";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />

        <Route
          path="home"
          element={
            <Protected>
              <HomePage />
            </Protected>
          }
        />

        <Route
          path="search"
          element={
            <Protected>
              <SearchPage />
            </Protected>
          }
        />

        <Route
          path="booklist"
          element={
            <Protected>
              <BookListPage />
            </Protected>
          }
        />

        <Route
          path="/booklist/:id/review/edit"
          element={
            <Protected>
              <EditReview />
            </Protected>
          }
        />

        <Route
          path="/booklist/:id/details"
          element={
            <Protected>
              <ViewDetails />
            </Protected>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
