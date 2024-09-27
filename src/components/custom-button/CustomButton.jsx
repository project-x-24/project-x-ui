import MuiButton from "@mui/material/Button";

const CustomButton = ({
  children,
  variant = "contained",
  className = "",
  onClick,
  color,
}) => {
  return (
    <MuiButton
      onClick={onClick}
      variant={variant}
      className={className}
      color={color}
    >
      {children}
    </MuiButton>
  );
};

export default CustomButton;
