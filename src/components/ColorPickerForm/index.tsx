import { ChangeEvent, Component } from "react";
import { withStyles, WithStyles } from "@mui/styles";
import { Button } from "@mui/material";
import { ChromePicker, ColorResult } from "react-color";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { NewColor } from "../../utils/seedColors";
import styles from "../../styles/ColorPickerFormStyles";

interface ColorPickerFormProps extends WithStyles<typeof styles> {
  isPaletteFull: boolean;
  colors: NewColor[];
  addNewColor: (newColor: NewColor) => void;
}

interface ColorPickerFormState {
  currentColor: string;
  newColorName: string;
}

class ColorPickerForm extends Component<
  ColorPickerFormProps,
  ColorPickerFormState
> {
  constructor(props: ColorPickerFormProps) {
    super(props);

    this.state = {
      currentColor: "teal",
      newColorName: "",
    };

    this.updateCurrentColor = this.updateCurrentColor.bind(this);
    this.onTextValidatorChange = this.onTextValidatorChange.bind(this);
    this.onColorSubmit = this.onColorSubmit.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isColorUnique", () =>
      this.props.colors.every(color => color.color !== this.state.currentColor)
    );

    ValidatorForm.addValidationRule("isColorNameUnique", value =>
      this.props.colors.every(
        color => color.name.toLowerCase() !== value.toLowerCase()
      )
    );
  }

  updateCurrentColor(newColor: ColorResult) {
    this.setState({
      currentColor: newColor.hex,
    });
  }

  onTextValidatorChange(e: ChangeEvent<HTMLInputElement>) {
    switch (e.target.name) {
      case "newColorName":
        this.setState({
          newColorName: e.target.value,
        });
        break;
      default:
        return;
    }
  }

  onColorSubmit = () => {
    const newColor = {
      name: this.state.newColorName,
      color: this.state.currentColor,
    };

    this.props.addNewColor(newColor);
    this.setState({
      newColorName: "",
    });
  };

  render() {
    const { isPaletteFull, classes } = this.props;
    const { currentColor, newColorName } = this.state;

    return (
      <div>
        {/* TODO: fix alpha slider or disable it */}
        <ChromePicker
          color={currentColor}
          onChangeComplete={this.updateCurrentColor}
          className={classes.colorPicker}
        />
        <ValidatorForm onSubmit={this.onColorSubmit} instantValidate={false}>
          <TextValidator
            value={newColorName}
            name="newColorName"
            label="Color Name"
            variant="filled"
            margin="normal"
            className={classes.colorNameInput}
            onChange={this.onTextValidatorChange}
            disabled={isPaletteFull}
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
            style={{
              backgroundColor: isPaletteFull ? "grey" : currentColor,
            }}
            type="submit"
            disabled={isPaletteFull}
            className={classes.addColor}
          >
            {isPaletteFull ? "Palette Full" : "Add Color"}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default withStyles(styles)(ColorPickerForm);
