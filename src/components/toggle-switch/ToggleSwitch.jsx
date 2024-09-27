import { Switch } from "@mui/material";

import COLORS from "../../constants/colors";

const switchSX = {
  "& .MuiSwitch-switchBase": {
    color: COLORS.PURPLE4,
    "&.Mui-disabled": {
      opacity: 0.8,
      color: COLORS.PURPLE0,
      "& + .MuiSwitch-track": {
        opacity: 0.8,
        backgroundColor: COLORS.PURPLE2,
      },
    },
    "& + .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: COLORS.PURPLE2,
    },
    "&.Mui-checked": {
      color: COLORS.PURPLE4,
      "&.Mui-disabled": {
        opacity: 0.8,
        color: COLORS.PURPLE4,
        "& + .MuiSwitch-track": {
          opacity: 0.8,
          backgroundColor: COLORS.PURPLE6,
        },
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: COLORS.PURPLE6,
      },
    },
  },
};

const ToggleSwitch = (props) => {
  const { isDisabled = false, isChecked = false, onChange, label = "" } = props;

  return (
    <div className="flex items-center">
      <Switch
        size="small"
        sx={switchSX}
        checked={isChecked}
        onChange={onChange}
        disabled={isDisabled}
      />
      <p>{label}</p>
    </div>
  );
};

export default ToggleSwitch;
