import { useState, useEffect, FC, ChangeEvent } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { IPalette } from "../../utils/seedColors";

interface PaletteMetaFormProps {
  palettes: IPalette[];
  onSubmitPalette: (newPaletteName: string) => void;
}

const PaletteMetaForm: FC<PaletteMetaFormProps> = ({
  palettes,
  onSubmitPalette,
}) => {
  const [open, setOpen] = useState(false);
  const [newPaletteName, setNewPaletteName] = useState("");

  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
      palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }, [palettes]);

  const onTextValidatorChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "newPaletteName":
        setNewPaletteName(e.target.value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = () => {
    onSubmitPalette(newPaletteName);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          {/* TODO: Fix TextValidator's styles */}
          <ValidatorForm onSubmit={handleSubmit}>
            <TextValidator
              name="newPaletteName"
              label="Palette Name"
              value={newPaletteName}
              onChange={onTextValidatorChange}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={["Enter a palette name", "Name already used"]}
            />
            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>
          </ValidatorForm>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PaletteMetaForm;
