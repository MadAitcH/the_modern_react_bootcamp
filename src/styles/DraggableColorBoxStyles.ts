import chroma from "chroma-js";
import { DraggableColorBoxProps } from "../components/DraggableColorBox";
import sizes from "./sizes";

const styles: { [key: string]: any } = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-7.2px",
    "&:hover svg": {
      color: "white",
      transform: "scale(1.5)",
    },
    [sizes.down("lg")]: {
      width: "25%",
      height: "20%",
      marginBottom: "-6.5px",
    },
    [sizes.down("md")]: {
      width: "50%",
      height: "10%",
      marginBottom: "-6.6px",
    },
    [sizes.down("sm")]: {
      width: "100%",
      height: "5%",
      marginBottom: "-6.7px",
    },
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0",
    bottom: "0",
    padding: "10px",
    color: (props: DraggableColorBoxProps) =>
      chroma(props.color).luminance() <= 0.08
        ? "rgba(255, 255, 255, 0.8)"
        : "rgba(0, 0, 0, 0.6)",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
    display: "flex",
    justifyContent: "space-between",
  },
  deleteIcon: {
    transition: "all 0.3s ease-in-out",
  },
};

export default styles;
