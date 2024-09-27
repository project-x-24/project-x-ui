import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function DropdownSelect({ options, value = '', onChange, width, label }) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>

      <Select
        label={label}
        value={value}
        defaultValue={value}
        onChange={handleChange}
        sx={{
          width: width || 200,
          textAlign: 'left',
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default DropdownSelect;
