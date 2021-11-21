import { useState, FC } from "react";
import { Link } from "react-router-dom";
import { withStyles, WithStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
import { IPalette, IPartialPalette } from "../../utils/seedColors";
import PaletteMetaForm from "../PaletteMetaForm";

export const drawerWidth = 400;

const styles: { [key: string]: any } = {
  root: {
    display: "flex",
  },
  navBtns: {
    marginRight: "1rem",
    "& a": {
      textDecoration: "none",
    },
  },
  button: {
    margin: "0 0.5rem",
  },
};

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  height: "64px",
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

interface PaletteFormNavProps extends WithStyles<typeof styles> {
  open: boolean;
  palettes: IPalette[];
  handleDrawerOpen: () => void;
  onSubmitPalette: (newPalette: IPartialPalette) => void;
}

const PaletteFormNav: FC<PaletteFormNavProps> = ({
  classes,
  open,
  palettes,
  handleDrawerOpen,
  onSubmitPalette,
}) => {
  const [formShowing, setFormShowing] = useState(false);

  const showForm = () => {
    setFormShowing(true);
  };

  const hideForm = () => {
    setFormShowing(false);
  };

  return (
    <div className={classes.root}>
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
        </Toolbar>
        <div className={classes.navBtns}>
          <Link to="/">
            <Button
              variant="contained"
              color="error"
              className={classes.button}
            >
              Go Back
            </Button>
          </Link>
          {/* TODO: fix save button. It only opens up once. */}
          <Button
            variant="contained"
            onClick={showForm}
            className={classes.button}
          >
            Save
          </Button>
        </div>
      </AppBar>
      {formShowing && (
        <PaletteMetaForm
          hideForm={hideForm}
          palettes={palettes}
          onSubmitPalette={onSubmitPalette}
        />
      )}
    </div>
  );
};

export default withStyles(styles)(PaletteFormNav);
