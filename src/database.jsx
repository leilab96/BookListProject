import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import config from "../db_config";

export const app = initializeApp(config);
const db = getFirestore(app);

//Adds new user to the collection
export const addUserToCollection = async (uid, username, email) => {
  try {
    const userRef = doc(db, "users", uid); //the user ID as the document ID
    const bookListRef = collection(userRef, "bookList");
    await setDoc(userRef, {
      uid,
      username,
      email,
    });

    console.log("User added to collection successfully!");
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

//Searched books can be added to the booklist
export const addBookToUser = async (userId, book) => {
  try {
    const userRef = doc(db, "users", userId);
    const bookListRef = collection(userRef, "bookList");
    const docRef = await addDoc(bookListRef, {
      ...book,
      review: "",
    });
    const documentId = docRef.id;
    await updateDoc(docRef, { documentId });

    console.log("Book added to user's book list successfully!");
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

//getBookList: for userID lists all the books added to the BookList
export const getBookList = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const bookListRef = collection(userRef, "bookList"); // Reference to the bookList subcollection
    const querySnapshot = await getDocs(bookListRef);

    const bookList = [];
    querySnapshot.forEach((doc) => {
      bookList.push(doc.data());
    });

    console.log(bookList);
    return bookList;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const deleteBookFromUser = async (userId, bookId) => {
  try {
    const userRef = doc(db, "users", userId);
    const bookListRef = collection(userRef, "bookList");
    const querySnapshot = await getDocs(bookListRef);

    querySnapshot.forEach((doc) => {
      const book = doc.data();
      if (book.id === bookId) {
        deleteDoc(doc.ref);
        console.log("Book deleted from user's book list successfully!");
      }
    });
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const getCurrentUsername = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      const username = userData.username;
      return username;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error retrieving current username:", error);
    return null;
  }
};

export const updateReview = async (userId, docId, review) => {
  try {
    const docRef = doc(db, "users", userId, "bookList", docId);
    await updateDoc(docRef, {
      review: review,
    });
  } catch (error) {
    console.error("Error updating review:", error);
    throw new Error(error.message);
  }
};

export const getReview = async (userId, docId) => {
  try {
    const docRef = doc(db, "users", userId, "bookList", docId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      const review = data.review;
      return review;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting review:", error);
    throw new Error(error.message);
  }
};

export const getBookById = async (userId, docId) => {
  try {
    const docRef = doc(db, "users", userId, "bookList", docId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const bookData = docSnapshot.data();
      return {
        ...bookData,
      };
    } else {
      throw new Error("Book not found");
    }
  } catch (error) {
    console.error("Error fetching book:", error.message);
    throw error;
  }
};
