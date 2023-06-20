# BookListProject
# Booklist App

This project is a booklisting application that helps users keep track of their personal books, record ratings, and express their opinions. The app allows users to easily search for books, add them to their booklist, and manage their reviews. The project is built with the Vite framework and the React library, and utilizes Firebase for authentication and data storage.

## Installation

To clone the repository and install the project dependencies, please follow these steps:

1. Open your terminal or command prompt.
2. Navigate to the directory where you want to clone the project.
3. Run the following command to clone the repository:

```bash
git clone https://github.com/your-username/booklist-app.git
```

4. Change into the project directory:

```bash
cd booklist-app
```

5. Install the dependencies using npm:

```bash
npm install
```

This command will download and install all the required dependencies for the project.

## Configuration

Before running the application, you need to set up your Firebase configuration. Follow these steps:

1. Create a Firebase project on the [Firebase Console](https://console.firebase.google.com/).
2. Obtain your Firebase project's configuration object, including the API key, authentication domain, and database URL.
3. Create a `.env` file in the root directory of the project.
4. Add the following variables to the `.env` file and replace the placeholder values with your Firebase project's configuration:

```plaintext
REACT_APP_FIREBASE_API_KEY=YOUR_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
REACT_APP_FIREBASE_DATABASE_URL=YOUR_DATABASE_URL
```

## Usage

To start the development server and run the application, use the following command:

```bash
npm run dev
```

This command will build the project and start the development server. You can then access the app by opening your web browser and navigating to `http://localhost:3000`.
