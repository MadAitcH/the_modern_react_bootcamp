import sizes from "./sizes";
import bg from "./confetti-doodles.svg";

const styles: { [key: string]: any } = {
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    overflow: "auto", // added by me
    backgroundColor: "#0C0BAA",
    backgroundAttachment: "fixed",
    /* background by SVGBackgrounds.com */
    backgroundImage: `url(${bg})`,
  },

  heading: {
    fontSize: "2rem",
  },

  container: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",
    [sizes.down("xl")]: {
      width: "80%",
    },
    [sizes.down("xs")]: {
      width: "75%",
    },
  },

  nav: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    color: "white",
    alignItems: "center",
    "& a": {
      color: "white",
    },
  },

  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "2.5rem",
    [sizes.down("md")]: {
      gridTemplateColumns: "repeat(2, 50%)",
    },
    [sizes.down("xs")]: {
      gridTemplateColumns: "repeat(1, 100%)",
      gridGap: "1.4rem",
    },
  },
};

export default styles;
