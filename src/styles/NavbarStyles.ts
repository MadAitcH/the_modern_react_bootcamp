import sizes from "./sizes";

const styles: { [key: string]: any } = {
  Navbar: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "5vh",
    fontSize: "2rem",
    [sizes.down("lg")]: {
      fontSize: "1.7rem",
    },
    [sizes.down("md")]: {
      fontSize: "1.1rem",
    },
    [sizes.down("md")]: {
      fontSize: "0.8rem",
    },
  },
  logo: {
    display: "flex",
    alignItems: "center",
    marginRight: "15px",
    padding: "0 13px",
    fontSize: "2.7rem",
    backgroundColor: "#eceff1",
    fontFamily: "Roboto, sans-serif",
    height: "100%",
    "& a": {
      color: "black",
      textDecoration: "none",
    },
    [sizes.down("lg")]: {
      fontSize: "2.1rem",
    },
    [sizes.down("md")]: {
      fontSize: "1.1rem",
    },
    [sizes.down("xs")]: {
      fontSize: "0.7rem",
      padding: "0 5px",
      fontWeight: "bold",
    },
  },
  slider: {
    width: "385px",
    margin: "0 10px",
    display: "inline-block",
    "& .rc-slider-track": {
      backgroundColor: "transparent",
    },

    "& .rc-slider-rail": {
      height: "8px",
    },

    "& .rc-slider-handle, .slider .rc-slider-handle:focus, .slider .rc-slider-handle:hover, .slider .rc-slider-handle:active":
      {
        backgroundColor: "green",
        outline: "none",
        border: "2px solid green",
        boxShadow: "none",
        width: "13px",
        height: "13px",
        marginLeft: "-7px",
        marginTop: "-3px",
      },
    [sizes.down("lg")]: {
      width: "305px",
    },
    [sizes.down("sm")]: {
      width: "150px",
    },
  },
  selectContainer: {
    marginLeft: "auto",
    marginRight: "0.5rem",
  },
};

export default styles;
