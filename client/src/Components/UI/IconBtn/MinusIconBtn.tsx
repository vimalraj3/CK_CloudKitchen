import { IconButton } from "@mui/material";
import { memo } from "react";

export const MinusIconBtn = memo(() => {
  return (
    <IconButton aria-label="delete" size="small">
      <i className="fa-solid fa-minus cursor-pointer"></i>
    </IconButton>
  );
});
