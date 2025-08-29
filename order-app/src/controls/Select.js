import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from "@mui/material";

export default function Select(props) {
  const {
    name,
    label,
    value,
    variant,
    onChange,
    options,
    error = null,
    fullWidth = true,
  } = props;

  const labelId = `${name}-label`;

  return (
    <FormControl
      variant={variant || "outlined"}
      fullWidth={fullWidth}
      error={!!error}
    >
      <InputLabel id={labelId}>{label}</InputLabel>
      <MuiSelect
        labelId={labelId}
        id={name}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map(item => (
          <MenuItem key={item.id} value={item.id}>
            {item.title}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
