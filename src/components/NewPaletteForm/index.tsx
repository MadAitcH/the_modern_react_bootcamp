import { FC, ChangeEvent, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { ChromePicker, ColorResult } from "react-color";
import { Button } from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DraggableColorBox from "../DraggableColorBox";
import { IPalette, NewColor } from "../../utils/seedColors";
import { RouteComponentProps } from "react-router-dom";

const drawerWidth = 400;

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

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
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
  savePalette: (newPalette: IPalette) => void;
}

const NewPaletteForm: FC<NewPaletteFormProps> = ({ savePalette, history }) => {
  const [open, setOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState<string>("teal");
  const [colors, setColors] = useState<NewColor[]>([]);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", value =>
      colors.every(color => color.name.toLowerCase() !== value.toLowerCase())
    );

    ValidatorForm.addValidationRule("isColorUnique", () =>
      colors.every(color => color.color !== currentColor)
    );
  }, [colors, currentColor]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const updateCurrentColor = (newColor: ColorResult) => {
    setCurrentColor(newColor.hex);
  };

  const addNewColor = () => {
    const newColor = {
      color: currentColor,
      name: newName,
    };
    setColors([...colors, newColor]);
    setNewName("");
  };

  const onValidatorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const onSubmitPalette = () => {
    // TODO: finish palette, choose a dynamic name, id and emoji
    const newName = "New Test Palette";
    const newPalette: IPalette = {
      colors,
      paletteName: newName,
      emoji: "🚀",
      id: newName.toLowerCase().replace(/ /g, "-"),
    };
    savePalette(newPalette);
    history.push("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} color="default">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Create A Palette
          </Typography>
          <Button variant="contained" color="primary" onClick={onSubmitPalette}>
            Save Palette
          </Button>
        </Toolbar>
      </AppBar>
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
          <Button variant="contained" color="error">
            Clear Palette
          </Button>
          <Button variant="contained" color="primary">
            Random Color
          </Button>
        </div>
        {/* TODO: fix alpha slider or disable it */}
        <ChromePicker
          color={currentColor}
          onChangeComplete={updateCurrentColor}
        />
        <ValidatorForm onSubmit={addNewColor}>
          <TextValidator
            value={newName}
            name="textValidator"
            onChange={onValidatorChange}
            validators={["required", "isColorNameUnique", "isColorUnique"]}
            errorMessages={[
              "Enter a color name",
              "Color name must be unique",
              "Color already exist",
            ]}
          />

          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: currentColor }}
            type="submit"
          >
            Add Color
          </Button>
        </ValidatorForm>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {colors.map(color => (
          <DraggableColorBox {...color} key={color.name} />
        ))}
      </Main>
    </Box>
  );
};

export default NewPaletteForm;
