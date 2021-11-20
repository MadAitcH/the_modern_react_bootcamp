import { FC, useState } from "react";
import { withStyles, WithStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Button } from "@mui/material";
import { arrayMoveImmutable } from "array-move";
import { IPalette, NewColor } from "../../utils/seedColors";
import { RouteComponentProps } from "react-router-dom";
import DraggableColorList from "../DraggableColorList";
import PaletteFormNav, { drawerWidth } from "../PaletteFormNav";
import ColorPickerForm from "../ColorPickerForm";

const styles: { [key: string]: any } = {
  drawer: {
    display: "flex",
    alignItems: "center",
  },
  container: {
    width: "90%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto",
  },
  buttons: {
    width: "100%",
  },
  button: {
    width: "50%",
  },
};

const Main = styled("main", { shouldForwardProp: prop => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  height: "calc(100vh - 64px)",
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

interface NewPaletteFormProps
  extends RouteComponentProps,
    WithStyles<typeof styles> {
  palettes: IPalette[];
  savePalette: (newPalette: IPalette) => void;
}

const NewPaletteForm: FC<NewPaletteFormProps> = ({
  classes,
  palettes,
  savePalette,
  history,
}) => {
  const maxColors = 20;
  const [open, setOpen] = useState(true);
  const [colors, setColors] = useState<NewColor[]>([...palettes[0].colors]);
  const isPaletteFull = colors.length >= maxColors;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const removeColorBox = (colorName: string) => {
    setColors(colors.filter(color => color.name !== colorName));
  };

  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    setColors(arrayMoveImmutable(colors, oldIndex, newIndex));
  };

  const onClearPalette = () => {
    setColors([]);
  };

  const onAddRandomColor = () => {
    let isUnique = false;
    let randomColor: NewColor;

    do {
      const i = Math.floor(Math.random() * palettes.length);
      const j = Math.floor(Math.random() * palettes[i].colors.length);

      randomColor = palettes[i].colors[j];

      isUnique = isColorUnique(randomColor);
    } while (!isUnique);
    setColors([...colors, randomColor]);
  };

  const isColorUnique = (currentColor: NewColor) => {
    return colors.every(color => color.name !== currentColor.name);
  };

  const onSubmitPalette = (newPaletteName: string) => {
    if (newPaletteName === "new") return;
    const newPalette: IPalette = {
      colors,
      paletteName: newPaletteName,
      emoji: "🚀", // TODO: add emoji dynamically
      id: newPaletteName.toLowerCase().replace(/ /g, "-"),
    };
    savePalette(newPalette);
    history.push("/");
  };

  const addNewColor = (newColor: NewColor) => {
    setColors([...colors, newColor]);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <PaletteFormNav
        open={open}
        palettes={palettes}
        handleDrawerOpen={handleDrawerOpen}
        onSubmitPalette={onSubmitPalette}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <div className={classes.container}>
          <Typography variant="h4" gutterBottom>
            Design Your Palette
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="error"
              onClick={onClearPalette}
              className={classes.button}
            >
              Clear Palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={onAddRandomColor}
              disabled={isPaletteFull}
              className={classes.button}
            >
              Random Color
            </Button>
          </div>
          <ColorPickerForm
            isPaletteFull={isPaletteFull}
            addNewColor={addNewColor}
            colors={colors}
          />
        </div>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <DraggableColorList
          colors={colors}
          removeColorBox={removeColorBox}
          axis="xy"
          onSortEnd={onSortEnd}
        />
      </Main>
    </Box>
  );
};

export default withStyles(styles)(NewPaletteForm);
