import { TextField } from '@mui/material';

const Input = ({ value, type, placeholder, onChange }) => {
  return (
    <TextField
      sx={{
        width: '358px',
      }}
      variant="outlined"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      type={type}
    />
  );
};

export default Input;
