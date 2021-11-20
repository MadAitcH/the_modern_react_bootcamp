import { FC, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Button } from "@mui/material";
import { arrayMoveImmutable } from "array-move";
import { IPalette, NewColor } from "../../utils/seedColors";
import { RouteComponentProps } from "react-router-dom";
import DraggableColorList from "../DraggableColorList";
import PaletteFormNav from "../PaletteFormNav";
import ColorPickerForm from "../ColorPickerForm";

const drawerWidth = 400;
// if you change this value, you MAY need to change the value of drawerWidth
// in PaletteFormNav too.

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

interface NewPaletteFormProps extends RouteComponentProps {
  palettes: IPalette[];
  savePalette: (newPalette: IPalette) => void;
}

const NewPaletteForm: FC<NewPaletteFormProps> = ({
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
        theDrawerWidth={drawerWidth}
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
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Typography variant="h4">Design Your Palette</Typography>
        <div>
          <Button variant="contained" color="error" onClick={onClearPalette}>
            Clear Palette
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={onAddRandomColor}
            disabled={isPaletteFull}
          >
            Random Color
          </Button>
        </div>
        <ColorPickerForm
          isPaletteFull={isPaletteFull}
          addNewColor={addNewColor}
          colors={colors}
        />
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

export default NewPaletteForm;
