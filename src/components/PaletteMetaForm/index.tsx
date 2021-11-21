import { Component, ChangeEvent } from "react";
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

interface PaletteMetaFormState {
  stage: "form" | "emoji";
  newPaletteName: string;
}

class PaletteMetaForm extends Component<
  PaletteMetaFormProps,
  PaletteMetaFormState
> {
  constructor(props: PaletteMetaFormProps) {
    super(props);

    this.state = {
      stage: "form",
      newPaletteName: "",
    };

    this.onTextValidatorChange = this.onTextValidatorChange.bind(this);
    this.showEmojiPicker = this.showEmojiPicker.bind(this);
    this.savePalette = this.savePalette.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }

  onTextValidatorChange(e: ChangeEvent<HTMLInputElement>) {
    switch (e.target.name) {
      case "newPaletteName":
        this.setState({
          newPaletteName: e.target.value,
        });
        break;
      default:
        return;
    }
  }

  showEmojiPicker() {
    this.setState({ stage: "emoji" });
  }

  savePalette(emoji: BaseEmoji) {
    this.props.onSubmitPalette({
      paletteName: this.state.newPaletteName,
      emoji: emoji.native || "🎨",
    });
  }

  render() {
    const { stage, newPaletteName } = this.state;
    const { hideForm } = this.props;
    return (
      <div>
        <Dialog open={stage === "emoji"} onClose={hideForm}>
          <DialogTitle>Choose a Palette Emoji</DialogTitle>
          <Picker
            title="ReactColorPicker"
            emojiTooltip
            onSelect={this.savePalette}
          />
        </Dialog>
        <Dialog open={stage === "form"} onClose={hideForm}>
          <DialogTitle>Choose a Palette Name</DialogTitle>
          {/* TODO: Fix TextValidator's styles */}
          <ValidatorForm onSubmit={this.showEmojiPicker}>
            <DialogContent>
              <DialogContentText>
                Please enter a name for your newly created palette. Make sure
                it's unique!
              </DialogContentText>
              <TextValidator
                name="newPaletteName"
                label="Palette Name"
                variant="filled"
                fullWidth
                margin="normal"
                autoComplete="off"
                value={newPaletteName}
                onChange={this.onTextValidatorChange}
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
  }
}
export default PaletteMetaForm;
