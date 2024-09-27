import TextareaAutosize from "@mui/material/TextareaAutosize";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { styled } from "@mui/system";

// Define the styled components
const CustomTextAreaContainer = styled("div")({
  width: "200px",
  position: "relative",
  margin: "auto",
});

const CustomTextAreaStyled = styled(TextareaAutosize)({
  resize: "none",
  border: "1px solid #ccc",
  padding: "8px",
  borderRadius: "4px",
  marginBottom: "8px",
  width: "100%",
  paddingRight: "36px", // Add right padding for the ClearButton
});

const ClearButton = styled(IconButton)({
  position: "absolute",
  top: "8px",
  right: "8px",
});

const CustomTextArea = ({ value, onChange, onClear }) => {
  const handleClearClick = () => {
    onClear();
  };

  return (
    <CustomTextAreaContainer>
      <CustomTextAreaStyled
        minRows={3}
        value={value}
        onChange={onChange}
        placeholder="Enter text..."
      />
      <ClearButton
        onClick={handleClearClick}
        color="secondary"
        aria-label="Clear Text"
      >
        <ClearIcon />
      </ClearButton>
    </CustomTextAreaContainer>
  );
};

export default CustomTextArea;
