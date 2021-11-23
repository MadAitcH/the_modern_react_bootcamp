import { useState, useEffect, FC, ChangeEvent } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { BaseEmoji, Picker } from "emoji-mart";
import { IPalette, IPartialPalette } from "../../utils/seedColors";

interface PaletteMetaFormProps {
  palettes: IPalette[];
  onSubmitPalette: (newPalette: IPartialPalette) => void;
  hideForm: () => void;
}

type Stage = "form" | "emoji" | "";

const PaletteMetaForm: FC<PaletteMetaFormProps> = ({
  palettes,
  onSubmitPalette,
  hideForm,
}) => {
  const [stage, setStage] = useState<Stage>("form");
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

  const showEmojiPicker = () => {
    setStage("emoji");
  };

  const savePalette = (emoji: BaseEmoji) => {
    onSubmitPalette({
      paletteName: newPaletteName,
      emoji: emoji.native || "🎨",
    });
    setStage("");
  };

  return (
    <div>
      <Dialog open={stage === "emoji"} onClose={hideForm}>
        <DialogTitle>Choose a Palette Emoji</DialogTitle>
        <Picker title="ReactColorPicker" emojiTooltip onSelect={savePalette} />
      </Dialog>
      <Dialog open={stage === "form"} onClose={hideForm}>
        <DialogTitle>Choose a Palette Name</DialogTitle>
        {/* TODO: Fix TextValidator's styles */}
        <ValidatorForm onSubmit={showEmojiPicker}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your newly created palette. Make sure it's
              unique!
            </DialogContentText>
            <TextValidator
              name="newPaletteName"
              label="Palette Name"
              variant="filled"
              fullWidth
              margin="normal"
              autoComplete="off"
              value={newPaletteName}
              onChange={onTextValidatorChange}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={["Enter a palette name", "Name already used"]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={hideForm}>Cancel</Button>
            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
};

export default PaletteMetaForm;
