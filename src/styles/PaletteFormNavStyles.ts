import sizes from "./sizes";

const styles: { [key: string]: any } = {
  root: {
    display: "flex",
  },
  navBtns: {
    marginRight: "1rem",
    "& a": {
      textDecoration: "none",
    },
    [sizes.down("xs")]: {
      marginRight: "0.5rem",
    },
  },
  button: {
    margin: "0 0.5rem",
    [sizes.down("xs")]: {
      margin: "0 0.05rem",
      padding: "0.2rem",
    },
  },
};

export default styles;
