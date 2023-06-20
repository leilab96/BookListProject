import background from "../assets/background.jpg";

export const styles = {
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
    opacity: 0.8,
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    fontFamily: "Roboto, sans-serif",
  },
  title: {
    fontStyle: "italic",
    color: "white",
    textShadow: "black 1px 1px 3px",
    fontSize: "30px",
    marginBottom: "40px",
  },
  profileIcon: {
    color: "rgb(0,128,128)",
    fontSize: "48px",
    marginBottom: "20px",
  },

  h1: {
    margin: "0",
    marginBottom: "30px",
    fontSize: "36px",
    fontWeight: "bold",
    color: "rgb(0,128,128)",
    textShadow: "1px 1px #cccccc",
  },

  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },

  formLabel: {
    fontSize: "18px",
    marginBottom: "10px",
    color: "black",
  },

  input: {
    borderRadius: "5px",
    padding: "5px 10px",
    border: "1px solid #cccccc",
    fontSize: "16px",
    width: "300px",
  },

  button: {
    borderRadius: "5px",
    backgroundColor: "rgb(0,128,128)",
    color: "white",
    padding: "10px 15px",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
  },

  optionsContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    fontStyle: "italic",
  },
  forgotPassword: {
    textDecoration: "underline",
    cursor: "pointer",
    color: "grey",
    fontSize: "14px",
    fontWeight: "bold",
  },
  newUser: {
    fontSize: "14px",
  },
  signUpLink: {
    marginRight: "30px",
    marginLeft: "5px",
    textDecoration: "underline",
    cursor: "pointer",
    color: "grey",
    fontSize: "14px",
    fontWeight: "bold",
  },
};
