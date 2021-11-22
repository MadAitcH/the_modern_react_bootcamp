import chroma from "chroma-js";
import { ColorBoxProps } from "../components/ColorBox";
import sizes from "./sizes";

const styles: { [key: string]: any } = {
  ColorBox: {
    width: "20%",
    height: (props: ColorBoxProps) => (props.showFullPalette ? "25%" : "50%"),
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    "&:hover button": {
      opacity: 1,
    },
    [sizes.down("lg")]: {
      width: "25%",
      height: (props: ColorBoxProps) => (props.showFullPalette ? "20%" : "25%"),
    },
    [sizes.down("md")]: {
      width: "50%",
      height: (props: ColorBoxProps) => (props.showFullPalette ? "10%" : "25%"),
    },
    [sizes.down("xs")]: {
      width: "100%",
      height: (props: ColorBoxProps) => (props.showFullPalette ? "5%" : "10%"),
    },
  },
  copyText: {
    color: (props: ColorBoxProps) =>
      chroma(props.background).luminance() >= 0.65 ? "black" : "white",
  },
  colorName: {
    color: (props: ColorBoxProps) =>
      chroma(props.background).luminance() <= 0.08 ? "white" : "black",
  },

  seeMore: {
    color: (props: ColorBoxProps) =>
      chroma(props.background).luminance() >= 0.65
        ? "rgba(0, 0, 0, 0.6)"
        : "white",
    position: "absolute",
    bottom: "0",
    right: "0",
    border: "none",
    background: "rgba(255, 255, 255, 0.3)",
    width: "60px",
    height: "30px",
    textAlign: "center",
    lineHeight: "30px",
    textTransform: "uppercase",
  },
  copyButton: {
    color: (props: ColorBoxProps) =>
      chroma(props.background).luminance() >= 0.65
        ? "rgba(0, 0, 0, 0.6)"
        : "white",
    width: "100px",
    height: "30px",
    position: "absolute",
    display: "inline-block",
    top: "50%",
    left: "50%",
    marginLeft: "-50px",
    marginTop: "-15px",
    textAlign: "center",
    outline: "none",
    border: "none",
    background: "rgba(255, 255, 255, 0.3)",
    fontSize: "1rem",
    lineHeight: "30px",
    textTransform: "uppercase",
    textDecoration: "none",
    opacity: 0,
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0",
    bottom: "0",
    padding: "10px",
    color: "black",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
  },
  copyOverlay: {
    opacity: "0",
    zIndex: "0",
    width: "100%",
    height: "100%",
    transition: "transform 0.6s ease-in-out",
    transform: "scale(0.1)",
  },
  showOverlay: {
    opacity: "1",
    transform: "scale(50)",
    zIndex: "10",
    position: "absolute",
  },
  copyMessage: {
    position: "fixed",
    left: "0",
    top: "0",
    right: "0",
    bottom: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    fontSize: "4rem",
    transform: "scale(0.1)",
    opacity: "0",
    color: "white",
    "& h1": {
      fontWeight: "400",
      textShadow: "1px 2px black",
      background: "rgba(255, 255, 255, 0.2)",
      width: "100%",
      textAlign: "center",
      marginBottom: "0",
      padding: "1rem",
      textTransform: "uppercase",
    },
    "& p": {
      fontSize: "2rem",
      fontWeight: "100",
    },
  },
  showMessage: {
    opacity: "1",
    transform: "scale(1)",
    zIndex: "10",
    transition: "all 0.4s ease-in-out",
    transitionDelay: "0.3s",
  },
};

export default styles;
