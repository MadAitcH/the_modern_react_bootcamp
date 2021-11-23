import { FC, useState } from "react";
import { withStyles, WithStyles } from "@mui/styles";
import { Link, RouteComponentProps } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { blue, red } from "@mui/material/colors";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { IPalette } from "../../utils/seedColors";
import MiniPalette from "../MiniPalette";
import styles from "../../styles/PaletteListStyles";

interface PaletteListProps
  extends RouteComponentProps,
    WithStyles<typeof styles> {
  palettes: IPalette[];
  deletePalette: (paletteId: string) => void;
}

const PaletteList: FC<PaletteListProps> = ({
  palettes,
  classes,
  history,
  deletePalette,
}) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  const goToPalette = (id: string) => {
    history.push(`/palette/${id}`);
  };

  const openDialog = (paletteId: string) => {
    setOpenDeleteDialog(true);
    setDeletingId(paletteId);
  };

  const closeDialog = () => {
    setOpenDeleteDialog(false);
    setDeletingId("");
  };

  const removePalette = () => {
    if (!deletingId) return;

    deletePalette(deletingId);
    closeDialog();
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1 className={classes.heading}>React Colors</h1>
          <Link to="/palette/new">Create Palette</Link>
        </nav>
        <TransitionGroup className={classes.palettes}>
          {palettes.map(palette => (
            <CSSTransition key={palette.id} classNames="fade" timeout={500}>
              <MiniPalette
                {...palette}
                goToPalette={goToPalette}
                openDialog={openDialog}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
      <Dialog
        open={openDeleteDialog}
        aria-labelledby="delete-dialog-title"
        onClose={closeDialog}
      >
        <DialogTitle id="delete-dialog-title">
          Are you sure you want to delete this palette?
        </DialogTitle>
        <List>
          <ListItem button onClick={removePalette}>
            <ListItemAvatar>
              <Avatar
                style={{
                  backgroundColor: blue[100],
                  color: blue[600],
                }}
              >
                <CheckIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Yes" />
          </ListItem>
          <ListItem button onClick={closeDialog}>
            <ListItemAvatar>
              <Avatar
                style={{
                  backgroundColor: red[100],
                  color: red[600],
                }}
              >
                <CloseIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="No" />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
};

export default withStyles(styles)(PaletteList);
