import { FC, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Button } from "@mui/material";
import { arrayMoveImmutable } from "array-move";
import seedColors, {
  IPalette,
  NewColor,
  IPartialPalette,
} from "../../utils/seedColors";
import { RouteComponentProps } from "react-router-dom";
import DraggableColorList from "../DraggableColorList";
import PaletteFormNav from "../PaletteFormNav";
import ColorPickerForm from "../ColorPickerForm";
import { SortEndHandler } from "react-sortable-hoc";
import { DRAWER_WIDTH as drawerWidth } from "../../constants";

const Main = styled("main", { shouldForwardProp: prop => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  height: "calc(100vh - 64px)",
  padding: 0,
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
  const [colors, setColors] = useState<NewColor[]>(seedColors[1].colors);
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

  const onSortEnd: SortEndHandler = ({ oldIndex, newIndex }) => {
    setColors(arrayMoveImmutable(colors, oldIndex, newIndex));
  };

  const onClearPalette = () => {
    setColors([]);
  };

  const pickUniqueRandomColor = (): NewColor => {
    const palettes: IPalette[] = seedColors;
    let isUnique = false;
    let randomColor: NewColor;

    do {
      const i = Math.floor(Math.random() * palettes.length);
      const j = Math.floor(Math.random() * palettes[i].colors.length);

      randomColor = palettes[i].colors[j];

      isUnique = isColorUnique(randomColor);
    } while (!isUnique);

    return randomColor;
  };

  const onAddRandomColor = () => {
    setColors([...colors, pickUniqueRandomColor()]);
  };

  const isColorUnique = (currentColor: NewColor) => {
    return !colors.some(color => color.name === currentColor.name);
  };

  const onSubmitPalette = (partialPalette: IPartialPalette) => {
    if (partialPalette.paletteName === "new") return;

    const newPalette: IPalette = {
      ...partialPalette,
      colors,
      id: partialPalette.paletteName.toLowerCase().replace(/ /g, "-"),
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
          display: "flex",
          alignItems: "center",
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
        <Box
          sx={{
            width: "90%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Design Your Palette
          </Typography>
          <Box sx={{ width: "100%" }}>
            <Button
              variant="contained"
              color="error"
              onClick={onClearPalette}
              sx={{ width: "50%" }}
            >
              Clear Palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={onAddRandomColor}
              disabled={isPaletteFull}
              sx={{ width: "50%" }}
            >
              Random Color
            </Button>
          </Box>
          <ColorPickerForm
            isPaletteFull={isPaletteFull}
            addNewColor={addNewColor}
            colors={colors}
          />
        </Box>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <DraggableColorList
          colors={colors}
          removeColorBox={removeColorBox}
          axis="xy"
          onSortEnd={onSortEnd}
          distance={13}
        />
      </Main>
    </Box>
  );
};

export default NewPaletteForm;
