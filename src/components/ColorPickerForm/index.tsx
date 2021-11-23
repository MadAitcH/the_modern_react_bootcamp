import { ChangeEvent, FC, useState, useEffect } from "react";
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

const ColorPickerForm: FC<ColorPickerFormProps> = ({
  isPaletteFull,
  classes,
  colors,
  addNewColor,
}) => {
  const [currentColor, setCurrentColor] = useState("teal");
  const [newColorName, setNewColorName] = useState("");

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorUnique", () =>
      colors.every(color => color.color !== currentColor)
    );

    ValidatorForm.addValidationRule("isColorNameUnique", value =>
      colors.every(color => color.name.toLowerCase() !== value.toLowerCase())
    );
  }, [colors, currentColor]);

  const updateCurrentColor = (newColor: ColorResult) => {
    setCurrentColor(newColor.hex);
  };

  const onTextValidatorChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "newColorName":
        setNewColorName(e.target.value);
        break;
      default:
        return;
    }
  };

  const onColorSubmit = () => {
    const newColor = {
      name: newColorName,
      color: currentColor,
    };

    addNewColor(newColor);
    setNewColorName("");
  };

  return (
    <div>
      {/* TODO: fix alpha slider or disable it */}
      <ChromePicker
        color={currentColor}
        onChangeComplete={updateCurrentColor}
        className={classes.colorPicker}
      />
      <ValidatorForm onSubmit={onColorSubmit} instantValidate={false}>
        <TextValidator
          value={newColorName}
          name="newColorName"
          label="Color Name"
          variant="filled"
          margin="normal"
          className={classes.colorNameInput}
          onChange={onTextValidatorChange}
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
};

export default withStyles(styles)(ColorPickerForm);
