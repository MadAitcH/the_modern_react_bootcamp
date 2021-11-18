const styles: { [key: string]: any } = {
  Navbar: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "5vh",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    marginRight: "15px",
    padding: "0 13px",
    fontSize: "22px",
    backgroundColor: "#eceff1",
    fontFamily: "Roboto, sans-serif",
    height: "100%",
    "& a": {
      color: "black",
      textDecoration: "none",
    },
  },
  slider: {
    width: "350px",
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
  },
  selectContainer: {
    marginLeft: "auto",
    marginRight: "0.5rem",
  },
};

export default styles;
